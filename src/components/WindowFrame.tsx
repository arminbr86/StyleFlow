import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { WinState } from "./Desktop";
import ProjectWindow from "./ProjectWindow";
import NotesWindow from "./NotesWindow";
import PhotosWindow from "./PhotosWindow";
import ClaudeWindow from "./ClaudeWindow";
import FinderWindow from "./FinderWindow";
import TweetWindow from "./TweetWindow";
import SiteWindow from "./SiteWindow";
import ComposeWindow from "./ComposeWindow";
import VideoWindow from "./VideoWindow";
import AddressBar from "./AddressBar";

interface WindowCtx {
  isMobile: boolean;
  openProject: (id: string) => void;
  openLightbox: (src: string) => void;
  closeWindow: (uid: number) => void;
}

interface WindowFrameProps {
  win: WinState;
  isMobile: boolean;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  onClose: (uid: number) => void;
  onFocus: (uid: number) => void;
  onMove: (uid: number, x: number, y: number) => void;
  ctx: WindowCtx;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function WindowTitle({ win }: { win: WinState }) {
  const titleMap: Record<string, string> = {
    notes: "Notes",
    photos: "Photos",
    claude: "Claude",
    site: "Figma",
  };
  if (win.kind === "project") return "Project";
  if (win.kind === "finder") return win.folderName ?? "Finder";
  if (win.kind === "video") return win.title ?? "Video";
  if (win.kind === "tweet") return "Elon Musk (@elonmusk) / X";
  if (win.kind === "compose") return "New Message";
  return titleMap[win.kind] ?? win.kind;
}

export default function WindowFrame({ win, isMobile, sectionRef, onClose, onFocus, onMove, ctx }: WindowFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    startX: 0, startY: 0, originX: 0, originY: 0,
    moved: false, pointerId: -1, dragging: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (el) {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.94, y: 14, filter: "blur(6px)" },
        { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.36, ease: "power3.out" }
      );
    }
  }, []);

  const handleHeaderPointerDown = (e: React.PointerEvent) => {
    if (isMobile || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-traffic-light]")) return;
    const el = ref.current;
    if (el) {
      onFocus(win.uid);
      el.setPointerCapture(e.pointerId);
      dragState.current = {
        startX: e.clientX, startY: e.clientY,
        originX: win.x, originY: win.y,
        moved: false, pointerId: e.pointerId, dragging: true,
      };
    }
  };

  const handleHeaderPointerMove = (e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds.dragging) return;
    const el = ref.current;
    const sec = sectionRef.current;
    if (!el || !sec) return;
    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    if (!ds.moved && Math.hypot(dx, dy) < 3) return;
    ds.moved = true;
    const nx = clamp(ds.originX + dx, -win.w + 80, sec.clientWidth - 80);
    const ny = clamp(ds.originY + dy, 28, sec.clientHeight - 60);
    el.style.left = `${nx}px`;
    el.style.top = `${ny}px`;
  };

  const handleHeaderPointerUp = (e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds.dragging) return;
    const el = ref.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    ds.dragging = false;
    if (ds.moved && el) {
      const x = parseFloat(el.style.left || `${win.x}`);
      const y = parseFloat(el.style.top || `${win.y}`);
      onMove(win.uid, x, y);
    }
  };

  const isDark = win.kind === "video" || win.kind === "tweet";
  const headerBg = win.kind === "compose" ? "bg-white" : undefined;
  const bodyBg = win.kind === "video" || win.kind === "tweet" ? "bg-black" : undefined;

  let content: React.ReactNode = null;
  switch (win.kind) {
    case "project":
      content = <ProjectWindow win={win} ctx={ctx} />;
      break;
    case "notes":
      content = <NotesWindow ctx={ctx} />;
      break;
    case "photos":
      content = <PhotosWindow ctx={ctx} />;
      break;
    case "claude":
      content = <ClaudeWindow ctx={ctx} />;
      break;
    case "finder":
      content = <FinderWindow win={win} ctx={ctx} />;
      break;
    case "video":
      content = <VideoWindow />;
      break;
    case "tweet":
      content = <TweetWindow />;
      break;
    case "site":
      content = <SiteWindow />;
      break;
    case "compose":
      content = <ComposeWindow win={win} ctx={ctx} />;
      break;
  }

  // Compose window has special header (address bar + send button)
  if (win.kind === "compose") {
    return (
      <div
        ref={ref}
        role="dialog"
        aria-label={WindowTitle({ win })}
        onMouseDown={() => onFocus(win.uid)}
        className="pointer-events-auto absolute flex flex-col overflow-hidden rounded-[12px] border border-black/15 bg-[#fbfaf7] text-[#1a1612] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45),0_8px_24px_-8px_rgba(0,0,0,0.35)]"
        style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
      >
        <div
          onPointerDown={handleHeaderPointerDown}
          onPointerMove={handleHeaderPointerMove}
          onPointerUp={handleHeaderPointerUp}
          className={`flex shrink-0 items-center gap-3 border-b border-black/[0.07] px-3 py-2 select-none ${isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing"} ${headerBg ?? "bg-[#ecebe6]"}`}
          style={{ touchAction: "none" }}
        >
          <div data-traffic-light className="flex items-center gap-1.5">
            <button type="button" aria-label="Close window" onClick={() => onClose(win.uid)} className="group/tl flex size-3 items-center justify-center rounded-full bg-[#ff5f57] ring-1 ring-black/10">
              <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover/tl:opacity-100">
                <path d="M1 1 L5 5 M5 1 L1 5" stroke="#5a0900" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </button>
            <span className="size-3 rounded-full bg-[#febc2e] ring-1 ring-black/10" aria-hidden="true" />
            <span className="size-3 rounded-full bg-[#28c840] ring-1 ring-black/10" aria-hidden="true" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <AddressBar url="New Message" />
          </div>
        </div>
        {content}
      </div>
    );
  }

  // Video and tweet windows have dark header
  const isTweetOrVideo = win.kind === "video" || win.kind === "tweet";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={WindowTitle({ win })}
      onMouseDown={() => onFocus(win.uid)}
      className="pointer-events-auto absolute flex flex-col overflow-hidden rounded-[12px] border border-black/15 bg-[#fbfaf7] text-[#1a1612] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45),0_8px_24px_-8px_rgba(0,0,0,0.35)]"
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
    >
      <div
        onPointerDown={handleHeaderPointerDown}
        onPointerMove={handleHeaderPointerMove}
        onPointerUp={handleHeaderPointerUp}
        className={`flex shrink-0 items-center gap-3 border-b border-black/[0.07] px-3 py-2 select-none ${isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing"} ${headerBg ?? (isTweetOrVideo ? "bg-[#1a1a1a]" : "bg-[#ecebe6]")}`}
        style={{ touchAction: "none" }}
      >
        <div data-traffic-light className="flex items-center gap-1.5">
          <button type="button" aria-label="Close window" onClick={() => onClose(win.uid)} className="group/tl flex size-3 items-center justify-center rounded-full bg-[#ff5f57] ring-1 ring-black/10">
            <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover/tl:opacity-100">
              <path d="M1 1 L5 5 M5 1 L1 5" stroke="#5a0900" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </button>
          <span className="size-3 rounded-full bg-[#febc2e] ring-1 ring-black/10" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#28c840] ring-1 ring-black/10" aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <span className={`truncate text-[12px] font-medium ${isTweetOrVideo ? "text-white/80" : "text-black/55"}`}>
            {win.kind === "site" ? <AddressBar url="figma.com/design/D2ePsCUWyaFq2ZRTYHsKzF/Modulify-Showcase" /> :
             win.kind === "tweet" ? <AddressBar url="x.com/elonmusk" /> :
             win.kind === "video" ? <span className="text-white/80">{win.title}</span> :
             <WindowTitle win={win} />}
          </span>
        </div>
        <div className="flex items-center gap-1.5" style={{ width: 54 }} />
      </div>
      <div className={`min-h-0 flex-1 overflow-hidden ${bodyBg ?? ""}`}>
        {content}
      </div>
    </div>
  );
}
