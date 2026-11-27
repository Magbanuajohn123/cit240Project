# John Lloyd Magbanua — Personal Web Portfolio

A responsive personal portfolio built with **HTML5, CSS3 and vanilla JavaScript**, deployed on **GitHub Pages**. It is the final capstone portfolio assignment for **CIT 240: Open Source Programming**, and showcases my skills, projects, open source contributions and capstone work.

**Live site:** https://magbanuajohn123.github.io/
**Repository:** https://github.com/Magbanuajohn123

---

## About

I'm a 4th year IT student and an aspiring web developer and software tester. I build clean, accessible and responsive websites, test them to catch bugs before users do, and use prompt engineering to work faster with AI tools.

**Career goal:** grow into a web developer and software tester who contributes to open source projects and delivers reliable, well-tested software.

---

## Features

- **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` and `<footer>` for accessibility and SEO, plus a skip-to-content link and ARIA labels.
- **Responsive CSS3:** mobile-first layout using Flexbox and CSS Grid, with `@media` breakpoints and CSS variables.
- **Vanilla JavaScript interactivity:**
  - Responsive mobile navigation menu
  - Smooth-scrolling anchor navigation
  - Light/dark theme toggle, saved in `localStorage` and defaulting to the system preference
- **Required sections:** Header & Navigation, About/Hero, Technical Skills, Featured Projects, Open Source & Capstone, Contact & Footer.
- **No frameworks or build step:** open `index.html` and it works.

---

## Portfolio Sections

| Section | Anchor | Description |
| --- | --- | --- |
| About / Hero | `#about` | Short bio, professional title, career goal, GitHub and LinkedIn links |
| Skills | `#skills` | Categorized skill badges: Languages, Frontend, Backend & Data, Tools & DevOps |
| Projects | `#projects` | Project cards with screenshot, description, tech tags, source and live demo links |
| Open Source | `#opensource` | CIT 240 capstone and open source contribution highlights |
| Contact | `#contact` | Social profiles and a call to collaborate |

---

## Featured Projects

| Project | Description | Tech Stack | Links |
| --- | --- | --- | --- |
| **SciLearn** | A Learning Management System for Biology Subject with Project Tracking and Leaderboard | HTML, CSS, JavaScript, PHP, MySQL | [Live demo](https://scilearn.infinityfreeapp.com/?i=1) |
| **Kapeling** | A Coffee Shop Ordering System | Laravel, Tailwind, MySQL | [Source](https://github.com/Magbanuajohn123/KapeLing) |
| **Triple A** | Inventory Management System focused on catering materials, with booking acceptance for catering services | Laravel, Tailwind, MySQL | [Source](https://github.com/Magbanuajohn123/tripleA) |

---

## Technical Skills

- **Languages:** HTML5, CSS3, JavaScript, PHP, Laravel, SQL
- **Frontend:** Responsive Design, Flexbox, CSS Grid, Accessibility
- **Backend & Data:** MySQL, PHP, Laravel
- **Tools & DevOps:** Git, GitHub, GitHub Pages, XAMPP, Laragon, VS Code, Prompt Engineering

---

## Project Structure

```
portfolio/
├── index.html      # Main landing page and section anchors
├── style.css       # Custom styles, CSS variables and media queries
├── script.js       # Navigation toggle, theme toggle and DOM manipulation
├── README.md       # Project documentation and setup instructions
└── asset/          # Screenshots, profile photo and project media
```

---

## Run Locally

No installation or build tools are required.

```bash
# 1. Clone the repository
git clone https://github.com/Magbanuajohn123/<repo-name>.git

# 2. Move into the project folder
cd <repo-name>

# 3. Open index.html in your browser
```

For a local server with live reload, use the **Live Server** extension in VS Code, or run:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

---

## Deployment (GitHub Pages)

1. **Initialize Git** in the portfolio folder:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio build"
   ```
2. **Create a public repository** on GitHub, named `<username>.github.io` (User Site) or `portfolio` (Project Site).
3. **Push the code:**
   ```bash
   git remote add origin <repo-url>
   git branch -M main
   git push -u origin main
   ```
4. **Enable GitHub Pages:** go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose branch `main` and folder `/ (root)`, then click **Save**.
5. **Verify:** wait 1–2 minutes for the build, then open the live URL (e.g. `https://<username>.github.io/`).

---

## Open Source & Capstone (CIT 240)

- **Capstone — SciLearn:** a Learning Management System for Biology Subject with Project Tracking and Leaderboard. [View live](https://scilearn.infinityfreeapp.com/?i=1)
- **Open source contribution:** documentation fixes and a bug report, practicing the fork, branch and pull request workflow. [See pull request](https://github.com/lukearaquil/cit240-developer-directory/pull/1)
- **Kapeling:** a Coffee Shop Ordering System built with Laravel, MySQL and Tailwind. [View repository](https://github.com/Magbanuajohn123/KapeLing)

---

## Accessibility

- Skip-to-content link
- Semantic landmarks and heading hierarchy
- `aria-label`, `aria-expanded` and `aria-controls` on interactive controls
- Descriptive `alt` text on images
- Light and dark themes that respect `prefers-color-scheme`

---

## Contact

- GitHub: [Magbanuajohn123](https://github.com/Magbanuajohn123)
- LinkedIn: [John Lloyd Magbanua](https://www.linkedin.com/in/john-lloyd-magbanua-a675b7417)

Open to internships, collaborations and open source projects.

---

## License

&copy; 2026 John Lloyd Magbanua. All rights reserved.

*Built with HTML, CSS and vanilla JavaScript for CIT 240: Open Source Programming.*
