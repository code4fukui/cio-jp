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
    //title: a.querySelector("h1").text,
    author: a.querySelectorAll("p").filter(p => p.attributes["align"] == "right").map(p => p.text).join(", "),
  };
  const as = a.querySelectorAll("a");
  let npdf = 0;
  let ndocx = 0;
  for (const a of as) {
    const base = "https://cio.go.jp";
    switch (a.attributes.class) {
      case "openw x-pdf ": {
        npdf++;
        item["pdf" + (npdf > 1 ? npdf : "")] = base + a.attributes["href"];
        break;
      }
      case "openw x-doc": {
        ndocx++;
        item["docx" + (ndocx > 1 ? ndocx : "")] = base + a.attributes["href"];
        break;
      }
    }
  };
  //console.log(item);
  //data.push(item);
  Object.assign(d, item);
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

await Deno.writeTextFile("scraped2.csv", CSV.stringify(data));
console.log(data.length);
