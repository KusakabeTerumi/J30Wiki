"""ビルド済みHTMLの内部リンク・アンカー・CSS/JS/画像参照を検査。標準Pythonのみ。"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
import json, sys

root = Path(__file__).resolve().parent.parent / 'dist'
base = sys.argv[1] if len(sys.argv) > 1 else '/'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.ids=set(); self.headings=[]
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        if 'id' in d: self.ids.add(d['id'])
        if tag in ('a','link') and d.get('href'): self.links.append(d['href'])
        if tag in ('script','img') and d.get('src'): self.links.append(d['src'])
        if tag in ('h1','h2','h3','h4','h5','h6'): self.headings.append(tag)
pages={}
for f in root.rglob('*.html'):
    page=Page(); page.feed(f.read_text(encoding='utf-8')); pages[f.relative_to(root).as_posix()]=page
errors=[]; count=0; external=set()
for rel,page in pages.items():
    url='https://local.test'+base+(rel[:-10] if rel.endswith('index.html') else rel)
    for link in page.links:
        u=urlsplit(urljoin(url,link))
        if u.scheme not in ('http','https'): continue
        if u.netloc!='local.test': external.add(u.geturl()); continue
        if not u.path.startswith(base): errors.append([rel,'base escape',link]); continue
        target=unquote(u.path[len(base):])
        if target.endswith('/') or target=='': target+='index.html'
        if not (root/target).is_file(): errors.append([rel,'missing',link]); continue
        if u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:
            errors.append([rel,'missing anchor',link])
        count+=1
report={'base':base,'html_files':len(pages),'references':count,'errors':errors,'external_links':sorted(external),'h1_counts':{f:p.headings.count('h1') for f,p in pages.items()}}
qa=root.parent/'qa'; qa.mkdir(exist_ok=True)
(qa/('links-subpath.json' if base!='/' else 'links-root.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
assert pages and not errors
