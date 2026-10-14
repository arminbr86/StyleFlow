export default function VideoWindow() {
  return (
    <div className="size-full bg-black">
      <iframe
        src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&playsinline=1&rel=0"
        title="Video"
        className="size-full border-0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
