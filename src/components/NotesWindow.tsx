import { useState } from "react";
import { documents } from "../data/portfolio";
import { ChevronLeft } from "./icons";

interface NotesWindowProps {
  ctx: { isMobile: boolean };
}

export default function NotesWindow({ ctx }: NotesWindowProps) {
  const [activeId, setActiveId] = useState(documents[0].id);
  const [view, setView] = useState<"list" | "detail">("list");
  const active = documents.find(d => d.id === activeId) ?? documents[0];
  const showList = !ctx.isMobile || view === "list";
  const showDetail = !ctx.isMobile || view === "detail";

  return (
    <div className="flex h-full">
      {showList && (
        <div className={`flex flex-col bg-[#f7f5ee] md:border-r md:border-black/[0.08] ${ctx.isMobile ? "w-full" : "w-60"}`}>
          <p className="border-b border-black/[0.06] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
            Notes — {documents.length}
          </p>
          <div className="flex-1 overflow-y-auto win-scroll">
            {documents.map(doc => (
              <button
                key={doc.id}
                type="button"
                onClick={() => { setActiveId(doc.id); if (ctx.isMobile) setView("detail"); }}
                className={`block w-full border-b border-black/[0.05] px-4 py-3 text-left transition-colors ${doc.id !== activeId || ctx.isMobile ? "hover:bg-black/[0.03]" : "bg-[#f4d34c]/60"}`}
              >
                <p className="truncate text-[13px] font-semibold text-[#1a1612]">{doc.title}</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-[11px] font-medium text-black/70">{doc.date}</span>
                  <span className="truncate text-[11px] text-black/55">{doc.preview}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {showDetail && (
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {ctx.isMobile && (
            <button
              type="button"
              onClick={() => setView("list")}
              className="flex items-center gap-1 border-b border-black/[0.06] px-3 py-2.5 text-[13px] font-medium text-[#1a1612]"
            >
              <ChevronLeft className="size-4" />
              Notes
            </button>
          )}
          <div className="win-scroll flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
            <p className="text-[11px] text-black/45">{active.date}</p>
            <h3 className="mt-1 text-[22px] font-semibold leading-tight tracking-tight text-[#1a1612]">{active.title}</h3>
            <p className="mt-5 whitespace-pre-line text-[14px] leading-relaxed text-black/80">{active.body}</p>
          </div>
        </div>
      )}
    </div>
  );
}
