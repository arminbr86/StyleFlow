interface AddressBarProps {
  url: string;
}

export default function AddressBar({ url }: AddressBarProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-[6px] border border-black/[0.08] bg-white/70 px-2.5 py-[3px] text-[11px] font-medium text-black/55 backdrop-blur-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-3 text-black/35">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
      </svg>
      <span className="truncate">{url}</span>
    </div>
  );
}
