"""Private visual-generation API for the public AgencyOS homepage.

Run locally: uvicorn api_server:app --host 0.0.0.0 --port 8000
Set GEMINI_API_KEY only in the server environment.
"""

import base64
import os
import time
from pathlib import Path
from collections import defaultdict

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel, Field


DEFAULT_ORIGINS = "https://forgedlogics.github.io,http://localhost:4177,http://127.0.0.1:4177"
allowed_origins = [item.strip() for item in os.getenv("AGENCYOS_ALLOWED_ORIGINS", DEFAULT_ORIGINS).split(",")]

app = FastAPI(title="AgencyOS API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

# A small guard for a personal/demo deployment. Use an API gateway or durable
# rate limiter before exposing a paid production endpoint to a large audience.
recent_requests: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 3
RATE_WINDOW_SECONDS = 600


class VisualBrief(BaseModel):
    brand: str = Field(min_length=1, max_length=100)
    offer: str = Field(min_length=1, max_length=160)
    goal: str = Field(min_length=1, max_length=500)
    audience: str = Field(min_length=1, max_length=300)
    signal: str = Field(min_length=1, max_length=500)


def visual_prompt(brief: VisualBrief) -> str:
    return f"""Use case: ads-marketing
Asset type: a luxury visual campaign concept for {brief.brand}
Primary request: create an original premium editorial campaign image for the offer \"{brief.offer}\".
Business goal: {brief.goal}
Audience: {brief.audience}
Creative signal: {brief.signal}
Style/medium: high-fashion art direction, photorealistic campaign photography, museum catalogue quality.
Scene/backdrop: deep black studio or architectural space with sculptural material and generous negative space.
Lighting/mood: cinematic, restrained, exclusive, precise.
Color palette: black, ivory-white highlights, antique-gold accents only.
Composition/framing: vertical editorial image with room for an art director to place campaign type.
Constraints: no written words, no logos, no watermark, no UI, no collage, no generic stock-photo appearance.
"""


def check_rate_limit(request: Request) -> None:
    address = request.client.host if request.client else "unknown"
    now = time.time()
    history = [timestamp for timestamp in recent_requests[address] if now - timestamp < RATE_WINDOW_SECONDS]
    if len(history) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Generation limit reached. Please try again in 10 minutes.")
    history.append(now)
    recent_requests[address] = history


@app.get("/health")
def health() -> dict[str, bool]:
    return {
        "ready": True,
        "planning_ready": bool(os.getenv("OPENAI_API_KEY")),
        "visual_ready": bool(os.getenv("GEMINI_API_KEY")),
    }


@app.post("/generate-visual")
def generate_visual(brief: VisualBrief, request: Request) -> dict[str, str]:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="The visual engine has not been configured with an API key.")

    check_rate_limit(request)
    prompt = visual_prompt(brief)
    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model=os.getenv("GEMINI_IMAGE_MODEL", "gemini-3.1-flash-image"),
            contents=[prompt],
        )
        image_part = next(
            (
                part.inline_data
                for part in (response.parts or [])
                if getattr(part, "inline_data", None)
                and getattr(part.inline_data, "data", None)
            ),
            None,
        )
        if not image_part:
            raise RuntimeError("The image API returned no image data.")
        encoded = base64.b64encode(image_part.data).decode("ascii")
        mime_type = image_part.mime_type or "image/png"
        # The browser receives this one generated image directly; the server
        # does not persist visitors' campaign concepts.
        return {"image_data_url": f"data:{mime_type};base64,{encoded}", "prompt": prompt}
    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(status_code=502, detail="AgencyOS could not generate a visual concept. Please try again.") from error


class PlanningBrief(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    brand: str = Field(min_length=1, max_length=100)
    offer: str = Field(min_length=1, max_length=160)
    audience: str = Field(min_length=1, max_length=300)
    goal: str = Field(min_length=1, max_length=500)
    channel: str = Field(min_length=1, max_length=100)
    rules: str = Field(default="", max_length=2000)


@app.post("/plan-campaign")
def plan_campaign(brief: PlanningBrief, request: Request) -> dict:
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=503, detail="The AI planner is not configured. Starter templates are available without a server.")
    check_rate_limit(request)
    from agencyos.brain import build_campaign_package
    from agencyos.models import CampaignBrief
    try:
        package = build_campaign_package(
            CampaignBrief(brand=brief.brand, goal=brief.goal, objective="Create a marketing campaign"),
            {"audience": brief.audience, "offer": brief.offer, "rules": brief.rules,
             "preferred_channel": brief.channel, "campaign_name": brief.name},
        )
        items = package.get("content_plan") if isinstance(package, dict) else None
        if not isinstance(items, list) or not items or any(
            not isinstance(item, dict) or any(
                not isinstance(item.get(key), str) or not item[key].strip()
                for key in ("channel", "hook", "draft")
            )
            for item in items
        ):
            raise ValueError("Incomplete campaign package")
        return package
    except Exception as error:
        provider_status = getattr(error, "status_code", None)
        if provider_status == 401:
            detail = "The planning service API key was rejected. The app owner needs to update OPENAI_API_KEY in Render."
        elif provider_status == 429:
            detail = "The AI provider reports a quota or rate limit. The app owner should check API billing and usage limits before retrying."
        elif provider_status in (400, 403, 404):
            detail = "The configured AI model is unavailable for this API project. The app owner should check model access and AGENCYOS_MODEL in Render."
        else:
            detail = "The AI planner could not create a complete campaign. Please try again."
        # Record only exception classification, never credentials, briefs, or response bodies.
        import logging
        logging.getLogger(__name__).warning("Planning failed: type=%s provider_status=%s", type(error).__name__, provider_status)
        raise HTTPException(status_code=502, detail=detail) from error


# Serve only the public app assets, never the repository or its databases.
PUBLIC_ROOT = Path(__file__).resolve().parent
PUBLIC_ASSETS = {"index.html", "workspace.html", "workspace.js", "workspace.css", "luxury.js"}


@app.get("/")
def workspace() -> FileResponse:
    return FileResponse(PUBLIC_ROOT / "workspace.html")


@app.get("/agencyos-config.js")
def public_configuration() -> Response:
    return Response('window.AGENCYOS_API_URL = "";', media_type="application/javascript", headers={"Cache-Control": "no-store"})


@app.get("/{asset}")
def public_asset(asset: str) -> FileResponse:
    if asset not in PUBLIC_ASSETS:
        raise HTTPException(status_code=404, detail="Not found")
    return FileResponse(PUBLIC_ROOT / asset)
