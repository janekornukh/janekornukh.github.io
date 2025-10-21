## Portfolio Refactor Roadmap

Use this checklist to track the major refactors before the visual redesign. Flip any item to ✅ when complete.

### 🧱 Architecture & Build System
- ✅ [ARCH] Adopt a templating/static site generator (e.g. Jekyll/Eleventy) so shared layout, header, and footer live in one place instead of per-page duplicates.
- ✅ [ARCH] Consolidate dependency loading into one bundle (single Bootstrap/jQuery source, remove duplicate CDN calls) and introduce a lightweight build step for minification/cache busting.
- ✅ [ARCH] Normalize the asset directory structure (unify `assets/img` vs `images`, enforce naming conventions, document usage).

### 🧩 HTML Structure
- [ ] [HTML] Fix semantics on existing pages (single `<main>`, no `<ul>` inside `<p>`, consistent alt text).
- [ ] [HTML] Replace inline case study pages with data-driven content (Markdown/JSON feeding the new template).
- [ ] [HTML] Rebuild the contact form against a server/serverless endpoint and delete the obsolete `forms/contact.php`.

### 🎨 CSS & Design System
- [ ] [CSS] Introduce shared design tokens (colors, spacing, typography) and migrate the 1,300-line `style.css` into scoped component/utility modules.
- [ ] [CSS] Merge page-specific CSS (`pine-cone.css`, `sound-cloud.css`, etc.) into a consistent modifier or component system to prevent selector duplication.
- [ ] [CSS] Centralize font declarations and ensure a single download path with fallbacks.
- [ ] [CSS] Break CSS into Sass partials (layout, components, utilities) compiled via Jekyll, making per-case-study overrides simpler to maintain.

### ⚙️ JavaScript
- [ ] [JS] Rewrite `assets/js/main.js`, `index.js`, and `case-study.js` as ES modules without jQuery dependencies; remove unused vendor libraries.
- [ ] [JS] Move the contact form email logic off the client (remove exposed secure token) and rely on the new backend handler.
- [ ] [JS] Implement component-based behaviors (navigation, portfolio filters, animations) and load them per page via the build step.

### 📦 Assets & Performance
- [ ] [PERF] Audit hero/background imagery, generate optimized WebP/AVIF variants, and serve via responsive markup/CSS `image-set`.
- [ ] [PERF] Defer or conditionally load analytics/Hotjar scripts to improve initial load, documenting consent strategy.
- [ ] [PERF] Remove unused vendor packages and run a final bundle size review after the new build pipeline is live.

### 🗂️ Content & Data Structure
- [ ] [DATA] Move case-study pages into a Jekyll collection (e.g. `_case_studies/`) with shared layouts and metadata-driven cards/detail pages.
- [ ] [DATA] Extract shared copy (navigation labels, footer/social links, contact info) into `_data/` files to centralize updates.
- [ ] [DATA] Relocate documentation files (e.g. refactor notes) into a dedicated `docs/` or `_notes/` folder to keep the root clean.

### 🔧 Tooling Improvements
- [ ] [DEV] Configure Sass/JS build scripts or tooling (e.g. npm scripts) to lint, format, and bundle assets consistently.
- [ ] [DEV] Establish linting/formatting (Prettier, Stylelint, ESLint) and wire them into pre-commit or GitHub workflows for code quality.
