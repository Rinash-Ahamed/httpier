export function AmbientBackground({
  className = "",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-mesh" />
      {animated && (
        <>
          <div className="hero-gradient-orb hero-gradient-orb-blue" />
          <div className="hero-gradient-orb hero-gradient-orb-cyan" />
          <div className="hero-gradient-orb hero-gradient-orb-violet" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.72)_38%,rgba(255,255,255,0.15)_72%,transparent_100%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_34%,rgba(255,255,255,0.08)_58%,transparent_78%)]" />
        </>
      )}
      <div className="absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_75%)]" />
    </div>
  );
}
