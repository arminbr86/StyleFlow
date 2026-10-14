import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { claudeRecents } from "../data/portfolio";
import { Plus, ChevronLeft, ChevronRight, Mic, Loader } from "./icons";

interface ClaudeWindowProps {
  ctx: { isMobile: boolean };
}

export default function ClaudeWindow({ ctx }: ClaudeWindowProps) {
  const [view, setView] = useState<"list" | "detail">("list");
  const headerRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const showList = !ctx.isMobile || view === "list";
  const showDetail = !ctx.isMobile || view === "detail";

  useEffect(() => {
    if (ctx.isMobile && view !== "detail") return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (headerRef.current) tl.fromTo(headerRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 }, 0);
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.25 }, 0.45);
    if (bodyRef.current) tl.fromTo(bodyRef.current, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.35 }, 0.75);
    if (actionsRef.current) tl.fromTo(actionsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 1.05);
    return () => { tl.kill(); };
  }, [ctx.isMobile, view]);

  return (
    <div className="flex h-full bg-[#faf9f5] text-[#1f1d1a]">
      {showList && (
        <div className={`flex flex-col bg-[#f1efe8] md:border-r md:border-black/[0.06] ${ctx.isMobile ? "w-full" : "w-[220px]"}`}>
          <div className="px-3 pt-4">
            <button type="button" className="flex w-full items-center gap-2 rounded-[10px] border border-black/[0.07] bg-white px-3 py-2 text-[13px] font-medium text-[#1f1d1a] shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-colors hover:bg-black/[0.03]">
              <Plus className="size-3.5" />
              New chat
            </button>
          </div>
          <p className="mt-5 px-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">Recents</p>
          <div className="mt-1 flex-1 overflow-y-auto win-scroll px-2 pb-3">
            <button type="button" onClick={() => ctx.isMobile && setView("detail")} className="block w-full truncate rounded-[8px] bg-black/[0.08] px-2.5 py-1.5 text-left text-[13px] font-medium text-[#1f1d1a]">
              Make me a cool portfolio
            </button>
            {claudeRecents.map(text => (
              <span key={text} className="mt-0.5 block w-full cursor-default truncate rounded-[8px] px-2.5 py-1.5 text-[13px] text-black/65 transition-colors hover:bg-black/[0.04]">
                {text}
              </span>
            ))}
          </div>
        </div>
      )}
      {showDetail && (
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {ctx.isMobile && (
            <button type="button" onClick={() => setView("list")} className="flex items-center gap-1 border-b border-black/[0.06] px-3 py-2.5 text-[13px] font-medium text-[#1f1d1a]">
              <ChevronLeft className="size-4" />
              Claude
            </button>
          )}
          <div className="win-scroll flex-1 overflow-y-auto px-6 py-7 sm:px-8 sm:py-9">
            <div ref={headerRef} className="flex justify-end">
              <p className="max-w-[80%] rounded-[18px] bg-[#ecebe6] px-4 py-2 text-[15px]" style={{ fontFamily: 'Charter, "Tiempos Text", ui-serif, Georgia, serif' }}>
                Make me a cool portfolio
              </p>
            </div>
            <div className="mt-8">
              <div ref={subRef} className="flex items-center gap-1 text-[13.5px] text-black/45">
                Architected an animated portfolio showcasing a designer's best work
                <ChevronRight className="size-[11px]" />
              </div>
              <p ref={bodyRef} className="mt-3 text-[17px] leading-[1.5] text-[#1f1d1a]" style={{ fontFamily: 'Charter, "Tiempos Text", ui-serif, Georgia, serif' }}>
                Aight, bet! Check{" "}
                <a href="https://www.motionin.design" target="_blank" rel="noreferrer" className="underline decoration-black/30 underline-offset-2 transition-colors hover:text-[#c96442] hover:decoration-current">
                  https://motionin.design/gallery/atelier
                </a>
              </p>
              <div ref={actionsRef} className="mt-4 flex items-center gap-1 text-black/40">
                {[Loader, Mic, ChevronRight, Plus].map((Icon, i) => (
                  <button key={i} type="button" aria-label="Message action" className="rounded-md p-1.5 transition-colors hover:bg-black/[0.05] hover:text-black/70">
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="px-6 pb-4 pt-2">
            <div className="rounded-[22px] border border-black/[0.07] bg-white px-4 py-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.07)]">
              <p className="text-[15px] text-black/30">Write a message…</p>
              <div className="mt-3 flex items-center justify-between">
                <button type="button" aria-label="Attach" className="rounded-md p-1 transition-colors hover:bg-black/[0.05]">
                  <Plus className="size-4 text-black/55" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full border border-[#467cc6] px-3 py-[3px] text-[12px] text-[#1f1d1a]">
                    <span className="font-medium">Haiku 4.5</span>
                    <span className="text-black/45">Extended</span>
                    <ChevronDown className="size-3" />
                  </span>
                  <button type="button" aria-label="Voice" className="rounded-md p-1 transition-colors hover:bg-black/[0.05]">
                    <Mic className="size-4 text-black/55" />
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-black/30">Claude can make mistakes. Check responses.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
