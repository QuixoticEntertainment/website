# Quixotic Entertainment — website

Static studio site for **https://quixotic-entertainment.com**, hosted on GitHub Pages. No build step: every file at the repo root goes live as-is.

```
index.html      the whole site (hero, the name, Defiant Signal, mission/vision/values, founders, news, contact)
404.html        "page not found" page (GitHub Pages serves it automatically)
css/style.css   all styling; colors and fonts are the variables at the top
js/main.js      mobile menu, scroll reveal, footer year
assets/         logo.svg, favicon.svg, og-image.png (link preview image, 1200×630)
CNAME           tells GitHub Pages the custom domain, don't delete it
serve.ps1       local preview server
```

## Editing content

Search `index.html` for `TODO` to find all the placeholder content: the Defiant Signal premise, the roadmap's "Next" step, founders, news, email address and social links.

The look follows the studio identity: near-black navy `#12151C`, ember orange `#F26B3A` (`#C2481C` on light sections), warm off-white `#F2EEE6`, Oswald headings and Rubik body text. Sections alternate `class="section dark"` and `class="section light"`. All colors are variables at the top of `css/style.css`.

- **Founder photos:** put the photo in `assets/` and replace `<span class="avatar" aria-hidden="true"></span>` with `<img class="avatar" src="/assets/name.jpg" alt="Name">`.
- **News posts:** copy an `<article class="news-item">` block and keep the newest one at the top.

Internal documents (the pitch deck PDF and the studio identity doc) are listed in `.gitignore`. The repo is public, so anything committed would also be downloadable from the website.
- **Link preview:** replace `assets/og-image.png` with your own 1200×630 image if you like.

## Preview locally

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Then open http://localhost:8000.

## Publish

Push to the `main` branch and GitHub Pages redeploys within a minute or two:

```bash
git add -A
git commit -m "Update site"
git push
```

## Domain / DNS (Combell)

DNS for the domain is managed in the Combell control panel under DNS management. The site needs these records:

| Type  | Name  | Value                        |
|-------|-------|------------------------------|
| A     | @     | 185.199.108.153              |
| A     | @     | 185.199.109.153              |
| A     | @     | 185.199.110.153              |
| A     | @     | 185.199.111.153              |
| AAAA  | @     | 2606:50c0:8000::153 (optional, also …8001, …8002, …8003) |
| CNAME | www   | `quixoticentertainment.github.io` |

Don't touch the MX/TXT records; those handle email. In the repo's **Settings → Pages**, the custom domain should be `quixotic-entertainment.com` and **Enforce HTTPS** should be on.
