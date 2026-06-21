"""
add_figma_mcp.py — Programmatically adds Figma MCP to Claude Desktop config.
Run once: python add_figma_mcp.py
Then restart Claude Desktop and complete OAuth via Settings → Connectors.
"""

import json
import os
import shutil
from pathlib import Path
from datetime import datetime

CONFIG_PATH = Path(os.environ["APPDATA"]) / "Claude" / "claude_desktop_config.json"
BACKUP_PATH = CONFIG_PATH.with_suffix(f".backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")

FIGMA_MCP_ENTRY = {
    "url": "https://mcp.figma.com/mcp"
}

def main():
    if not CONFIG_PATH.exists():
        print(f"[ERROR] Config not found at {CONFIG_PATH}")
        return

    # Backup first
    shutil.copy2(CONFIG_PATH, BACKUP_PATH)
    print(f"[OK] Backup saved → {BACKUP_PATH}")

    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        config = json.load(f)

    # Ensure mcpServers key exists
    if "mcpServers" not in config:
        config["mcpServers"] = {}

    if "figma" in config["mcpServers"]:
        print(f"[SKIP] figma entry already exists: {config['mcpServers']['figma']}")
        return

    config["mcpServers"]["figma"] = FIGMA_MCP_ENTRY

    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2)

    print(f"[OK] Added Figma MCP to {CONFIG_PATH}")
    print(f"     Entry: figma → {FIGMA_MCP_ENTRY}")
    print()
    print("Next: Restart Claude Desktop, then Settings → Connectors → figma → complete OAuth popup.")

if __name__ == "__main__":
    main()
