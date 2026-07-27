# Website update guide

The editable website is in:

`E:\CoWork\PROJECTS\personal_website`

Run `build.cmd` after making changes. The verified, publishable copy will be
created in `dist\`.

## Where to update information

### Name, headline and profile introduction

Edit `index.html`, inside:

- `<title>` and the description tags near the top
- `<header class="site-header">` for the short navigation name
- `<section ... id="profile">` for the headline and introductory paragraph

### Current position

Edit the `<div class="current-role">` block in `index.html`.

It currently contains:

- status: `Currently`
- role: `Energy Planner and Analyst (Consultant)`
- organization: `BC Hydro`

### Landing-page statistics

Edit the `<div class="stats">` block in `index.html`.

Each statistic has:

```html
<div>
  <strong>number</strong>
  <span>description</span>
</div>
```

### Focus areas

Edit the `<div class="focus">` block in `index.html`.

The pill-shaped topics are inside `<div class="tags">`.

### Headshot

Replace:

`resources\Headshot_EL_202706.jpeg`

Keep the same filename to avoid editing the HTML. A square or portrait-oriented
image works best because the site crops it into a circle.

### Landing-page background

Replace:

`resources\landing-bg.png`

Keep the left side light and uncluttered so the heading remains readable.

### Résumé download

Replace:

`docs\resume.pdf`

Keep the same filename. The CV tab's download button will update automatically.

### Employment history

Edit the `<div class="timeline">` block in the CV section of `index.html`.

Each position uses:

```html
<article>
  <time>dates</time>
  <div>
    <h3>position</h3>
    <h4>organization</h4>
    <p>description</p>
  </div>
</article>
```

### Education

Edit the `<div class="education">` block in `index.html`.

The ongoing PhD is the article with `class="phd"`. Its `Ongoing` badge is the
`<span>` inside the degree heading.

### Portfolio projects

Edit the `<div class="projects">` block in `index.html`.

For each project, update:

- the project URL in `href`
- logo path in `<img src>`
- logo description in `alt`
- project name in `<h2>`
- summary in `<p>`

Project logos are stored in `resources\logos\`.

### Contact and social links

Search `index.html` for:

- `mailto:`
- `github.com/eliasinul`
- `linkedin.com/in/eliasinul`
- `orcid.org`

Update both the visible text and the destination when an address changes.

### Colors, spacing and appearance

Edit `assets\style.css`.

The main colors are defined at the beginning:

```css
:root {
  --ink: ...;
  --teal: ...;
  --paper: ...;
  --soft: ...;
  --lime: ...;
}
```

### Tab behavior

Edit `assets\script.js` only when changing how the Profile, CV and Portfolio
tabs open. Normal content changes do not require JavaScript edits.

## Build and publish

1. Double-click `build.cmd`, or run it from a terminal.
2. Confirm that it reports `Website build complete`.
3. Preview `dist\index.html`.
4. For GitHub Pages, publish the contents of `dist\` at the repository root.

The build stops if a required folder is missing or `index.html` references a
local asset that cannot be found.
