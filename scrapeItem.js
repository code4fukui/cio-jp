import HTMLParser from "https://dev.jspm.io/node-html-parser";
import { CSV } from "https://js.sabae.cc/CSV.js";

const url2fn = (url) => "temp/" + url.substring(url.lastIndexOf("/") + 1) + ".html";

const fetchHTML = async (data) => {
  for (const d of data) {
    const url = d.url;
    const fn = url2fn(url);
    const txt = await (await fetch(url)).text();
    await Deno.writeTextFile(fn, txt);
  }
  //console.log(txt);
};

const list = CSV.toJSON(await CSV.fetch("./scraped.csv"));
//await fetchHTML(list);

for (const d of list) {
  const txt = await Deno.readTextFile(url2fn(d.url));
  const dom = HTMLParser.parse(txt);
  const a = dom.querySelector("article");
  const item = {
    title: a.querySelector("h1").text,
    author: a.querySelectorAll("p").filter(p => p.attributes["align"] == "right").map(p => p.text).join(", "),
    pdf: "https://cio.go.jp" + a.querySelectorAll("a").find(a => a.attributes["class"] == "openw x-pdf ")?.attributes["href"],
    docx: "https://cio.go.jp" + a.querySelectorAll("a").find(a => a.attributes["class"] == "openw x-doc")?.attributes["href"],
  };
  console.log(item);
  //data.push(item);
  d.author = item.author;
  d.pdf = item.pdf;
  d.docx = item.docx;
}

const data = [];
for (const d of list) {
  if (d.author) {
    const en = list.find(l => l.author == "" && l.pdf == d.pdf);
    if (en) {
      d.name_en = en.name;
      d.description_en = en.description;
      d.url_en = en.url;
    }
    data.push(d);
  }
}

await Deno.writeTextFile("discussionpaper.csv", CSV.stringify(data));
console.log(data.length);
