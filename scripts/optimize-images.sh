#!/usr/bin/env bash
# Resize oversized PNGs to 2x their real display width and emit WebP.
#
# Several source images were 4,000–11,000px wide for slots that render at
# 700–1,300 CSS px. That ships megabytes of detail no screen can show.
# Targets below are 2x the measured CSS width (Retina), capped at the source.
#
# Originals are preserved as *.orig.png so this is reversible.
# Usage: bash scripts/optimize-images.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/work"

# "relative/path.png <target_width_px>"
TARGETS=(
  "eureka-surveys/eurekazoom.png 2400"
  "eureka-surveys/hero.png 2600"
  "capital-one-auto-refinance/finicitywireflow.png 2600"
  "capital-one-auto-refinance/prequal-before-breakdown.png 2200"
  "capital-one-data/research-notes.png 1800"
  "capital-one-data/hero.png 2600"
  "intuit/hero.png 2600"
  "archive/pnc-1.png 2200"
)

before_total=0
after_total=0

for entry in "${TARGETS[@]}"; do
  rel="${entry%% *}"
  target_w="${entry##* }"
  src="$ROOT/$rel"
  [ -f "$src" ] || { echo "skip (missing): $rel"; continue; }

  orig="${src%.png}.orig.png"
  # Keep a pristine copy the first time only, so re-runs stay lossless-source.
  [ -f "$orig" ] || cp "$src" "$orig"

  src_w=$(sips -g pixelWidth "$orig" 2>/dev/null | awk '/pixelWidth/{print $2}')
  [ -n "$src_w" ] && [ "$target_w" -gt "$src_w" ] && target_w="$src_w"

  before=$(stat -f%z "$src")

  # Resize from the pristine original, then compress.
  ffmpeg -y -loglevel error -i "$orig" \
    -vf "scale=${target_w}:-1:flags=lanczos" \
    -compression_level 100 "$src"

  # WebP sibling via macOS sips (this ffmpeg build has no webp encoder).
  # Non-fatal: the resized PNG alone already delivers most of the win.
  sips -s format webp -s formatOptions 80 "$src" \
    --out "${src%.png}.webp" >/dev/null 2>&1 || true

  after=$(stat -f%z "$src")
  before_total=$((before_total + before))
  after_total=$((after_total + after))

  printf "%-56s %7s → %7s\n" "$rel" \
    "$(echo $before | awk '{printf "%.1fMB", $1/1048576}')" \
    "$(echo $after  | awk '{printf "%.1fMB", $1/1048576}')"
done

echo ""
echo "Before: $(echo $before_total | awk '{printf "%.1f MB", $1/1048576}')"
echo "After:  $(echo $after_total  | awk '{printf "%.1f MB", $1/1048576}')"
