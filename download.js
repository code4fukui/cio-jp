import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

const download = async (path, url) => {
  if (!url) {
    return;
  }
  const fn = url.substring(url.lastIndexOf("/") + 1);
  console.log(url, path, fn);
  await Deno.writeFile(path + fn, await fetchBin(url));
};

const list = CSV.toJSON(await CSV.fetch("./discussionpaper.csv"));
for (const d of list) {
  await download("pdf/", d.pdf);
  await download("docx/", d.docx);
  await download("pdf/", d.pdf2);
  await download("docx/", d.docx2);
}
