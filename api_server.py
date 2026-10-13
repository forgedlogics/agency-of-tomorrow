"""Private visual-generation API for the public AgencyOS homepage.

Run locally: uvicorn api_server:app --host 0.0.0.0 --port 8000
Set OPENAI_API_KEY only in the server environment.
"""

import base64
import os
import time
from collections import defaultdict

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from openai import OpenAI

DEFAULT_ORIGINS = "https://forgedlogics.github.io,http://localhost:4177,http://127.0.0.1:4177"
allowed_origins = [item.strip() for item in os.getenv("AGENCYOS_ALLOWED_ORIGINS", DEFAULT_ORIGINS).split(",")]

app = FastAPI(title="AgencyOS Visual Engine")
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
        raise HTTPException(status_code=429, detail="Visual generation limit reached. Please try again shortly.")
    history.append(now)
    recent_requests[address] = history


@app.get("/health")
def health() -> dict[str, bool]:
    return {"ready": bool(os.getenv("OPENAI_API_KEY"))}


@app.post("/generate-visual")
def generate_visual(brief: VisualBrief, request: Request) -> dict[str, str]:
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=503, detail="The visual engine has not been configured with an API key.")

    check_rate_limit(request)
    prompt = visual_prompt(brief)
    try:
        response = OpenAI().images.generate(
            model=os.getenv("OPENAI_IMAGE_MODEL", "gpt-image-1"),
            prompt=prompt,
            size="1024x1536",
            quality="medium",
            output_format="png",
        )
        encoded = response.data[0].b64_json
        if not encoded:
            raise RuntimeError("The image API returned no image data.")
        # The browser receives this one generated image directly; the server
        # does not persist visitors' campaign concepts.
        return {"image_data_url": f"data:image/png;base64,{encoded}", "prompt": prompt}
    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(status_code=502, detail="AgencyOS could not generate a visual concept. Please try again.") from error
