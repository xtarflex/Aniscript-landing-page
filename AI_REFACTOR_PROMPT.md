# AniScript Website Refactoring Prompt

**Context:**
We have a single `index.html` file that currently houses the entire landing page and documentation site for a new package called `aniscript`. We want to refactor this monolithic HTML file into a modern, component-based, modular file structure using **Vite** as the build tool.

We have already initialized a Git repository, installed `vite` as a dev dependency, installed the core `aniscript` package via `npm`, and added the necessary `npm run dev` and `npm run build` scripts.

**Your Objective:**
Refactor the existing `index.html` into a highly modular project while maintaining exact functionality and aesthetics. You MUST utilize the modular CSS and JS structures as specified in the project preferences.

**Step-by-Step Instructions:**

1. **JavaScript Refactoring (ES6 Modules):**
   - We prefer a modular structure using ES6 imports.
   - Refactor the hardcoded animation logic from the single HTML file into separate JS files inside the `js/` directory.
   - Create a `js/main.js` which serves as the primary entry point script.
   - `main.js` should import `compile` and `init` from the **npm-installed `aniscript` module** (e.g., `import { init, compile } from 'aniscript';`), completely replacing any raw/native implementations.
   - Break down complex logic (like the Live Playground parsing) into separate components inside `js/components/` (e.g., `js/components/Playground.js`) and utilities into `js/utils/`.
   - Use strict **JSDoc** commenting on all functions specifying `@param`, `@returns`, and a description.

2. **CSS Refactoring (Modular Architecture):**
   - We prefer a component-based approach for CSS.
   - You must break down the giant `<style>` block in the HTML file into separate `.css` files.
   - Use a `css/style.css` as the root stylesheet, which utilizes `@import` to load partials from:
     - `css/base/` (CSS resets, variables, typography)
     - `css/layout/` (Structure, grids, navbars)
     - `css/components/` (Hero, Cards, Buttons, Form inputs)
     - `css/pages/` (Specific page overrides, if any)
   - Ensure the `index.html` only references `<link rel="stylesheet" href="./css/style.css">`.

3. **HTML Refactoring:**
   - Clean up the HTML file by removing all the `<style>` and `<script>` blocks.
   - Ensure you link the modular CSS correctly.
   - Add `<script type="module" src="./js/main.js"></script>` at the bottom of the body.
   - Ensure the core structure is intact:
     - The Hero section (logo, animated DSL window, headline).
     - The Stats strip (53 animations / 0 dependencies / 100% GPU / ~4kb).
     - "How it Works" section with hoverable cards.
     - "Live Playground" with the 3 presets (Hero, Stagger, Mixed).
     - "Animation Gallery" with clickable cards for all 53 animations.
     - The Install commands (NPM and CDN code blocks).
     - The API Reference table.

4. **Validation:**
   - Verify that the site looks visually identical to the original monolithic layout.
   - Verify that running `npm run dev` successfully spins up a Vite server with no compilation errors.
   - Test the Live Playground ensuring it dynamically generates elements using the imported `aniscript` module.

**Constraint Checklist:**
- [ ] No hardcoded `<style>` blocks in `index.html`.
- [ ] No inline scripts or large `<script>` blocks in `index.html`.
- [ ] Uses ES6 imports in JS files.
- [ ] Uses `@import` to aggregate CSS.
- [ ] Imports the `aniscript` node module, rather than relying on custom inline logic for animations.
- [ ] All JS functions strictly annotated with JSDoc headers.
