import { dockApps } from "../data/portfolio";
import type { DockApp } from "../data/portfolio";

interface DockProps {
  dockRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  onDockClick: (id: string) => void;
  onMoreClick: () => void;
}

const dockShadow = "0 20px 50px -12px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.18) inset";

function DockIcon({ app }: { app: DockApp }) {
  const iconMap: Record<string, string> = {
    figma: "/atelier/doc-icons/figma.png",
    claude: "/atelier/doc-icons/claude.png",
    notes: "/atelier/doc-icons/Notes.png",
    photos: "/atelier/doc-icons/photos.png",
    x: "/atelier/doc-icons/x.png",
    mail: "/atelier/doc-icons/mail.png",
    trash: "/atelier/doc-icons/Trash.png",
  };
  return (
    <img src={iconMap[app.id]} alt={app.name} draggable={false} className="size-full object-contain" />
  );
}

export default function Dock({ dockRef, isMobile, onDockClick, onMoreClick }: DockProps) {
  const primaryApps = ["figma", "notes", "mail"];
  const moreApps = ["claude", "photos", "x", "trash"];

  if (isMobile) {
    return (
      <div ref={dockRef} className="absolute inset-x-0 bottom-4 z-30 px-4 opacity-0">
        <div className="flex w-full items-end justify-evenly rounded-[26px] border border-white/25 bg-white/[0.14] px-3 pb-3 pt-3 backdrop-blur-2xl backdrop-saturate-150" style={{ boxShadow: dockShadow }}>
          {primaryApps.map(id => {
            const app = dockApps.find(a => a.id === id)!;
            return (
              <div key={id} className="group relative flex items-end">
                <span className="pointer-events-none absolute -top-[44px] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[6px] border border-white/20 bg-black/75 px-2.5 py-[5px] text-[12px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100" style={{ boxShadow: "0 8px 18px -6px rgba(0,0,0,0.6)" }}>
                  {app.name}
                  <span className="absolute left-1/2 top-full size-0 -translate-x-1/2" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(0,0,0,0.75)" }} />
                </span>
                <button type="button" aria-label={app.name} onClick={() => onDockClick(id)} className="block">
                  <div className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]" style={{ width: 56, height: 56 }}>
                    <DockIcon app={app} />
                  </div>
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={onMoreClick}
            aria-label="More apps"
            className="flex size-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-6">
              <circle cx="5" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="19" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={dockRef} className="absolute inset-x-0 bottom-4 z-30 flex justify-center opacity-0">
      <div className="flex items-end gap-1.5 rounded-[26px] border border-white/25 bg-white/[0.14] px-3 pb-3 pt-3 backdrop-blur-2xl backdrop-saturate-150" style={{ height: 80, boxShadow: dockShadow }}>
        {dockApps.map(app => (
          <div key={app.id} className="contents">
            {(app.id === "x" || app.id === "trash") && (
              <span className="mx-0.5 my-2 w-px self-stretch bg-white/[0.22]" aria-hidden="true" />
            )}
            <div className="group relative flex items-end">
              <span className="pointer-events-none absolute -top-[44px] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[6px] border border-white/20 bg-black/75 px-2.5 py-[5px] text-[12px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100" style={{ boxShadow: "0 8px 18px -6px rgba(0,0,0,0.6)" }}>
                {app.name}
                <span className="absolute left-1/2 top-full size-0 -translate-x-1/2" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(0,0,0,0.75)" }} />
              </span>
              <button type="button" aria-label={app.name} onClick={() => onDockClick(app.id)} className="block transition-transform duration-150 ease-out hover:-translate-y-1">
                <div className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]" style={{ width: 56, height: 56 }}>
                  <DockIcon app={app} />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
