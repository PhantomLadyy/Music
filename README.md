# listen to twenty three — portfolio website

A custom, responsive music portfolio built from scratch with HTML, CSS, JavaScript and four original local SVG artworks. No framework or external image host is required.

## Files

- `index.html` — home page with a manual artwork carousel and featured tracks.
- `music.html` — searchable/filterable archive with three featured tracks and one standalone visual study.
- `about.html` — project story, design principles and YouTube link.
- `styles.css` — custom styling, desktop/tablet/mobile layouts, theme palettes, focus states and reduced-motion support.
- `script.js` — mobile navigation, light/dark theme, manually controlled carousel, archive search/filter and current year.
- `assets/` — four original SVG artwork files.
- `SUBMISSION_TEXT.md` — ready-to-paste description for the Coursera submission.

## Preview locally

1. Extract the ZIP file.
2. Open the extracted folder in Visual Studio Code.
3. Open `index.html` with Live Server, or open `index.html` directly in a browser.
4. Check all three navigation links, the theme toggle, carousel controls and the search/filter controls on `music.html`.

## Publish to get a public URL

This ZIP is the completed website source, but it does not automatically create a public internet URL. To get a URL for the Coursera field, publish the folder to a static host such as GitHub Pages:

1. Sign in to GitHub and create a new **public** repository named `listen-to-twenty-three`.
2. Upload the *contents* of this folder (the three `.html` files, `styles.css`, `script.js`, `assets/`, and this README) to the repository root. Do not upload the ZIP as the only file.
3. In the repository, open **Settings → Pages**.
4. Under the build/deployment section, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Wait for GitHub Pages to finish publishing. Copy the live URL displayed in the Pages settings and open it in a private/incognito window to test it. The URL often resembles `https://YOUR-USERNAME.github.io/listen-to-twenty-three/`; replace `YOUR-USERNAME` with your actual GitHub username and use the exact URL GitHub provides.

If the class requires a specific host, use the same files with that host instead. Do not paste the example URL until it has actually been published and tested.

## Before submitting

- Validate each HTML page at <https://validator.w3.org/> after publishing or by uploading the files to the validator.
- Check accessibility with <https://wave.webaim.org/>. Review any warnings manually.
- Test mobile, tablet and desktop widths in browser developer tools. Save screenshots for the submission evidence.
- The three music links intentionally lead to the artist channel rather than a guessed track-specific URL. Replace them with direct video URLs if you have the exact links.

## Four enhancements to identify in the submission

1. **Custom JavaScript archive search/filter** — searches title/description text and filters between all items, tracks and visual study; includes a no-results state and reset control.
2. **Manual artwork carousel** — previous/next and direct slide controls, ARIA labels and a live announcement; it does not autoplay.
3. **Light/dark theme switch** — changes the site's palette and stores the preference when browser storage is available.
4. **Accessibility improvements** — skip-to-content link, semantic landmarks, alt text, labelled controls, visible keyboard focus, ARIA state/live announcements and reduced-motion support.

Additional implementation details: three distinct responsive layout ranges and a flex-based sticky footer structure that keeps the footer at the bottom on short pages.
