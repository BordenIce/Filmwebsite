# 🎬 Film Project

A responsive movie catalog website built with plain **HTML, CSS and JavaScript**. Browse movies, series, cartoons and anime, discover new releases and announcements, and switch between dark and light themes. No frameworks, no build step.

## Features

- **7 sections:** Movies, Series, Cartoons, Anime, New, Announcements and Collections
- **Search, genre filter and sorting** (newest, oldest, A–Z) on every page
- **Curated collections** assembled from the existing catalog
- **Dark / light theme** with a toggle; follows the system theme on the first visit and remembers your choice
- **Responsive layout:** adaptive poster grid, burger menu and scrollable section menu on mobile
- **Sign in / Register dialogs** with built-in form validation (demo only, no backend)
- **Accessible:** keyboard focus styles, labelled form fields, `prefers-reduced-motion` support
- **Single-page routing** via URL hash (`#film`, `#serial`, `#collections/action`, …)

## Project structure

```
Film_Project/
├── index.html      # Page markup (header, menu, grid, dialogs)
├── style.css       # Styles and theme variables
├── script.js       # Routing, rendering, search/filter, theme, dialogs
├── data.js         # Catalog data (all movies, series, collections)
├── logo-dark.png   # Logo for the dark theme
└── logo-light.png  # Logo for the light theme
```

## Getting started

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Open `index.html` in your browser, or serve the folder locally:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

## Adding content

All content lives in `data.js`. To add a title, append an object to the right section:

```js
{
  title: "Dune: Part Two",
  year: "2024",
  country: "USA",
  genre: "Sci-Fi",
  poster: "https://example.com/poster.jpg", // optional, a placeholder is shown without it
  url: "https://example.com/dune-2",         // optional link
  date: "Mar 1"                              // optional badge (used by New / Announcements)
}
```

To create a collection, add an entry to `CATALOG.collections.list` with a `slug`, `title`, `desc` and a list of `picks` (exact titles from the catalog).

## Tech stack

- HTML5 (`<dialog>`, semantic landmarks)
- CSS3 (Grid, Flexbox, custom properties for theming)
- Vanilla JavaScript (ES6+)
- Google Fonts: Play, Inter

## Roadmap

- [ ] Movie detail pages with description and rating
- [ ] Real pagination
- [ ] Bookmarks and "Continue watching" stored in `localStorage`
- [ ] Pages for the sign in / registration backend
- [ ] Load posters and data from the [TMDB API](https://www.themoviedb.org/documentation/api)

## Notes

- Poster images for the original titles are hotlinked from external sites and may stop loading if those links change. Hosting your own copies or using an API such as TMDB is more reliable.
- Release dates in **New** and **Announcements** are subject to change.
- This is a learning/portfolio project and does not host or stream any video content.

## License

Released under the [MIT License](LICENSE). Add a `LICENSE` file to the repository root, or replace this section with the license you prefer.
