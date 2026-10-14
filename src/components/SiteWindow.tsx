import AddressBar from "./AddressBar";

export default function SiteWindow() {
  return (
    <div className="flex h-full flex-col bg-[#f7f5ef]">
      <div className="flex items-center justify-center py-2">
        <AddressBar url="figma.com/design/D2ePsCUWyaFq2ZRTYHsKzF/Modulify-Showcase" />
      </div>
      <iframe
        src="https://embed.figma.com/design/D2ePsCUWyaFq2ZRTYHsKzF/Modulify-Showcase?node-id=0-1&embed-host=share"
        title="Figma design"
        className="size-full flex-1 border-0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
