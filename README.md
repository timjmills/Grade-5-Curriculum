# Grade 5 Curriculum Website 2026-2027 — Awsaj Academy

A static site: 35 weekly plan pages, 5 subject curriculum maps, and all assessment PDFs.
No build step — plain HTML/CSS/JS.

## Publish on GitHub Pages — custom domain grade5.cultivatingthedigital.org
1. Create a new GitHub repository (e.g. `grade5-curriculum`), public.
2. Upload the ENTIRE contents of this folder to the repository root
   (drag-and-drop on github.com: Add file → Upload files → commit).
   The `CNAME` file (already included) tells GitHub the custom domain.
3. Repo → Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save.
4. DNS — at the DNS provider for **cultivatingthedigital.org**, add:
   `CNAME  grade5  →  <your-github-username>.github.io`
   (name/host: `grade5`, target: your GitHub Pages hostname, TTL default.)
5. Back in Settings → Pages, the custom domain box should show
   `grade5.cultivatingthedigital.org` (from the CNAME file). Wait for the DNS check,
   then tick **Enforce HTTPS** (appears once the certificate is issued, ~15 min).
6. Site is live at https://grade5.cultivatingthedigital.org

## Add Google Drive links later
Open `assets/js/drive-links.js` and paste the Drive URL between the quotes, e.g.
```js
"week-01": "https://drive.google.com/drive/folders/XXXX",
"subject-reading": "https://drive.google.com/…",
"assessments-Unit_1_-_The_Amazing_Body": "https://drive.google.com/…",
```
Every page with a matching key automatically shows a "📂 Open in Google Drive" button. No other edits needed.

## Lesson check-off (My Progress)
Every Reading / Grammar / Writing / Math / Explorer lesson cell on the week pages has a
"mark done" button — plus Spelling (Mon intro + Thu test, 🔡 button in the Reading row) and
Daily Vocabulary (one per day, in the Vocabulary row). 769 trackable items in total. Checked cells turn dark with a ✓ DONE badge. The **My Progress** page
has three tabs — By Week, By Subject, By Unit — each row expands into a checkable inline
checklist. Subject chips at the top turn subjects on/off: lessons stay visible on all plan
pages, they just lose their check button and stop counting.
Progress is stored in the browser's localStorage — per teacher, per computer, nothing uploaded.
Clearing browser data (or switching devices) resets it.

## Structure
- `index.html` — home: current-week banner (auto), search, unit + subject cards
- `weeks/week-01.html … week-35.html` — full-colour replicas of the weekly plans (prev/next, print button)
- `subjects/` — Explorers, Writing, Grammar, Reading, Math curriculum maps
- `assessments/` — all assessment PDFs by unit (view / download)
- `progress.html` — per-teacher completion dashboard (localStorage)
- `assets/` — css, js, images, assessment PDFs

⚠️ Note: this site is public once published — that includes the **Teacher Key** PDFs.
