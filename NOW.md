# Updating the “Now” page

This file is the update sheet for the **Now** tab in `index.html`. Keep this file current whenever the page changes so future updates are quick and consistent.

## Currently developing

The model cards appear at the top of the Now tab.

| Model | GitHub | Logo |
| --- | --- | --- |
| C2070 | https://github.com/DeltaE/C2070 | `resources/logos/c2070.png` |
| RESource | https://github.com/DeltaE/RESource | `resources/logos/resource.png` |
| BCCM | https://github.com/DeltaE/BC_Combined_Modelling | `resources/logos/bccombined.png` |
| BCPyPSA | https://github.com/DeltaE/PyPSA_BC | `resources/logos/pypsabc.png` |

To add or remove a model, update both this table and the `<div class="now-model-grid">` block inside the `#now` section of `index.html`.

## Featured paper

```markdown
Journal: Energy 360
Access: Open access article
Journal image: resources/logos/energy360.jpg
Title: Mapping feasible renewable transition space: Land-use, conservation, and grid-access constraints on wind and solar in British Columbia
Link: https://doi.org/10.1016/j.energ.2026.100077
Simple summary:
1. This study maps where new wind and solar projects could realistically go in British Columbia.
2. It removes places that are protected, environmentally sensitive, or unsuitable for development.
3. It also checks whether promising locations are close enough to the electricity grid.
4. The results show how land choices can change the amount of renewable energy available.
5. The maps can help planners compare practical pathways toward a cleaner electricity system.
```

## News and life updates

Add the newest update above the older cards inside `<div class="now-feed">`.

Use this information for each entry:

```markdown
Date:
Category:
Short label:
Title:
Summary:
Topics:
Link text:
Link:
Image:
Image alt text:
```

### Current entry

```markdown
Date: July 24, 2024
Category: Research life
Short label: Featured by Simon Fraser University
Title: Modelling a more renewable and adaptable energy future
Summary: SFU’s Faculty of Graduate Studies profiled my path from power-utility planning into Sustainable Energy Engineering research. The conversation explores renewable-resource planning, open-source modelling, the value of research collaboration and the people who have supported my graduate journey.
Topics: Energy modelling; Renewable resources; Open source
Link text: Read the full SFU profile
Link: https://www.sfu.ca/gradstudies/life-community/people-research/profiles/fas/2024/md-eliasinul-islam.html
Image: resources/sfu-profile.png
Image alt text: Muhammad Eliasinul Islam at Simon Fraser University
```

## Publishing an update

1. Place new images inside `resources/`.
2. Update this Markdown file.
3. Add the matching card to the Now section in `index.html`.
4. Run `build.cmd`.
5. Commit and push the root website files to GitHub.

You can also give this Markdown file to Codex with your new entry filled in and ask: “Update the Now tab from `NOW.md`.”
