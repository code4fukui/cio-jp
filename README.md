# cio-jp

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository scrapes discussion papers published on Japan's Government CIO Portal and provides them as open data. The original PDF and DOCX files are also downloaded and archived for easy access.

## Data

The scraped data is available in the following formats:

- **Markdown**: [discussionpaper.md](discussionpaper.md)
- **HTML (View)**: [https://code4fukui.github.io/cio-jp/discussionpaper.html](https://code4fukui.github.io/cio-jp/discussionpaper.html)
- **CSV**: [discussionpaper.csv](https://code4fukui.github.io/cio-jp/discussionpaper.csv)

The original documents are archived in these directories:
- [PDF files](pdf/)
- [DOCX files](docx/)

### Data Structure

The main data is in `discussionpaper.csv` with the following columns:

- `name`: Title (Japanese)
- `datetime`: Publication date and time
- `description`: Description (Japanese)
- `url`: URL to the original page (Japanese)
- `author`: Author(s)
- `pdf`, `docx`: Link to the archived PDF/DOCX file
- `name_en`, `description_en`, `url_en`: English version of the title, description, and URL, if available
- `pdf2`, `docx2`: Links to supplementary documents, if available

## How to Update the Data

This project uses [Deno](https://deno.land/). The data can be updated by running the following scripts in order:

```bash
# 1. Scrape the list of papers from the index pages
deno run -A scrapeList.js

# 2. Scrape detailed information for each paper (author, file links)
deno run -A scrapeItem.js

# 3. Download the original PDF and DOCX files
deno run -A download.js

# 4. Update file paths in the CSV to point to the hosted versions
deno run -A shortenName.js

# 5. Generate Markdown and HTML files from the final CSV
deno run -A make.js
```

## Related Projects

- [stdwords-jp](https://github.com/code4fukui/stdwords-jp): Glossary of Standard Guidelines from the Government CIO Portal.
- [BaseRegistry](https://github.com/code4fukui/BaseRegistry): A project related to Japan's base registries.

## Source

- [Discussion Papers | Government CIO Portal](https://cio.go.jp/dp)

## License

This repository is available under the [MIT License](LICENSE).