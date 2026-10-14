interface CenterHeroProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
}

export default function CenterHero({ heroRef, imgRef }: CenterHeroProps) {
  return (
    <div
      ref={heroRef}
      className="absolute left-1/2 top-1/2 z-40 size-[180px] overflow-hidden rounded-[28px] border border-white/15 opacity-0"
      style={{
        boxShadow: "0 40px 90px -12px rgba(0,0,0,0.7), 0 0 0 4px rgba(255,255,255,0.06)",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img
        ref={imgRef}
        src="/atelier/projects/noir-leather.jpg"
        alt=""
        draggable={false}
        className="size-full object-cover"
      />
    </div>
  );
}
