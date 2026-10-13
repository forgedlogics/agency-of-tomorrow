"""Small local persistence layer for AgencyOS prototype runs."""
from __future__ import annotations
import json
import sqlite3
from datetime import UTC, datetime
from pathlib import Path
DATABASE_PATH = Path(__file__).resolve().parent.parent / "agencyos.db"

def _connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.execute("""CREATE TABLE IF NOT EXISTS campaign_runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, brand TEXT NOT NULL,
        objective TEXT NOT NULL, goal TEXT NOT NULL, package_json TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'awaiting_approval')""")
    return connection

def save_campaign_run(brand: str, objective: str, goal: str, package: dict) -> int:
    with _connection() as connection:
        cursor = connection.execute(
            "INSERT INTO campaign_runs (created_at, brand, objective, goal, package_json) VALUES (?, ?, ?, ?, ?)",
            (datetime.now(UTC).isoformat(), brand, objective, goal, json.dumps(package)),
        )
        return int(cursor.lastrowid)

def recent_campaign_runs(limit: int = 8) -> list[dict]:
    with _connection() as connection:
        rows = connection.execute("SELECT id, created_at, brand, objective, goal, status FROM campaign_runs ORDER BY id DESC LIMIT ?", (limit,)).fetchall()
    return [{"id": r[0], "created_at": r[1], "brand": r[2], "objective": r[3], "goal": r[4], "status": r[5]} for r in rows]
