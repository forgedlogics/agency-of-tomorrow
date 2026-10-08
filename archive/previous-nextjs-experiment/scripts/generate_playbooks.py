"""Generate the campaign playbook data used by Agency of Tomorrow."""

import json
from pathlib import Path

PLAYBOOKS = {
    "launch": {
        "label": "Collection launch",
        "default_brief": "Launch a new jewelry collection with a distinctive material story.",
        "default_objective": "Build qualified interest",
        "kpi": "Waitlist or email capture rate",
        "risk": "Do not let product-detail content overpower the collection idea.",
        "media": "Pair short-form discovery with an owned email capture moment.",
    },
    "rebrand": {
        "label": "Brand refresh",
        "default_brief": "Introduce a new brand point of view without losing existing customers.",
        "default_objective": "Drive product discovery",
        "kpi": "Returning-visitor engagement",
        "risk": "Avoid changing every brand cue at once; retain one familiar anchor.",
        "media": "Use founder-led storytelling to explain the change before paid amplification.",
    },
    "retention": {
        "label": "Customer retention",
        "default_brief": "Bring previous customers back with a useful, timely reason to re-engage.",
        "default_objective": "Convert returning visitors",
        "kpi": "Repeat purchase or reactivation rate",
        "risk": "Do not use a discount as the only reason to return.",
        "media": "Start with segmented email and retargeting based on prior product interest.",
    },
}

output = Path(__file__).parents[1] / "public" / "data" / "agency-playbooks.json"
output.write_text(json.dumps(PLAYBOOKS, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {output}")
