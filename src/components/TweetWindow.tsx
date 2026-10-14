import { tweetActions } from "../data/portfolio";
import { ChevronLeft, Verified, MapPin, Calendar, Pin } from "./icons";

const profileName = "Elon Musk";
const profileHandle = "@elonmusk";
const profilePic = "/atelier/x_ui/Elon_pfp.jpg";
const coverPic = "/atelier/x_ui/elon_cover.jpeg";

export default function TweetWindow() {
  return (
    <div className="dark-scroll h-full overflow-y-auto bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-5 border-b border-white/10 bg-black/85 px-4 py-3 backdrop-blur-md">
        <button type="button" aria-label="Back" className="rounded-full p-1.5 transition-colors hover:bg-white/10">
          <ChevronLeft className="size-[18px]" />
        </button>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold leading-tight">{profileName}</span>
          <span className="text-[12.5px] text-white/55">209K posts</span>
        </div>
      </div>

      {/* Cover */}
      <div className="h-[150px] bg-cover bg-center" style={{ backgroundImage: `url(${coverPic})` }} aria-hidden="true" />

      {/* Profile info */}
      <div className="relative px-4">
        <div className="absolute -top-[56px] left-4 size-28 overflow-hidden rounded-full border-4 border-black bg-black">
          <img src={profilePic} alt={profileName} className="size-full object-cover" draggable={false} />
        </div>
        <div className="flex justify-end pt-3">
          <button type="button" className="rounded-full bg-white px-4 py-1 text-[13.5px] font-bold text-black transition-colors hover:bg-white/90">
            Following
          </button>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <span className="text-[19px] font-extrabold leading-tight">{profileName}</span>
          <Verified className="size-[18px] text-[#1d9bf0]" />
        </div>
        <p className="text-[14px] text-white/55">{profileHandle}</p>
        <p className="mt-3 text-[14.5px] leading-snug">Trying to make life multi-planetary. Free speech absolutist. Mostly jokes.</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-white/55">
          <span className="flex items-center gap-1"><MapPin className="size-3.5" />Mars</span>
          <span className="flex items-center gap-1"><Calendar className="size-3.5" />Joined June 2009</span>
        </div>
        <div className="mt-3 flex gap-5 text-[13.5px]">
          <span><strong className="text-white">684</strong> <span className="text-white/55">Following</span></span>
          <span><strong className="text-white">221.4M</strong> <span className="text-white/55">Followers</span></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-3 flex border-b border-white/10">
        {["Posts", "Replies", "Highlights", "Media", "Likes"].map((tab, i) => (
          <button key={tab} type="button" className={`relative flex-1 py-3 text-center text-[14px] transition-colors ${i === 0 ? "font-bold text-white" : "text-white/55 hover:bg-white/[0.04]"}`}>
            {tab}
            {i === 0 && <span className="absolute inset-x-1/2 bottom-0 h-[3.5px] w-12 -translate-x-1/2 rounded-full bg-[#1d9bf0]" />}
          </button>
        ))}
      </div>

      {/* Pinned tweet */}
      <article className="border-b border-white/10 px-4 py-3">
        <div className="mb-1.5 flex items-center gap-1.5 text-[12.5px] text-white/55">
          <Pin className="size-3.5" />Pinned
        </div>
        <div className="flex gap-3">
          <img src={profilePic} alt={profileName} className="size-10 shrink-0 rounded-full object-cover" draggable={false} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[14.5px]">
              <span className="font-bold">{profileName}</span>
              <Verified className="size-[15px] text-[#1d9bf0]" />
              <span className="text-white/55">{profileHandle} · Mar 12</span>
            </div>
            <p className="mt-0.5 text-[14.5px] leading-snug">
              I love design 🟧
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 text-white/55">
              {tweetActions.map((action, i) => (
                <button key={i} type="button" className="flex items-center gap-1 text-[12.5px] transition-colors hover:text-[#1d9bf0]">
                  <img src={action.src} alt="" className="size-[15px] opacity-60" />
                  {action.label && <span>{action.label}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Regular tweet */}
      <article className="border-b border-white/10 px-4 py-3">
        <div className="flex gap-3">
          <img src={profilePic} alt={profileName} className="size-10 shrink-0 rounded-full object-cover" draggable={false} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[14.5px]">
              <span className="font-bold">{profileName}</span>
              <Verified className="size-[15px] text-[#1d9bf0]" />
              <span className="text-white/55">{profileHandle} · Apr 2</span>
            </div>
            <p className="mt-0.5 text-[14.5px] leading-snug">
              Just discovered this incredible portfolio template. The attention to detail is next level. 🔥
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 text-white/55">
              {tweetActions.map((action, i) => (
                <button key={i} type="button" className="flex items-center gap-1 text-[12.5px] transition-colors hover:text-[#1d9bf0]">
                  <img src={action.src} alt="" className="size-[15px] opacity-60" />
                  {action.label && <span>{action.label}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
