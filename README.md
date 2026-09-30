# Microslop

A parody Chrome extension that replaces "Microsoft" with "Microslop" on every page you visit.

- Keeps the capitalisation: `Microsoft` → `Microslop`, `MICROSOFT` → `MICROSLOP`, `microsoft` → `microslop`
- Also renames the tab title
- Leaves form fields, editable areas, scripts and `<code>`/`<pre>` blocks untouched
- Catches text that appears after the page loads (single-page apps, infinite scroll)

## Install from source

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked** and select this folder

## Build a release zip

```sh
zip -r microslop-$(jq -r .version manifest.json).zip manifest.json content.js icons
```

## Privacy

The extension collects no data and makes no network requests. Everything happens locally in your browser.

Not affiliated with or endorsed by Microsoft Corporation.
