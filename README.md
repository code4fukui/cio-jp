# stdwords-jp

政府CIOポータルの[ディスカッションペーパー](https://cio.go.jp/dp)まとめ

## データ

- [Markdown](discussionpaper.md)
- [HTML](https://code4fukui.github.io/cio-jp/discussionpaper.html)
- [CSV](https://code4fukui.github.io/cio-jp/discussionpaper.csv)

## how to make

```bash
deno run -A scrapeList.js
deno run -A scrapeItem.js
deno run -A download.js
deno run -A make.js
```

## 出展

- [ディスカッションペーパー | 政府CIOポータル](https://cio.go.jp/dp)
