import { finderFavorites } from "../data/portfolio";
import type { WinState } from "./Desktop";
import { ChevronLeft, ChevronRight, Search, GridView, ListView, ColumnView, GalleryView, FolderIcon } from "./icons";

interface FinderWindowProps {
  win: WinState;
  ctx: { isMobile: boolean };
}

function ViewButton({ label, active, children }: { label: string; active?: boolean; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} className={`rounded p-1 transition-colors ${active ? "bg-black/10 text-black/80" : "text-black/40 hover:bg-black/5"}`}>
      {children}
    </button>
  );
}

export default function FinderWindow({ win, ctx }: FinderWindowProps) {
  const folderName = win.folderName ?? "Folder";
  const videoFile = folderName === "Trash" ? "I hope my mom doesn't see this.mov" : "Dont play this video.mov";

  return (
    <div className="flex h-full flex-col bg-[#f7f5ef]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#ecebe6] px-3 py-1.5">
        <div className="flex items-center text-black/35">
          <button type="button" aria-label="Back" className="rounded-md p-1 transition-colors hover:bg-black/5">
            <ChevronLeft className="size-3.5" />
          </button>
          <button type="button" aria-label="Forward" className="rounded-md p-1 transition-colors hover:bg-black/5">
            <ChevronRight className="size-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1a1612]">
          <FolderIcon className="size-4 text-[#4aa3f0]" />
          {folderName}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-0.5 rounded-md border border-black/10 bg-white/70 p-0.5">
          <ViewButton label="Icon view" active><GridView className="size-3.5" /></ViewButton>
          <ViewButton label="List view"><ListView className="size-3.5" /></ViewButton>
          <ViewButton label="Column view"><ColumnView className="size-3.5" /></ViewButton>
          <ViewButton label="Gallery view"><GalleryView className="size-3.5" /></ViewButton>
        </div>
        <button type="button" aria-label="Search" className="rounded-md p-1 text-black/40 transition-colors hover:bg-black/5">
          <Search className="size-3.5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <div className="hidden w-40 shrink-0 overflow-y-auto bg-[#ecebe6] px-2 py-2 sm:block">
          <p className="px-1.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/45">iCloud</p>
          {["Recents", "Shared"].map(label => (
            <div key={label} className="flex items-center gap-2 rounded-[6px] px-1.5 py-1 transition-colors hover:bg-black/[0.06]">
              <span className="size-3 rounded-[3px]" style={{ background: "#7c8595" }} />
              <span className="truncate text-[12px] text-[#1a1612]">{label}</span>
            </div>
          ))}
          <p className="mt-2 px-1.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/45">Favorites</p>
          {finderFavorites.map(fav => (
            <div key={fav.label} className="flex items-center gap-2 rounded-[6px] px-1.5 py-1 transition-colors hover:bg-black/[0.06]">
              <span className="size-3 rounded-[3px]" style={{ background: fav.color }} />
              <span className="truncate text-[12px] text-[#1a1612]">{fav.label}</span>
            </div>
          ))}
        </div>

        {/* File area */}
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-[#1a1612]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-12 text-black/30">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m10 10 5 5" />
                <path d="M15 10v5h-5" />
              </svg>
            </div>
            <p className="text-[13px] font-medium text-black/60">{videoFile}</p>
            <p className="text-[11px] text-black/35">Double-click to play</p>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-black/[0.06] bg-[#ecebe6] px-3 py-1 text-[11px] text-black/45">
        <span>1 item</span>
        <span>0 KB</span>
      </div>
    </div>
  );
}
