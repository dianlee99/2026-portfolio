/**
 * Looping, muted, autoplaying video used in place of heavy GIFs.
 *
 * GIFs are capped at 256 colors and were costing 5–12 MB each; the same
 * clips as H.264/VP9 are ~90% smaller at higher resolution. Pass the GIF
 * path and this resolves the sibling .webm / .mp4 files.
 *
 * `playsInline` keeps iOS from taking the video fullscreen; `muted` +
 * `autoPlay` is what browsers require to allow unattended playback.
 * Respecting reduced-motion is handled in CSS (see globals.css).
 */
export function AutoVideo({
  src,
  alt,
  className = "",
  poster,
  style,
}: {
  /** Path to the original .gif — .mp4/.webm siblings are used automatically. */
  src: string;
  /** Describes the clip for assistive tech, like an image's alt text. */
  alt: string;
  className?: string;
  poster?: string;
  style?: React.CSSProperties;
}) {
  const base = src.replace(/\.gif$/, "");

  return (
    <video
      className={className}
      style={style}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      aria-label={alt}
      role="img"
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
      {/*
        Deliberately NO <img> fallback here. Browsers eagerly fetch a fallback
        <img> inside <video> even when the video plays fine — which would ship
        the multi-MB GIF alongside the video and defeat the whole optimization.
        MP4/H.264 is supported everywhere we care about.
      */}
    </video>
  );
}
