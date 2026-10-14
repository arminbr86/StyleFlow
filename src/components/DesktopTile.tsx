import { useRef, useCallback } from "react";
import type { allTiles } from "../data/portfolio";

type Tile = (typeof allTiles)[0];

export function TileContent({ tile, size }: { tile: Tile; size: number }) {
  if (tile.isFolder) {
    return (
      <>
        <div
          className="relative overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(255,255,255,0.04)] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.6)]"
          style={{ width: size, height: size }}
        >
          <img src={tile.thumbnailSrc} alt={tile.title} draggable={false} className="size-full object-cover" />
        </div>
        <div
          className="mt-2 max-w-[110px] truncate rounded-[5px] px-1.5 py-[1px] text-center text-[11px] font-medium leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-white"
        >
          {tile.title}
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="relative overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(255,255,255,0.04)] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.6)] transition-[box-shadow,transform] duration-150 ease-out"
        style={{ width: size, height: size }}
      >
        <img src={tile.thumbnailSrc} alt={tile.title} draggable={false} className="size-full object-cover" />
      </div>
      <div
        className="mt-2 max-w-[110px] truncate rounded-[5px] px-1.5 py-[1px] text-center text-[11px] font-medium leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-white"
      >
        {tile.title}
      </div>
    </>
  );
}

interface DesktopTileProps {
  tile: Tile;
  index: number;
  position?: { x: number; y: number; z: number };
  sectionRef: React.RefObject<HTMLDivElement | null>;
  tileRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  onClick: () => void;
  onMove: (id: string, x: number, y: number) => void;
}

export default function DesktopTile({
  tile,
  index,
  position,
  sectionRef,
  tileRefs,
  onClick,
  onMove,
}: DesktopTileProps) {
  const dragState = useRef({
    startX: 0, startY: 0, originX: 0, originY: 0,
    moved: false, pointerId: -1, dragging: false,
  });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const el = e.currentTarget as HTMLDivElement;
    el.setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX, startY: e.clientY,
      originX: position?.x ?? 0, originY: position?.y ?? 0,
      moved: false, pointerId: e.pointerId, dragging: true,
    };
  }, [position]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds.dragging) return;
    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    if (!ds.moved && Math.hypot(dx, dy) < 3) return;
    ds.moved = true;
    const el = sectionRef.current;
    const w = el?.clientWidth ?? window.innerWidth;
    const h = el?.clientHeight ?? window.innerHeight;
    const nx = Math.min(Math.max(ds.originX + dx, -80 + 80), w - 80);
    const ny = Math.min(Math.max(ds.originY + dy, 8), h - 236);
    onMove(tile.id, nx, ny);
  }, [sectionRef, onMove, tile.id]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds.dragging) return;
    const el = e.currentTarget as HTMLDivElement;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    ds.dragging = false;
    if (!ds.moved) {
      onClick();
    }
  }, [onClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  if (!position) return null;

  return (
    <div
      data-atelier-tile="true"
      data-tile-id={tile.id}
      role="button"
      tabIndex={0}
      aria-label={tile.title}
      ref={el => {
        if (el) tileRefs.current.set(tile.id, el);
        else tileRefs.current.delete(tile.id);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      className="absolute z-[4] flex cursor-grab select-none flex-col items-center opacity-0 outline-none active:cursor-grabbing"
      style={{
        width: 96,
        left: position.x,
        top: position.y,
        zIndex: position.z ?? 10 + index,
        touchAction: "none",
      }}
    >
      <TileContent tile={tile} size={78} />
    </div>
  );
}
