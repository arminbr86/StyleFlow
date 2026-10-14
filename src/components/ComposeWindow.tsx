import type { WinState } from "./Desktop";
import { useState } from "react";
import { Send, Check, Loader, ChevronDown } from "./icons";

interface ComposeWindowProps {
  win: WinState;
  ctx: { closeWindow: (uid: number) => void };
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-2.5">
      <span className="w-14 shrink-0 text-right text-[12px] font-medium text-black/45">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export default function ComposeWindow({ win, ctx }: ComposeWindowProps) {
  const [subject, setSubject] = useState("");
  const [from, setFrom] = useState("");
  const [body, setBody] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const canSend = subject.trim() && from.trim() && body.trim();
  const to = "hello@ateliermorgan.com";

  const handleSend = () => {
    if (!canSend || status === "sending" || status === "success") return;
    if (honeypot.trim()) {
      setStatus("success");
      window.setTimeout(() => ctx.closeWindow(win.uid), 1100);
      return;
    }
    setStatus("sending");
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${body}\n\nFrom: ${from}`)}`;
    try {
      window.location.href = mailto;
      window.setTimeout(() => {
        setStatus("success");
        window.setTimeout(() => ctx.closeWindow(win.uid), 1100);
      }, 350);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <FieldRow label="To:">
        <span className="inline-flex items-center gap-1 rounded-md border border-[#cfe2ff] bg-[#e5efff] px-2 py-[2px] text-[13px] text-[#1a3a86]">
          {to}
          <ChevronDown className="size-3" />
        </span>
      </FieldRow>
      <FieldRow label="Subject:">
        <input value={subject} onChange={e => setSubject(e.target.value)} autoFocus className="w-full bg-transparent text-[13px] text-[#1a1612] outline-none" />
      </FieldRow>
      <FieldRow label="From:">
        <input value={from} onChange={e => setFrom(e.target.value)} placeholder="Your name – you@example.com" className="w-full bg-transparent text-[13px] text-[#1a1612] outline-none placeholder:text-black/30" />
      </FieldRow>
      <div className="relative min-h-0 flex-1">
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your message…"
          className="size-full resize-none bg-transparent p-5 text-[13.5px] leading-relaxed text-[#1a1612] outline-none placeholder:text-black/30"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          className="absolute left-[-9999px] size-0 opacity-0"
          aria-hidden="true"
        />
        {(status === "success" || status === "error") && (
          <div className={`absolute inset-x-3 bottom-3 rounded-md px-3 py-2 text-[12.5px] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.18)] ${status === "success" ? "bg-[#e6f7ec] text-[#1a6a2c]" : "bg-[#fbe8e6] text-[#a01616]"}`}>
            {status === "success" ? "Sent. Thanks — they'll be in touch." : "Couldn't send. Try again."}
          </div>
        )}
      </div>
      {/* Send button in bottom right */}
      <div className="flex justify-end px-4 py-3 border-t border-black/[0.06]">
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend || status === "sending" || status === "success"}
          aria-label="Send"
          className={`flex size-9 items-center justify-center rounded-full text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors focus-visible:ring-2 focus-visible:ring-[#0a84ff]/45 ${status === "success" ? "bg-[#28c840]" : canSend && status !== "sending" ? "bg-[#0a84ff]" : "bg-[#a9d3ff]"}`}
        >
          {status === "sending" ? <Loader className="size-4 animate-spin" /> :
           status === "success" ? <Check className="size-[18px]" strokeWidth={3} /> :
           <Send className="size-[18px]" strokeWidth={2.4} />}
        </button>
      </div>
    </div>
  );
}
