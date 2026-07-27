# Personal Website

Static personal profile website for MD Eliasinul Islam.

## GitHub Pages

The site is ready to host directly from the repository root:

1. Push this folder to `eliasinul/personal_website`.
2. Open the repository **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder.
5. Save.

No build step or package installation is required.

## Reproducible build

Run:

```powershell
.\build.cmd
```

This creates a clean, validated website in `dist\` and generates
`dist\build-manifest.txt` with SHA-256 checksums for every published file.

See `docs\UPDATE_GUIDE.md` for a complete map of where to update profile,
employment, education, portfolio, images, links, and styling.

## Structure

- `index.html` — website content
- `assets/` — stylesheet and tab navigation script
- `docs/` — downloadable résumé
- `resources/` — profile and social-preview images
- `build.cmd` — one-command Windows build
- `build.ps1` — build, validation, and manifest logic
- `docs/UPDATE_GUIDE.md` — content maintenance guide
