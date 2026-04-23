# Amoo Quadri Ayomikun — Portfolio Website

A clean, modern, and fully responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. Designed to showcase projects, skills, and experience — with zero frameworks, zero dependencies.

**Live Site:** https://amoo-quadri-ayomikun-portfolio.onrender.com

## Features

- **Fully Responsive** — Fluid layouts across all screen sizes: mobile (360px) through widescreen desktop (1440px+)
- **Dark / Light Theme** — Toggle with persistence via `localStorage`
- **Smooth Scroll Animations** — Intersection Observer–powered reveal animations on scroll
- **Animated Skill Bars** — Progress bars animate in when scrolled into view
- **Project Filtering** — Filter projects by category with instant show/hide
- **Working Contact Form** — Powered by [Formspree](https://formspree.io) with loading state, success, and error feedback
- **Active Nav Highlighting** — Current page link is automatically highlighted
- **Mobile Hamburger Menu** — Animated open/close with outside-click dismissal
- **No Frameworks** — Pure HTML, CSS, and JavaScript

## JavaScript Modules (`main.js`)

The entire site's interactivity is handled in a single, well-organized `main.js` file:

**Theme System**
Reads saved preference from `localStorage` on load, toggles between dark and light mode, and updates the sun/moon icon accordingly.

**Navigation**
Automatically marks the current page's nav link as active by comparing `window.location.pathname` against each link's `href`. Handles the mobile hamburger menu with open/close animation and outside-click dismissal.

**Scroll Animations**
Uses `IntersectionObserver` to watch `.reveal` elements and add the `.revealed` class when they enter the viewport, triggering CSS transitions. A second observer animates skill bar widths when the skills section is scrolled into view.

**Project Filtering**
Filter buttons read a `data-filter` attribute and compare it against each project card's `data-tags` attribute to show or hide cards instantly.

**Contact Form**
Intercepts the native form submit, sends data to Formspree via `fetch`, and displays a success or error message with a loading spinner on the button while the request is in flight.


## Contact

**Amoo Quadri Ayomikun**

- Email: [amooquadri555@gmail.com](mailto:amooquadri555@gmail.com)
- GitHub: [@AmooAyomikun](https://github.com/AmooAyomikun)
- LinkedIn: [ayomikun-amoo-6b836428b](https://www.linkedin.com/in/ayomikun-amoo-6b836428b/)
- Twitter / X: [@ayomhykun](https://x.com/ayomhykun)

