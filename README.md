# Arman Homafar — academic website

A responsive, accessible, English academic website for GitHub Pages, focused on PhD applications and research collaborations.

**Website:** https://arman-homafar.github.io/

## Content and maintenance

- Edit `template.html` for biography, projects, education, experience, and profile links.
- Edit `publications.json` for the published bibliography. Preserve author order, exact titles, and publication status.
- Run `python3 scripts/build.py` after either edit. This generates `index.html` and `assets/publications.bib`; commit both generated files.
- Replace `assets/Arman-Homafar-CV.pdf` to update the downloadable CV. This is an unchanged copy of the CV provided by Arman.
- Appearance is in `assets/styles.css`; optional filtering and citation copying are in `assets/site.js`.

No dependencies, account system, analytics, external fonts, or runtime build are required. All academic content, profile links, citation text, and downloads work without JavaScript. The two recent projects are described from the CV; no unavailable project repositories or experimental results are implied.

## Preview

```sh
python3 scripts/build.py
python3 -m http.server 8000
```

Open http://localhost:8000.

## GitHub Pages

The repository must be named `Arman-Homafar.github.io`. In **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. The `.nojekyll` file serves the site as static files. Pushes to `main` trigger publication.

## Academic accuracy

Biographical claims, education, grades, projects, teaching, skills, certificates, honours, and the manuscript in preparation come from the CV supplied on 23 October 2026. Google Scholar and LinkedIn URLs are embedded links extracted from that PDF. Arman separately supplied ORCID `0000-0002-8932-5340`.

Publisher and institutional records were consulted to complete abbreviated publication titles and distinguish issue years from online dates. The downloadable CV is unchanged. There are five published journal articles; the Hardgrove Grindability Index manuscript is separately marked **in preparation**.

Two citations differ from the CV's year convention:

- The Parkinson's disease paper appeared online on **28 September 2023**, and in **volume 27, issue 13 (2024), pp. 1858–1874**. The website and BibTeX use 2024 and explicitly note the 2023 online date.
- The cement rotary kiln paper appeared online on **20 October 2022**, and in **volume 41, issue 5 (2023), pp. 715–724**. The website and BibTeX use 2023 and explicitly note the 2022 online date.

Verification sources:

- [Coking coal paper — publisher](https://www.sciencedirect.com/science/article/pii/S2666052022000280), DOI `10.1016/j.jfueco.2022.100078`.
- [Flotation paper — Lancaster University](https://research.lancaster-university.uk/en/publications/catboost-shap-for-modeling-industrial-operational-flotation-varia/), DOI `10.1016/j.mineng.2024.108754`.
- [Travertine paper — publisher](https://www.sciencedirect.com/science/article/pii/S2666828921000250), DOI `10.1016/j.ringps.2021.100034`.
- [Cement rotary kiln paper — publisher](https://www.tandfonline.com/doi/pdf/10.1080/02726351.2022.2135470).
- [Parkinson's disease paper — publisher](https://www.tandfonline.com/doi/abs/10.1080/10255842.2023.2263125).

The source PDF contains personal contact details and referee emails. It is downloadable in full as requested. The webpage highlights Arman's professional email and profile links. No publication PDFs, citation counts, rankings of venues, or claims of clinical deployment are added.
