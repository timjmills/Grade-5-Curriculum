# How to update the Grade 5 site — 22 Aug 2026 (rev. 2)

Everything is staged for you in:

```
2026-2027\grade5-website\UPLOAD TO GITHUB — 2026-08-22\
```

**42 files in three folders** — the only ones that changed.

| Folder | Files | What changed |
|---|---|---|
| `weeks\` | 35 — `week-01.html` … `week-35.html` | math pacing row, vocabulary word links, "Unit:" line, spelling High/Low padlets, grammar packet links |
| `subjects\` | 4 — `math.html`, `grammar.html`, `vocabulary.html`, `spelling.html` | math map rebuilt to 39 pacing weeks; grammar/vocab/spelling pages linked |
| `assets\vocab\` | 3 — `vocab-g5.pdf`, `vocab-g3.pdf`, `vocab-unit.pdf` | **NEW** — the vocabulary card PDFs now live on the site itself |

## Why the vocabulary PDFs moved

Google Drive's PDF viewer ignores the `#page=` part of a link — it always opens at page 1, no matter what the address bar says. Nothing to be done about that from our end.

So the three vocabulary decks are now served from the site itself. The browser's own PDF viewer *does* honour `#page=`, so every word now opens on its own card. Same fix applied to all 35 Word weekly plans.

---

## ⚠️ First — ignore the old folder

There's a second folder called **`UPLOAD TO GITHUB — spelling update`**. It's from July and out of date. Uploading it would undo this work. Delete it when convenient.

---

## Steps

**1. Sign in to GitHub**

Go to <https://github.com> and sign in as `timjmills`. If you're not signed in, the **Add file** button doesn't appear.

**2. Open the repository**

<https://github.com/timjmills/Grade-5-Curriculum> — check the branch button says **main**.

**3. Upload the week pages**

- **Add file** → **Upload files** (green-outlined button, left of the green **Code** button)
- Drag the **`weeks` folder itself** onto the upload area — not the 35 files inside it. Dragging the folder keeps the `weeks/` path so the files replace the existing ones.
- Commit message: `Update weeks 1-35: math pacing, vocabulary + spelling links`
- Leave **"Commit directly to the main branch"** selected → **Commit changes**

**4. Upload the subject pages**

Same again, dragging the **`subjects`** folder.

Commit message: `Update math, grammar, vocabulary and spelling subject pages`

**5. Upload the vocabulary PDFs**

Same again, dragging the **`assets`** folder (it contains `vocab\` inside — drag `assets`, not `vocab`, so the path becomes `assets/vocab/`).

Commit message: `Add vocabulary card PDFs`

This won't touch the existing `assets/css`, `assets/js` or `assets/assessments` — GitHub only replaces files with matching names.

**6. Wait for the rebuild**

1–2 minutes, occasionally up to 10. The **Actions** tab shows a yellow dot while building, green tick when live.

**7. Check it worked**

Open <https://grade5.cultivatingthedigital.org> and hard-refresh (`Ctrl`+`F5` on Windows, `Cmd`+`Shift`+`R` on Mac).

| Go to | You should see |
|---|---|
| Week 1 → Vocabulary row, **Tuesday**, click the G5 word | the PDF opens **on that word's card**, not page 1 |
| Week 1 → Vocabulary & Spelling row | High **and** Low padlet links; a third **Unit:** line under G5/G3 |
| Week 1 → Math row | Three columns — STANDARD / PRIORITY / INTERVENTION — yellow power-standard highlights |
| Week 1 → Grammar row | Low (K-1) / Mid (2-3) / High (4-6), every option a link |
| Subjects → Math | "Weekly Pacing Guide 2026-27", all 39 weeks |

---

## If something looks wrong

- **Page looks unchanged** → caching. Hard-refresh again or use a private window.
- **Vocabulary link 404s** → the `assets` upload didn't land. The address should be `grade5.cultivatingthedigital.org/assets/vocab/vocab-g5.pdf#page=…`. If it reads `.../UPLOAD TO GITHUB — 2026-08-22/assets/...` you dragged from one level too high — delete that folder in GitHub and re-drag `assets`.
- **A link opens the wrong card** → tell me the week, day and word and I'll trace it.

---

## Not in this upload

`index.html`, `progress.html`, `assets\css`, `assets\js`, `assets\assessments` — untouched on purpose. The pacing guide's W36–W39 appear only on the math subject page, tagged "beyond week 35".
