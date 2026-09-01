# ZEMAI — Know Before They Strike

A modern, dark-themed landing page for **ZEMAI**, a breach-intelligence and password-security product concept. Built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

## Features

- **Animated terminal demo** — simulates a live breach scan with typewriter-style output
- **Scroll-triggered reveal animations** using `IntersectionObserver`
- **Responsive navigation** with a mobile burger menu and accessible `aria-expanded` states
- **FAQ accordion** with single-open behavior
- **Contact form** with inline field validation (no intrusive alerts)
- **Fully responsive design** — works across desktop, tablet, and mobile
- Clean dark UI with gradient accents, custom fonts (`Outfit` + `DM Mono`), and subtle noise/grain texture for depth

## Tech Stack

- HTML5
- CSS3 (custom properties / CSS variables, no preprocessor)
- Vanilla JavaScript (no dependencies)
- Google Fonts (`Outfit`, `DM Mono`)

## Project Structure

```
├── zemai.html      # Main page markup + embedded styles/script
├── style.css        # Standalone stylesheet (if used separately)
├── app.js           # Standalone JS (if used separately)
```

## Getting Started

Simply open `zemai.html` in a browser — no build tools or server required.

```bash
git clone https://github.com/your-username/zemai.git
cd zemai
open zemai.html   # or double-click the file
```

## Sections

- **Hero** — headline, CTA buttons, and animated terminal preview
- **Features** — product capability highlights
- **Pricing** — plan tiers
- **FAQ** — collapsible Q&A
- **Contact** — validated inquiry form
- **Footer** — site links and legal

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This is a front-end landing page / UI concept only. It does not include a real backend, breach-checking API integration, or data storage — the terminal animation and "scan" results are simulated for demonstration purposes.
