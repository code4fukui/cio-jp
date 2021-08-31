import { csv2md } from "https://js.sabae.cc/csv2md.js";
import { marked } from "https://taisukef.github.io/marked_md/marked.js";

const fn = "discussionpaper.csv";
const title = "政府CIOポータル ディスカッションペーパー";

const md = await csv2md({
  filename: fn,
  title,
  name: "name",
  body: "description",
});

const html = "<meta charset='utf-8'><title>" + title + "</title>\n" + marked(md) + "<hr><a href=https://github.com/code4fukui/cio-jp>src on GitHub</a>";
await Deno.writeTextFile(fn.substring(0, fn.length - 3) + "html", html);
