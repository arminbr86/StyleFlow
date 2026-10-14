import { projects } from "../data/portfolio";
import type { WinState } from "./Desktop";

interface ProjectWindowProps {
  win: WinState;
  ctx: {
    isMobile: boolean;
    openProject: (id: string) => void;
    openLightbox: (src: string) => void;
    closeWindow: (uid: number) => void;
  };
}

function BriefCard({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40">{label}</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-black/70">{body}</p>
    </div>
  );
}

export default function ProjectWindow({ win, ctx }: ProjectWindowProps) {
  const project = projects.find(p => p.id === win.projectId);
  if (!project) return null;

  return (
    <div className="win-scroll h-full overflow-y-auto overflow-x-hidden px-5 py-6 sm:px-9 sm:py-8">
      {/* Header */}
      <div className="grid grid-cols-12 gap-5 border-b border-black/[0.08] pb-6">
        <div className="col-span-12 md:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">01 — Project</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/45">{project.category}</p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2 className="text-[32px] font-semibold leading-[1.02] tracking-[-0.025em] text-[#1a1612] sm:text-[42px]">{project.title}</h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-snug text-black/65">{project.positioning}</p>
        </div>
      </div>

      {/* Overview + Brief */}
      <div className="grid grid-cols-12 gap-5 border-b border-black/[0.08] py-7 sm:gap-8">
        <div className="col-span-12 md:col-span-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">Overview</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-black/80">{project.description}</p>
        </div>
        <div className="col-span-12 md:col-span-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">Brief</p>
          <div className="mt-2 grid gap-5 sm:grid-cols-3">
            <BriefCard label="Challenge" body={project.brief.challenge} />
            <BriefCard label="Direction" body={project.brief.direction} />
            <BriefCard label="Outcome" body={project.brief.outcome} />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="py-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">Gallery</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {project.gallerySrcs.slice(0, 9).map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => ctx.openLightbox(src)}
              className="group aspect-square overflow-hidden rounded-[6px] bg-black/5"
            >
              <img
                src={src}
                alt={`${project.title} gallery image ${i + 1}`}
                draggable={false}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
