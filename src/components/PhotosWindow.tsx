import { photos } from "../data/portfolio";

interface PhotosWindowProps {
  ctx: { openLightbox: (src: string) => void };
}

export default function PhotosWindow({ ctx }: PhotosWindowProps) {
  return (
    <div className="win-scroll h-full overflow-y-auto px-6 py-7 sm:px-8 sm:py-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">Recents · {photos.length}</p>
      <div className="mt-4 grid auto-rows-[120px] grid-cols-4 gap-3" style={{ gridAutoFlow: "row dense" }}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => ctx.openLightbox(photo.src)}
            className={`group relative overflow-hidden rounded-[8px] bg-black/5 ${photo.ratio === "tall" ? "row-span-2" : ""} ${photo.ratio === "wide" ? "col-span-2" : ""}`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              draggable={false}
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-[11px] font-medium text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {photo.caption}
            </span>
            {i === 0 && <span className="sr-only">Open photo</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
