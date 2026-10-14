import { useEffect, useState } from "react";
import { Battery, Wifi } from "./icons";

interface MenuBarProps {
  menuBarRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
}

export default function MenuBar({ menuBarRef, isMobile }: MenuBarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = days[now.getDay()];
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${day} ${h}:${m}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (isMobile) {
    return (
      <div ref={menuBarRef} className="absolute inset-x-0 top-0 z-[5] flex h-12 items-center justify-between px-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-semibold tracking-tight">{time.split(" ")[1]}</span>
          <Wifi className="size-4" />
        </div>
        <div className="flex items-center gap-1">
          <Wifi className="size-4" />
          <Battery className="size-5" />
        </div>
      </div>
    );
  }

  return (
    <div ref={menuBarRef} className="absolute inset-x-0 top-0 z-[5] opacity-0">
      <div className="hidden h-7 items-center justify-between bg-black/15 px-4 backdrop-blur-md sm:flex">
        <div className="flex items-center gap-4 text-[11px] text-white/80">
          <span className="size-3 rounded-[2px] bg-white" aria-hidden="true" />
          <span className="font-bold">Atelier</span>
          <span className="text-white/70">File</span>
          <span className="text-white/70">Edit</span>
          <span className="text-white/70">View</span>
          <span className="text-white/70">Window</span>
          <span className="text-white/70">Help</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/80">
          <Battery className="size-5" />
          <span>100%</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
