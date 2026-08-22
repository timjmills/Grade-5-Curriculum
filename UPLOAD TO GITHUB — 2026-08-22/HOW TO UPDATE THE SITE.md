# How to update the Grade 5 site — 22 Aug 2026

Everything below is already staged for you in:

```
2026-2027\grade5-website\UPLOAD TO GITHUB — 2026-08-22\
```

That folder holds **39 files** — the only ones that changed. Nothing else in the site was touched.

| Folder | Files | What changed |
|---|---|---|
| `weeks\` | 35 — `week-01.html` … `week-35.html` | new math pacing row, vocabulary word links + "Unit:" line, spelling High/Low padlet links, grammar packet links |
| `subjects\` | 4 — `math.html`, `grammar.html`, `vocabulary.html`, `spelling.html` | math map rebuilt to 39 pacing weeks; grammar/vocab/spelling pages linked |

---

## ⚠️ First — ignore the old folder

There is a second folder next to it called **`UPLOAD TO GITHUB — spelling update`**. That one is from July and is **out of date**. Uploading from it would undo today's work. Use only the `— 2026-08-22` folder, and delete the old one when convenient.

---

## Steps

**1. Open the repository**

Go to <https://github.com/timjmills/Grade-5-Curriculum>

Make sure you're on the **main** branch (the branch button near the top-left should say `main`).

**2. Upload the week pages**

- Click **Add file** (top right of the file list) → **Upload files**
- Open the `UPLOAD TO GITHUB — 2026-08-22` folder on your computer
- Drag the **`weeks`** folder itself onto the upload area — not the files inside it

  Dragging the folder keeps the `weeks/` path, so the 35 files land in the right place and replace the existing ones.

- Scroll down. In the commit box type something like:

  `Update weeks 1–35: new math pacing, vocabulary + spelling links`

- Leave **"Commit directly to the main branch"** selected
- Click **Commit changes**

**3. Upload the subject pages**

Repeat exactly the same steps, but this time drag the **`subjects`** folder.

Commit message suggestion:

  `Update math, grammar, vocabulary and spelling subject pages`

**4. Wait for the site to rebuild**

GitHub Pages redeploys automatically — usually **1–2 minutes**, occasionally up to 10.

You can watch it: on the repo page click the **Actions** tab. A yellow dot means building, a green tick means live.

**5. Check it worked**

Open <https://grade5.cultivatingthedigital.org> and **hard-refresh** so you don't see a cached copy:

- Windows: `Ctrl` + `F5`
- Mac: `Cmd` + `Shift` + `R`

Then spot-check these four things:

| Go to | You should see |
|---|---|
| Week 1 → Vocabulary & Spelling row | "Grade 5 High Spelling Padlet" **and** "Grade 5 Low Spelling Padlet"; a third **Unit: organ** line under G5/G3; words are clickable |
| Week 1 → Math row | Three columns — STANDARD / PRIORITY / INTERVENTION — with yellow-highlighted steps and rows of VIDEO · GUIDE · SLIDES links |
| Week 1 → Grammar row | "Packets — **Low (K-1)** … **Mid (2-3)** … **High (4-6)**" with every option a link |
| Subjects → Math | "Weekly Pacing Guide 2026-27" with all 39 weeks |

Click one vocabulary word — it should open the PDF **at that word's page**, not page 1.

---

## If something looks wrong

- **Page looks unchanged** → it's almost always caching. Hard-refresh again, or open the site in a private/incognito window.
- **Upload didn't replace the files** → check they landed at `weeks/week-01.html`, not `UPLOAD TO GITHUB — 2026-08-22/weeks/week-01.html`. If the path is wrong, you dragged from one level too high. Delete the wrongly-placed folder in GitHub and re-upload by dragging the `weeks` folder itself.
- **A link opens the wrong thing** → tell me which week and which link and I'll trace it.

---

## What is NOT in this upload

These were left alone on purpose, so don't go looking for changes:

- `index.html`, `progress.html`, `assets\` (CSS/JS), `assessments\` — untouched
- Weeks 1–35 are the whole site's weekly plans; the math pacing guide's **W36–W39** appear only on the math subject page, tagged "beyond week 35"
