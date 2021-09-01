import { CSV } from "https://js.sabae.cc/CSV.js";

const url2fn = (path, url) => url ? path + url.substring(url.lastIndexOf("/") + 1) : "";

const list = CSV.toJSON(await CSV.fetch("./scraped2.csv"));
const base = "https://code4fukui.github.io/cio-jp/"
for (const d of list) {
  d.pdf = url2fn(base + "pdf/", d.pdf);
  d.docx = url2fn(base + "docx/", d.docx);
  d.pdf2 = url2fn(base + "pdf/", d.pdf2);
  d.docx2 = url2fn(base + "docx/", d.docx2);
}
await Deno.writeTextFile("./discussionpaper.csv", CSV.stringify(list));

