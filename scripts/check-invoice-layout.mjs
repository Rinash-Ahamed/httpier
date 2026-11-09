// Local QA fixtures only: no admin credentials, real client data, or cloud writes.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { fixture, InvoiceDocument } from "../tests/invoice-support.test.mjs";

const dir = ".next/invoice-qa";
await mkdir(dir, { recursive: true });
const chunks = ".next/static/chunks";
const styles = (await Promise.all((await readdir(chunks)).filter((name) => name.endsWith(".css")).map((name) => readFile(`${chunks}/${name}`, "utf8")))).join("\n");
const sourceStyles = await readFile("src/app/globals.css", "utf8");
const printStyles = sourceStyles.slice(sourceStyles.indexOf("/* Invoice output"));
for (const [name, count, long] of [["short", 1, false], ["long-description", 1, true], ["multi-page", 20, true]]) {
  const invoice = fixture(count, long);
  if (long) invoice.support.customTerms = "Contact HTTPier with the affected page, steps to reproduce and screenshots. Requests are reviewed within the agreed scope.\n".repeat(count === 20 ? 8 : 1);
  let markup = renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice }));
  for (const path of ["/brand/httpier-mark.png", "/httpier_scan_pay_qr.png"]) {
    const dataUrl = `data:image/png;base64,${(await readFile(`public${path}`)).toString("base64")}`;
    markup = markup.replaceAll(path, dataUrl);
  }
  await writeFile(`${dir}/${name}.html`, `<!doctype html><html><head><meta charset="utf-8"><style>${styles}\n${printStyles}\nbody{font-family:Arial,sans-serif;margin:0}main{width:794px;margin:auto}</style></head><body><main>${markup}</main></body></html>`);
  console.log(`Created ${dir}/${name}.html`);
}
