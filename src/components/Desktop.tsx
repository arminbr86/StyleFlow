import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { allTiles, projects, windowSizes } from "../data/portfolio";
import type { Project } from "../data/portfolio";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopTile from "./DesktopTile";
import WindowFrame from "./WindowFrame";
import CenterHero from "./CenterHero";
import MoreMenu from "./MoreMenu";
import Lightbox from "./Lightbox";
import AddressBar from "./AddressBar";

export interface WinState {
  uid: number;
  kind: string;
  projectId?: string;
  folderName?: string;
  title?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
}

let uidCounter = 1;

export default function Desktop() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [tilePositions, setTilePositions] = useState<Record<string, { x: number; y: number; z: number }>>({});
  const [windows, setWindows] = useState<WinState[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const tileRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const bgLightRef = useRef<HTMLDivElement>(null);
  const bgDarkRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  const computePositions = useCallback(() => {
    const el = sectionRef.current;
    const w = el?.clientWidth ?? window.innerWidth;
    const h = el?.clientHeight ?? window.innerHeight;
    setTilePositions(prev => {
      const next: Record<string, { x: number; y: number; z: number }> = {};
      allTiles.forEach((tile, i) => {
        const existing = prev[tile.id];
        const x = existing ? existing.x : (tile.pos.xPct / 100) * w;
        const y = existing ? existing.y : (tile.pos.yPct / 100) * h;
        next[tile.id] = {
          x: clamp(x, 8, Math.max(8, w - 88)),
          y: clamp(y, 8, Math.max(8, h - 236)),
          z: existing ? existing.z : 10 + i,
        };
      });
      return next;
    });
  }, []);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) computePositions();
  }, [ready, computePositions]);

  useEffect(() => {
    if (!ready) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const onMq = () => { setIsMobile(mq.matches); computePositions(); };
    const onResize = () => computePositions();
    mq.addEventListener("change", onMq);
    window.addEventListener("resize", onResize);
    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("resize", onResize);
    };
  }, [ready, computePositions]);

  // Entrance animation
  useEffect(() => {
    if (!ready || isMobile) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Background subtle scale
    if (bgLightRef.current) {
      gsap.set(bgLightRef.current, { scale: 1.04, filter: "blur(24px)" });
      tl.to(bgLightRef.current, { scale: 1.0008, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }, 0);
    }

    // Hero element
    if (heroRef.current) {
      gsap.set(heroRef.current, { opacity: 0, scale: 0.8 });
      tl.to(heroRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.2);
      tl.to(heroRef.current, { opacity: 0, scale: 1.1, duration: 0.5, ease: "power2.in" }, 1.5);
    }

    // Tiles stagger in
    const tiles = Array.from(tileRefs.current.values());
    if (tiles.length > 0) {
      tiles.forEach((tile, i) => {
        const pos = tilePositions[allTiles[i].id];
        if (!pos) return;
        // Start from center
        const el = sectionRef.current;
        const cx = (el?.clientWidth ?? window.innerWidth) / 2;
        const cy = (el?.clientHeight ?? window.innerHeight) / 2;
        gsap.set(tile, {
          x: cx - pos.x,
          y: cy - pos.y,
          scale: 0.3,
          opacity: 0,
          filter: "blur(8px)",
        });
      });

      tiles.forEach((tile, i) => {
        tl.to(tile, {
          x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)",
          duration: 0.7, ease: "power3.out",
        }, 0.8 + i * 0.08);
      });
    }

    // Menu bar
    if (menuBarRef.current) {
      gsap.set(menuBarRef.current, { opacity: 0, y: -10 });
      tl.to(menuBarRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.3);
    }

    // Dock
    if (dockRef.current) {
      gsap.set(dockRef.current, { opacity: 0, y: 30 });
      tl.to(dockRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.6);
    }

    return () => { tl.kill(); };
  }, [ready, isMobile, tilePositions]);

  // Dark mode observer
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() => {
      setIsDark(el.getAttribute("data-theme") === "dark");
    });
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Dark mode background transition
  useEffect(() => {
    if (bgLightRef.current && bgDarkRef.current) {
      gsap.to(bgLightRef.current, { opacity: isDark ? 0 : 1, duration: 0.5, ease: "power2.out" });
      gsap.to(bgDarkRef.current, { opacity: isDark ? 1 : 0, duration: 0.5, ease: "power2.out" });
    }
  }, [isDark]);

  const openWindow = useCallback((kind: string, opts?: { projectId?: string; folderName?: string; title?: string }) => {
    const size = windowSizes[kind as keyof typeof windowSizes] ?? { w: 800, h: 600 };
    const el = sectionRef.current;
    const w = el?.clientWidth ?? window.innerWidth;
    const h = el?.clientHeight ?? window.innerHeight;
    const x = clamp((w - size.w) / 2 + (Math.random() - 0.5) * 60, 0, Math.max(0, w - size.w));
    const y = clamp((h - size.h) / 2 + (Math.random() - 0.5) * 40, 28, Math.max(28, h - size.h - 10));
    const maxZ = windows.reduce((m, win) => Math.max(m, win.z), 100);
    setWindows(prev => {
      // Don't open duplicate windows of same kind+projectId
      const existing = prev.find(win =>
        win.kind === kind && win.projectId === opts?.projectId && win.folderName === opts?.folderName
      );
      if (existing) {
        return prev.map(win => win.uid === existing.uid ? { ...win, z: maxZ + 1 } : win);
      }
      return [...prev, {
        uid: uidCounter++,
        kind,
        projectId: opts?.projectId,
        folderName: opts?.folderName,
        title: opts?.title,
        x, y, w: size.w, h: size.h, z: maxZ + 1,
      }];
    });
  }, [windows]);

  const closeWindow = useCallback((uid: number) => {
    setWindows(prev => prev.filter(win => win.uid !== uid));
  }, []);

  const focusWindow = useCallback((uid: number) => {
    setWindows(prev => {
      const maxZ = prev.reduce((m, win) => Math.max(m, win.z), 100);
      return prev.map(win => win.uid === uid ? { ...win, z: maxZ + 1 } : win);
    });
  }, []);

  const moveWindow = useCallback((uid: number, x: number, y: number) => {
    setWindows(prev => prev.map(win => win.uid === uid ? { ...win, x, y } : win));
  }, []);

  const handleTileClick = useCallback((tile: typeof allTiles[0]) => {
    if (tile.isFolder) {
      openWindow("finder", { folderName: "Don't Open" });
    } else {
      openWindow("project", { projectId: tile.id });
    }
  }, [openWindow]);

  const handleDockClick = useCallback((appId: string) => {
    switch (appId) {
      case "figma": openWindow("site"); break;
      case "claude": openWindow("claude"); break;
      case "notes": openWindow("notes"); break;
      case "photos": openWindow("photos"); break;
      case "x": openWindow("tweet"); break;
      case "mail": openWindow("compose"); break;
      case "trash": openWindow("finder", { folderName: "Trash" }); break;
    }
  }, [openWindow]);

  const openLightbox = useCallback((src: string) => setLightbox(src), []);

  const ctx = { isMobile, openProject: (id: string) => openWindow("project", { projectId: id }), openLightbox, closeWindow };

  return (
    <main
      aria-label="Alex Morgan — interactive desktop portfolio"
      className="relative isolate h-dvh w-full overflow-hidden bg-[#1a1612]"
      ref={sectionRef}
    >
      <h1 className="sr-only">Alex Morgan — Independent Product and Brand Designer</h1>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bgLightRef}
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url(/atelier/wallpaper-light.jpg)", backgroundPosition: "center 38%", opacity: 1, transition: "opacity 500ms ease-out" }}
        />
        <div
          ref={bgDarkRef}
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url(/atelier/wallpaper-dark.jpg)", backgroundPosition: "center 38%", opacity: 0, transition: "opacity 500ms ease-out" }}
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(120% 90% at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0.35) 100%)" }}
      />

      {/* Center hero element */}
      {!isMobile && ready && (
        <CenterHero heroRef={heroRef} imgRef={heroImgRef} />
      )}

      {/* Desktop tiles */}
      {!isMobile && allTiles.map((tile, i) => (
        <DesktopTile
          key={tile.id}
          tile={tile}
          index={i}
          position={tilePositions[tile.id]}
          sectionRef={sectionRef}
          tileRefs={tileRefs}
          onClick={() => handleTileClick(tile)}
          onMove={(id, x, y) => setTilePositions(prev => ({
            ...prev,
            [id]: { ...prev[id], x, y },
          }))}
        />
      ))}

      {/* Mobile tile grid */}
      {isMobile && ready && (
        <div className="absolute inset-x-0 bottom-[100px] top-[64px] z-[4] grid grid-cols-3 content-start gap-x-2 gap-y-4 overflow-y-auto px-4 pb-4 pt-2">
          {allTiles.map(tile => (
            <div
              key={tile.id}
              role="button"
              tabIndex={0}
              aria-label={tile.title}
              onClick={() => handleTileClick(tile)}
              onKeyDown={e => e.key === "Enter" && handleTileClick(tile)}
              className="flex select-none flex-col items-center outline-none"
            >
              <TileContent tile={tile} size={64} />
            </div>
          ))}
        </div>
      )}

      {/* Menu bar */}
      <MenuBar menuBarRef={menuBarRef} isMobile={isMobile} />

      {/* Windows */}
      {windows.map(win => (
        <WindowFrame
          key={win.uid}
          win={win}
          isMobile={isMobile}
          sectionRef={sectionRef}
          onClose={closeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
          ctx={ctx}
        />
      ))}

      {/* Dock */}
      <Dock dockRef={dockRef} isMobile={isMobile} onDockClick={handleDockClick} onMoreClick={() => setShowMore(true)} />

      {/* More menu */}
      {showMore && (
        <MoreMenu onClose={() => setShowMore(false)} onDockClick={handleDockClick} />
      )}

      {/* Lightbox */}
      {lightbox && (
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      )}
    </main>
  );
}

import { TileContent } from "./DesktopTile";
