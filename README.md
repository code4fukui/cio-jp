# cio-jp

Summary of Japanese government CIO portal discussion papers.

## Data

- [Government CIO Portal Discussion Papers in Markdown](discussionpaper.md)
- [HTML](https://code4fukui.github.io/cio-jp/discussionpaper.html)
- [CSV](https://code4fukui.github.io/cio-jp/discussionpaper.csv)

## Related

- [Vocabulary for Government CIO Portal Standard Guidelines](https://github.com/code4fukui/stdwords-jp)
- [Base Registry](https://github.com/code4fukui/BaseRegistry)

## How to Generate

```bash
deno run -A scrapeList.js
deno run -A scrapeItem.js
deno run -A download.js
deno run -A make.js
```

## Source

- [Discussion Papers | Government CIO Portal](https://cio.go.jp/dp)