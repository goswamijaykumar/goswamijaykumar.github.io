# jaygoswami.github.io

Personal portfolio of **Jay Goswami** — robotics & mechatronics engineer at Northeastern University. Live at **[www.jaygoswami.com](https://www.jaygoswami.com)** (served from this repository via GitHub Pages — the `CNAME` file points the apex domain at it).

A static site. No build step, no framework, no dependencies to install. Edit the HTML/CSS/JS in place and push.

---

## Structure

```
.
├── index.html                  # Homepage — hero + projects grid + footer
├── style.css                   # Shared design system used by every page
├── theme.js                    # Light/dark theme toggle logic
├── README.md                   # this file
├── CNAME                       # www.jaygoswami.com — leave alone unless changing domain
├── m1.png                      # hero portrait
├── Jaykumar_Goswami_Resume_Robotics.pdf
│
├── pages/                      # one case-study per project
│   ├── asrs.html
│   ├── sm.html
│   ├── printer.html
│   ├── isro.html
│   ├── bio.html
│   ├── pros.html
│   ├── ros.html
│   └── biped.html
│
└── <project folders>/          # images for each case study
    ASRS/  Bio/  Biped/  Prosthetics/  SM/  isro/  printer/  ros/
```

## Theme (light / dark)

The site ships in two themes:

- **First load** uses the visitor's OS preference via `prefers-color-scheme`.
- A small **sun/moon button** in the nav lets visitors override. Their choice is remembered in `localStorage`.
- If they never override, the site automatically follows when the OS toggles between light and dark.

The lime image-tint (`--image-tint`) stays the same in both themes — that's the visual brand. The text/UI accent (`--accent`) switches to a darker forest-green in light mode for legibility. Edit the variables in `:root` (dark) and `[data-theme="light"]` at the top of [`style.css`](style.css) to retune any of it. The toggle button logic lives in [`theme.js`](theme.js); the one-line init `<script>` in each page's `<head>` is what prevents a flash of the wrong theme on first paint.

---

## Editing the homepage

Open [`index.html`](index.html) and scroll to the `<script>` block near the bottom. The project list is a single JavaScript array — every card on the homepage is rendered from it.

```js
const PROJECTS = [
  {
    title: 'Development of ASRS',
    category: 'Warehouse Automation',
    description: 'Spearheaded the design and development of...',
    image: 'ASRS/Main view.jpeg',
    link: 'pages/asrs.html',
    tags: ['PLC', 'HMI', 'IIoT', 'CAD', 'OPC UA'],
    year: '2024',          // optional
    code: 'ASR-01'         // optional ID badge shown on hover
  },
  // ...
];
```

- **Add a project** → duplicate one of the blocks, change the fields. Order in the array = order on the page.
- **Remove a project** → delete the block.
- **Reorder** → move the blocks around.
- **Change an image** → edit `image:` to the new path (relative to repo root). Spaces in filenames are fine.

Below `PROJECTS` is a `MARQUEE_KEYWORDS` array — that's the scrolling tech-keyword strip between the hero and the project grid. Edit it the same way.

The footer's project list, the "08 projects" counter, the marquee, and the project cards all auto-derive from these arrays. You never touch HTML to add a project.

### Decorative HUD strings on the homepage

A few cosmetic readouts live near the top of `<body>` in `index.html`:

- `[COORD] LAT: 42.3398°N · LON: 71.0892°W` — these are the coordinates of Northeastern University, Boston. Update if you move.
- `REV.A · v2.6.0 · build_2026.05` — purely decorative version stamp.
- `BASED IN BOSTON, MA · 08 PROJECTS · v2.6` — in the footer build line.

There's a live UTC clock in the top-right of the nav (driven by `startClock()`); leave it alone unless you want to remove it.

---

## Editing a case-study page

Each file in [`pages/`](pages) is a self-contained HTML document. They all share the same skeleton:

```html
<nav>...</nav>

<main>
  <div class="wrap project-page-hero">      <!-- back link, meta row, title, summary -->
  <div class="wrap"><div class="project-page-image">  <!-- hero image -->
  <div class="wrap"><div class="specs-grid">          <!-- 4-up info table -->

  <div class="wrap section">
    <div class="project-body">
      <!-- One or more <section> blocks here. Add as many as you like. -->
    </div>
  </div>

  <div class="wrap section"><div class="gallery">     <!-- image gallery -->
  <div class="wrap section"><div class="up-next">     <!-- related projects -->
</main>

<footer>...</footer>
```

### Adding a new section of text to a case study

Inside `<div class="project-body">`, drop in a new `<section>` block. Each subpage has a comment showing this exact pattern. Available styles:

```html
<section>
  <h2>Section <em>title</em>.</h2>     <!-- italic part inside <em> turns lime -->
  <p>Plain paragraph text.</p>
  <p>Use <strong>strong</strong> for emphasis, <a href="...">links</a> auto-color.</p>

  <h3>Sub-heading</h3>                  <!-- gets an auto accent-line prefix -->
  <p>...</p>

  <ul>
    <li>Bulleted list with accent dash markers</li>
    <li>...</li>
  </ul>

  <div class="callout">// styled mono-text callout</div>
  <div class="award">★ Award-style callout</div>
  <div class="inline-image"><img src="..." alt=""></div>
</section>
```

### Adding gallery images

```html
<div class="gallery">                              <!-- 3-col grid (default) -->
  <div class="gallery-item">
    <img src="../FolderName/file.jpg" alt="..." loading="lazy">
    <span class="corner tl"></span><span class="corner tr"></span>
    <span class="corner bl"></span><span class="corner br"></span>
  </div>
  <!-- repeat -->
</div>
```

Variants:
- `<div class="gallery gallery--2col">` — 2-column grid (use when you have 2 or 4 images)
- `<div class="gallery-item feature">` — one item spans the full row (good for videos or hero shots)

Pages from the repo use:
- `printer.html`, `biped.html` — 2-col (4 images each)
- `ros.html` — 2-col with a feature video at top
- `pros.html` — 2-col with a feature item at bottom
- `asrs.html` — default 3-col (6 images)
- `sm.html`, `isro.html`, `bio.html` — default 3-col

---

## Editing the design (colors, fonts, spacing)

All of it is in `:root` at the top of [`style.css`](style.css):

```css
:root {
  --bg: #0d0d10;          /* page background */
  --text: #ededeb;        /* main text */
  --accent: #cbff5f;      /* the lime — used for highlights, badges, hover */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-sans: 'Inter', ..., sans-serif;
  --font-mono: 'JetBrains Mono', ..., monospace;
  /* ... */
}
```

Change one variable, the whole site updates. The image hover effect (lime overlay → full color + scanning line + corner brackets) is in the `.project-media`, `.gallery-item`, and `.project-page-image` rules.

---

## Running it locally

It's static HTML — open `index.html` in a browser. Or for the cleaner URL experience:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(A real HTTP server is needed if you ever fetch files via JS, but the current site doesn't.)

---

## Deploying to GitHub Pages

1. Push this repo to `goswamijaykumar.github.io` (or any repo with Pages enabled).
2. In **Settings → Pages**, set the source to the `main` branch root.
3. The `CNAME` file already maps the site to `www.jaygoswami.com`. If you change domains, update `CNAME` and the `<link rel="canonical">` tags inside each HTML file.
4. Google Analytics is wired up via the `G-1LZH9WJWD8` tag in every page's `<head>`. Replace or remove if you don't want it.

---

## Tech / credits

- Hand-written HTML + CSS + a small amount of vanilla JS for the homepage card rendering.
- Fonts loaded from Google Fonts (DM Serif Display, Inter, JetBrains Mono).
- Favicon from icons8.
- Imagined by Jay Goswami · Coded with [Claude](https://claude.com/claude-code).
