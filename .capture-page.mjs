import { writeFile } from "node:fs/promises";

const [url, output] = process.argv.slice(2);
if (!url || !output) throw new Error("Usage: node .capture-page.mjs <url> <output>");

let targets;
for (let attempt = 0; attempt < 30; attempt += 1) {
  try {
    targets = await fetch("http://127.0.0.1:9222/json/list").then((response) => response.json());
    if (targets.length) break;
  } catch {}
  await new Promise((resolve) => setTimeout(resolve, 250));
}

const target = targets?.find((item) => item.type === "page");
if (!target) throw new Error("No browser page target was available.");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(String(event.data));
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function command(method, params = {}) {
  commandId += 1;
  return new Promise((resolve, reject) => {
    pending.set(commandId, { resolve, reject });
    socket.send(JSON.stringify({ id: commandId, method, params }));
  });
}

await command("Page.enable");
await command("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1.5,
  mobile: false,
});
await command("Page.navigate", { url });
await new Promise((resolve) => setTimeout(resolve, 14000));
await command("Runtime.evaluate", {
  expression: "window.scrollTo(0, 0); document.fonts?.ready",
  awaitPromise: true,
});
await new Promise((resolve) => setTimeout(resolve, 1500));

const screenshot = await command("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
await writeFile(output, Buffer.from(screenshot.data, "base64"));
socket.close();
