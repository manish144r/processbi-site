# Previous-client logos — drop files here

The "Trusted by leading Australian organisations" strip on the Process BI site
(`index.html`, `<section id="clients">`) loads logo images from this folder.

Each tile shows the logo image when its file exists; until then it falls back to
the client name as text, so the site looks fine even before logos are added.

## Files needed (exact names — referenced by `index.html`)

| Client                       | Expected file                                   |
|------------------------------|-------------------------------------------------|
| Essential Energy             | `essential-energy.svg`                          |
| Sydney Trains                | `sydney-trains.svg`                             |
| Dulux Group                  | `dulux-group.svg`                               |
| SES NSW                      | `ses-nsw.svg`                                   |
| Department of Education NSW  | `department-of-education-nsw.svg`               |
| Link Group                   | `link-group.svg`                                |
| Colcap Financial             | `colcap-financial.svg`                          |
| Synergy Process Systems      | `synergy-process-systems.svg`                   |
| Materialised                 | `materialised.svg`                              |

## Notes
- **SVG preferred** (sharpest). PNG/WebP also work — if you use a different
  extension, update the matching `<img src="...">` in `index.html`.
- Logos render as **uniform white silhouettes at ~50% opacity** (CSS
  `filter: grayscale brightness(0) invert(1)`) so mixed-colour brand marks look
  consistent on the dark background; the original colour shows on hover.
  Remove `.client-logo { filter: ... }` in the stylesheet if you'd rather show
  full-colour logos.
- Target height is ~40px; wide logos cap at 160px.
- **Permission:** use only logos you're cleared to display as past clients.
