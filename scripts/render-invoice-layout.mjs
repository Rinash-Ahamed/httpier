// Run after check-invoice-layout.mjs. PDF QA dependencies live only under .next.
import { spawn } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const output = resolve(".next/invoice-qa");
await mkdir(output, { recursive: true });
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${output}/browser-profile`, "about:blank"], { windowsHide: true, stdio: ["ignore", "ignore", "pipe"] });
let socket;
try {
  const endpoint = await new Promise((accept, reject) => {
    const timer = setTimeout(() => reject(new Error("Headless browser startup timed out")), 30000);
    chrome.once("error", reject);
    chrome.stderr.on("data", (chunk) => {
      const match = chunk.toString().match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) { clearTimeout(timer); accept(match[1]); }
    });
  });
  socket = new WebSocket(endpoint);
  await new Promise((accept, reject) => { socket.onopen = accept; socket.onerror = reject; });
  let nextId = 0;
  const pending = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    const request = pending.get(message.id);
    if (request) {
      pending.delete(message.id);
      if (message.error) request.reject(new Error(message.error.message));
      else request.accept(message.result);
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((accept, reject) => {
    const id = ++nextId;
    pending.set(id, { accept, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const page = (method, params) => send(method, params, sessionId);
  await page("Page.enable");
  await page("Emulation.setDeviceMetricsOverride", { width: 794, height: 1123, deviceScaleFactor: 1, mobile: false });
  await page("Emulation.setEmulatedMedia", { media: "print" });
  for (const name of ["short", "long-description", "multi-page"]) {
    await page("Page.navigate", { url: pathToFileURL(`${output}/${name}.html`).href });
    await new Promise((accept) => setTimeout(accept, 1200));
    await page("Runtime.evaluate", { expression: "Promise.all([document.fonts.ready,...Array.from(document.images,img=>img.decode())])", awaitPromise: true });
    const pdf = await page("Page.printToPDF", { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
    await writeFile(`${output}/${name}.pdf`, Buffer.from(pdf.data, "base64"));
  }
  await send("Browser.close");
} finally {
  socket?.close();
  chrome.kill();
}

const require = createRequire(import.meta.url);
const canvas = require(resolve(".next/invoice-qa-deps/node_modules/@napi-rs/canvas"));
Object.assign(globalThis, { DOMMatrix: canvas.DOMMatrix, ImageData: canvas.ImageData, Path2D: canvas.Path2D });
const pdfjs = await import(pathToFileURL(resolve(".next/invoice-qa-deps/node_modules/pdfjs-dist/legacy/build/pdf.mjs")).href);
for (const name of ["short", "long-description", "multi-page"]) {
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(await readFile(`${output}/${name}.pdf`)), useSystemFonts: true });
  const pdf = await loadingTask.promise;
  let allText = "";
  let lastPageText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const text = (await page.getTextContent()).items.map((item) => item.str).join(" ");
    allText += text;
    lastPageText = text;
    const viewport = page.getViewport({ scale: 1.3 });
    const image = canvas.createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    await page.render({ canvasContext: image.getContext("2d"), viewport, canvas: image }).promise;
    await writeFile(`${output}/${name}-page-${i}.png`, image.toBuffer("image/png"));
    console.log(`${name} page ${i}: ${text.length} characters`);
  }
  assert.match(allText, /60 Days of Free Bug Fixes/);
  assert.match(allText, /HTP-QA-011/);
  assert.match(allText, /08 Jan 2027/);
  assert.match(allText, /Post-delivery support covers existing functionality only/);
  if (name !== "multi-page") assert.equal(pdf.numPages, 1, "Single-service invoices must remain one page");
  if (name === "multi-page") assert.ok(pdf.numPages > 1);
  assert.ok(lastPageText.length > 200, "Do not orphan the footer on its own page");
  console.log(`${name}: ${pdf.numPages} PDF page(s), benefits and expiry verified`);
  await loadingTask.destroy();
}
