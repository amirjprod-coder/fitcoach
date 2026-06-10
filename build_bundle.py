#!/usr/bin/env python3
"""Inline data.js into index.html -> FitCoach.html (a single shareable file)."""
import re, pathlib
here = pathlib.Path(__file__).parent
html = (here/'index.html').read_text()
data = (here/'data.js').read_text()
html = html.replace('<script src="data.js"></script>', f'<script>\n{data}\n</script>')
# drop the service-worker registration (single file has no sw.js next to it)
html = re.sub(r"/\* SW-START \*/.*?/\* SW-END \*/", '', html, flags=re.S)
(here/'FitCoach.html').write_text(html)
print('Wrote FitCoach.html', len(html), 'bytes')
