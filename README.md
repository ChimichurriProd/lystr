# Sriracha — Client requirements

Two active engagements. Draft requirements + estimates live in [`Requirements/`](./Requirements/). Browsable HTML view at [`index.html`](./index.html) (served via GitHub Pages).

## Documents

- **Lyster** — energy company (brand + explainer video + interactive website + deck) — [`Requirements/Lyster-requirements.md`](./Requirements/Lyster-requirements.md)
- **Lumiverse** — content & distribution venture (brand + PowerPoint template + mockup pitch deck) — [`Requirements/Lumiverse-requirements.md`](./Requirements/Lumiverse-requirements.md)

## Working with this repo

- Open questions are flagged inline in each document. Answer them in the HTML viewer (they save to localStorage and can be exported as markdown) or edit the `.md` files directly and push.
- Raw meeting audio and transcripts are **not** committed (see `.gitignore`). They live locally only.

## Preview locally

The HTML viewer loads the markdown via `fetch()`, so it needs a local HTTP server (not `file://`):

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Or deploy — it just works on GitHub Pages.
