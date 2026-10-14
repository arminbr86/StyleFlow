import { dockApps } from "../data/portfolio";

interface MoreMenuProps {
  onClose: () => void;
  onDockClick: (id: string) => void;
}

const moreAppIds = ["claude", "photos", "x", "trash"];

export default function MoreMenu({ onClose, onDockClick }: MoreMenuProps) {
  return (
    <div
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[45] flex items-center justify-center bg-black/35 p-6 backdrop-blur-md"
    >
      <div
        className="w-full max-w-[360px] rounded-[28px] border border-white/[0.22] bg-white/[0.13] p-6 backdrop-blur-2xl backdrop-saturate-150"
        style={{ boxShadow: "0 20px 50px -12px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.18) inset" }}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75">More</p>
        <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-5">
          {moreAppIds.map(id => {
            const app = dockApps.find(a => a.id === id)!;
            const iconMap: Record<string, string> = {
              claude: "/atelier/doc-icons/claude.png",
              photos: "/atelier/doc-icons/photos.png",
              x: "/atelier/doc-icons/x.png",
              trash: "/atelier/doc-icons/Trash.png",
            };
            return (
              <button
                key={id}
                type="button"
                onClick={() => { onDockClick(id); onClose(); }}
                className="flex flex-col items-center gap-2"
              >
                <div className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-y-0.5" style={{ width: 48, height: 48 }}>
                  <img src={iconMap[id]} alt={app.name} draggable={false} className="size-full object-contain" />
                </div>
                <span className="text-[11px] font-medium text-white/90">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
