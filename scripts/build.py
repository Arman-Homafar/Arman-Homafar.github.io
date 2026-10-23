"""Generate the static page and bibliography. Python standard library only."""
from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parent.parent
publications = json.loads((ROOT / 'publications.json').read_text())

def bibtex(p):
    fields = {
        'author': p['bibAuthors'], 'title': '{' + p['title'] + '}',
        'journal': p['journal'], 'year': str(p['year']), 'volume': p['volume'],
    }
    if p.get('issue'):
        fields['number'] = p['issue']
    fields['pages'] = p['pages'].replace('–', '--')
    fields['doi'] = p['doi']
    fields['url'] = 'https://doi.org/' + p['doi']
    if p['note']:
        fields['note'] = p['note']
    return '@article{' + p['id'] + ',\n' + ',\n'.join(f'  {k} = {{{v}}}' for k, v in fields.items()) + '\n}'

items = []
for p in publications:
    authors = ', '.join('<strong>A. Homafar</strong>' if a == 'A. Homafar' else escape(a) for a in p['authors'])
    volume = p['volume'] + ('(' + p['issue'] + ')' if p.get('issue') else '')
    note = f'<p class="publication-note">{escape(p["note"])}</p>' if p['note'] else ''
    label = 'Health & medicine' if p['category'] == 'health' else 'Engineering'
    items.append(f'''
    <article class="publication" data-category="{p['category']}">
      <div class="publication-year">{p['year']}</div>
      <div class="publication-body">
        <p class="publication-category">{label}</p>
        <h3><a href="https://doi.org/{p['doi']}">{escape(p['title'])}</a></h3>
        <p class="authors">{authors}</p>
        <p class="journal"><em>{escape(p['journal'])}</em>, {volume}, {p['pages']}.</p>
        {note}
        <p class="publication-summary">{escape(p['summary'])}</p>
        <div class="publication-actions">
          <a class="text-link" href="https://doi.org/{p['doi']}" aria-label="Read {escape(p['title'], quote=True)}">Read paper <span aria-hidden="true">↗</span></a>
          <details class="citation">
            <summary>BibTeX <span aria-hidden="true">+</span></summary>
            <div class="citation-content"><pre id="bib-{p['id']}">{escape(bibtex(p))}</pre><button class="copy-citation" type="button" data-copy="bib-{p['id']}" hidden>Copy citation</button></div>
          </details>
        </div>
      </div>
    </article>''')

template = (ROOT / 'template.html').read_text()
assert template.count('<!-- PUBLICATIONS -->') == 1
(ROOT / 'index.html').write_text(template.replace('<!-- PUBLICATIONS -->', '\n'.join(items)))
(ROOT / 'assets' / 'publications.bib').write_text('\n\n'.join(bibtex(p) for p in publications) + '\n')
print(f'Built index.html and bibliography with {len(publications)} publications.')
