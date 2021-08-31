import HTMLParser from "https://dev.jspm.io/node-html-parser";
import { CSV } from "https://js.sabae.cc/CSV.js";

const fetchHTML = async () => {
  const url = "https://cio.go.jp/dp?page=";
  const ss = [];
  for (let i = 0; i < 3; i++) {
    const txt = await (await fetch(url + i)).text();
    ss.push(txt);
  }
  await Deno.writeTextFile("temp/index.html", ss.join("\n"));
  //console.log(txt);  
};
//await fetchHTML();

const txt = await Deno.readTextFile("temp/index.html");
const dom = HTMLParser.parse(txt);
const articles = dom.querySelectorAll("article");
console.log(articles.length);

/*
<article>

<dl class="inform created">
<dt><span>掲載日: </span></dt>
<dd><time datetime="2021-08-31T10:11:00+09:00" pubdate>2021.8.31</time></dd>
</dl>
<dl class="inform field-primcat primcats">
<dt><span>コンテンツ分類: </span></dt>
<dd><a href="/dp" typeof="skos:Concept" property="rdfs:label skos:prefLabel" datatype="" class="active">ディスカッションペーパー</a></dd>
</dl>
<h2><a href="/dp2021_06">データ人材フレームワークの設計</a></h2>
<p>　　データ人材の人材像とスキルセットを明確にするとともに、評価方法について検討を行い、その結果としてデータ人材フレームワーク案を提案します。</p>

</article>
*/

const data = [];
for (const a of articles) {
  const links = a.querySelectorAll("a");
  const link = links[links.length - 1];
  const d = {
    name: link.text,
    datetime: a.querySelector("time").attributes["datetime"],
    description: a.querySelector("p")?.text.trim() || "",
    url: "https://cio.go.jp" + link.attributes["href"],
  };
  data.push(d);
  console.log(d);
}
await Deno.writeTextFile("scraped.csv", CSV.stringify(data));
console.log(data.length);
