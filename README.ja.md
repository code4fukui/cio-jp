# cio-jp

このリポジトリは、日本の政府CIOポータルで公開されているディスカッションペーパーをスクレイピングし、オープンデータとして提供します。元のPDFおよびDOCXファイルもダウンロードしてアーカイブしており、容易にアクセスできるようにしています。

## データ

スクレイピングしたデータは以下の形式で利用可能です：

- **Markdown**: [discussionpaper.md](discussionpaper.md)
- **HTML（表示用）**: [https://code4fukui.github.io/cio-jp/discussionpaper.html](https://code4fukui.github.io/cio-jp/discussionpaper.html)
- **CSV**: [discussionpaper.csv](https://code4fukui.github.io/cio-jp/discussionpaper.csv)

元のドキュメントは以下のディレクトリにアーカイブされています：
- [PDFファイル](pdf/)
- [DOCXファイル](docx/)

### データ構造

主なデータは `discussionpaper.csv` にあり、以下の列を含みます：

- `name`: タイトル（日本語）
- `datetime`: 公開日時
- `description`: 説明（日本語）
- `url`: 元のページへのURL（日本語）
- `author`: 著者
- `pdf`, `docx`: アーカイブされたPDF/DOCXファイルへのリンク
- `name_en`, `description_en`, `url_en`: 英語版のタイトル、説明、URL（存在する場合）
- `pdf2`, `docx2`: 補足資料へのリンク（存在する場合）

## データの更新方法

このプロジェクトは [Deno](https://deno.land/) を使用しています。データを更新するには、以下のスクリプトを順番に実行してください：

```bash
# 1. インデックスページからディスカッションペーパーのリストをスクレイピング
deno run -A scrapeList.js

# 2. 各ペーパーの詳細情報（著者、ファイルリンク）をスクレイピング
deno run -A scrapeItem.js

# 3. 元のPDFおよびDOCXファイルをダウンロード
deno run -A download.js

# 4. CSV内のファイルパスをホストされているバージョンを指すように更新
deno run -A shortenName.js

# 5. 最終的なCSVからMarkdownおよびHTMLファイルを生成
deno run -A make.js
```

## 関連プロジェクト

- [stdwords-jp](https://github.com/code4fukui/stdwords-jp): 政府CIOポータルの標準ガイドライン用語集。
- [BaseRegistry](https://github.com/code4fukui/BaseRegistry): 日本のベースレジストリに関するプロジェクト。

## 出典

- [Discussion Papers | Government CIO Portal](https://cio.go.jp/dp)

## ライセンス

このリポジトリは [MIT License](LICENSE) のもとで公開されています。
