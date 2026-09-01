#!/usr/bin/env bash
# Convert case-study GIFs to MP4 + WebM at proper 2x (Retina) display size.
#
# GIFs are capped at 256 colors and are enormous; H.264/VP9 video is ~90%
# smaller at higher quality. Each entry is sized to 2x its actual CSS width
# on the page, so nothing is upscaled beyond what the layout needs.
#
# Usage: bash scripts/convert-gifs.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/work"

# "relative/path.gif <target_width_px>"
CONVERSIONS=(
  "capital-one-auto-refinance/hero.gif 1600"
  "capital-one-auto-refinance/prequal-after-mobile.gif 504"
  "capital-one-auto-refinance/prequal-after-desktop.gif 1640"
  "capital-one-auto-refinance/apply-before-offers.gif 440"
  "capital-one-auto-refinance/apply-after-offers.gif 440"
  "capital-one-auto-refinance/finalize-before-finicity.gif 440"
  "capital-one-auto-refinance/finalize-after-finicity.gif 440"
  "capital-one-data/Registration_Assets.gif 2208"
  "capital-one-data/Approve.gif 2208"
  "capital-one-data/Search_3_output.gif 2208"
  "eureka-surveys/howitworks1.gif 440"
  "eureka-surveys/howitworks2.gif 540"
  "eureka-surveys/howitworks3.gif 1100"
  "eureka-surveys/edge1-responsive.gif 1600"
)

total_before=0
total_after=0

for entry in "${CONVERSIONS[@]}"; do
  rel="${entry%% *}"
  target_w="${entry##* }"
  src="$ROOT/$rel"

  if [ ! -f "$src" ]; then
    echo "skip (missing): $rel"
    continue
  fi

  base="${src%.gif}"
  src_w=$(sips -g pixelWidth "$src" 2>/dev/null | awk '/pixelWidth/{print $2}')
  # Never upscale past the source: it only adds bytes, not detail.
  if [ -n "$src_w" ] && [ "$target_w" -gt "$src_w" ]; then
    target_w="$src_w"
  fi
  # H.264 requires even dimensions — round down to the nearest even width.
  target_w=$(( target_w / 2 * 2 ))

  before=$(stat -f%z "$src")

  # H.264 MP4 — universal support, faststart for progressive playback.
  ffmpeg -y -loglevel error -i "$src" \
    -vf "scale=${target_w}:-2:flags=lanczos,pad=ceil(iw/2)*2:ceil(ih/2)*2" \
    -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart -an \
    "${base}.mp4"

  # VP9 WebM — smaller still where supported.
  ffmpeg -y -loglevel error -i "$src" \
    -vf "scale=${target_w}:-2:flags=lanczos,pad=ceil(iw/2)*2:ceil(ih/2)*2" \
    -c:v libvpx-vp9 -crf 36 -b:v 0 -pix_fmt yuv420p -an \
    "${base}.webm"

  after=$(stat -f%z "${base}.mp4")
  total_before=$((total_before + before))
  total_after=$((total_after + after))

  printf "%-52s %6s → %6s (mp4)\n" "$rel" \
    "$(echo "$before" | awk '{printf "%.1fM", $1/1048576}')" \
    "$(echo "$after"  | awk '{printf "%.1fM", $1/1048576}')"
done

echo ""
echo "GIF total:  $(echo $total_before | awk '{printf "%.1f MB", $1/1048576}')"
echo "MP4 total:  $(echo $total_after  | awk '{printf "%.1f MB", $1/1048576}')"
echo "Saved:      $(echo "$total_before $total_after" | awk '{printf "%.1f MB (%.0f%%)", ($1-$2)/1048576, (1-$2/$1)*100}')"
