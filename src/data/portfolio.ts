export interface Project {
  id: string;
  title: string;
  category: string;
  positioning: string;
  thumbnailSrc: string;
  description: string;
  brief: { challenge: string; direction: string; outcome: string };
  gallerySrcs: string[];
  pos: { xPct: number; yPct: number };
}

export interface Document {
  id: string;
  title: string;
  date: string;
  pinned?: boolean;
  preview: string;
  body: string;
}

export interface Photo {
  src: string;
  ratio: "wide" | "tall";
  caption: string;
}

export interface DockApp {
  id: string;
  name: string;
}

const projectImages = [
  "/atelier/projects/noir-leather.jpg",
  "/atelier/projects/kestrel-outerwear.jpg",
  "/atelier/projects/lume-eyewear.jpg",
  "/atelier/projects/pulp-press.jpg",
  "/atelier/projects/solenne-womenswear.jpg",
  "/atelier/projects/quiet-quarterly.jpg",
  "/atelier/projects/bloom-sneaker.jpg",
  "/atelier/projects/kew-botanical.jpg",
  "/atelier/projects/poppy-press.jpg",
  "/atelier/projects/saffron-issue.jpg",
];

const rotateGallery = (start: number) =>
  [...projectImages.slice(start), ...projectImages.slice(0, start)].slice(0, 9);

export const projects: Project[] = [
  {
    id: "noir-leather",
    title: "Noir Leather Collection",
    category: "Brand Identity",
    positioning: "A heritage leather house, stripped to silhouette and shadow.",
    thumbnailSrc: projectImages[0],
    description: "Identity, lookbook, and campaign system for a small-batch leather house cutting jackets in a converted Florentine workshop. Built around a single high-contrast silhouette and a wordmark sharp enough to stamp into hide.",
    brief: {
      challenge: "Sell craft without lapsing into nostalgia. The category is crowded with brown patina and serif logos.",
      direction: "Black on white. One jacket, one mark, one story per drop. A typographic system that lets the leather do the talking.",
      outcome: "Sell-through on the launch jacket inside 11 days. Wholesale orders from three independent boutiques in Tokyo and Paris.",
    },
    gallerySrcs: rotateGallery(1),
    pos: { xPct: 8, yPct: 14 },
  },
  {
    id: "kestrel-outerwear",
    title: "Kestrel Outerwear FW",
    category: "Campaign",
    positioning: "Technical outerwear for people who actually go outside.",
    thumbnailSrc: projectImages[1],
    description: "A fall-winter campaign and art direction for a technical outerwear label. Shot cold, lit hard, and built on a single repeating grid so the garments stay the loudest thing on every page.",
    brief: {
      challenge: "Make performance gear feel designed, not just engineered. The category defaults to mannequins and spec sheets.",
      direction: "One model, one location, weather as a co-star. A rigid editorial grid that lets each piece breathe.",
      outcome: "Campaign ran across six markets. Pre-orders on the flagship parka cleared the first production run in a week.",
    },
    gallerySrcs: rotateGallery(2),
    pos: { xPct: 22, yPct: 22 },
  },
  {
    id: "lume-eyewear",
    title: "Lume Eyewear Launch",
    category: "Product Design",
    positioning: "Eyewear that reads as an object first, a product second.",
    thumbnailSrc: projectImages[2],
    description: "Naming, packaging, and launch system for an independent eyewear house. Every frame ships in a fold-flat case designed to sit on a shelf like a small sculpture.",
    brief: {
      challenge: "Stand out in a category owned by two conglomerates and a thousand lookalikes.",
      direction: "Lead with the silhouette. Strip the packaging to one colour and one line of type. Let the lens do the talking.",
      outcome: "Sold through the launch colourway in three weeks. Picked up by two concept stores in Copenhagen.",
    },
    gallerySrcs: rotateGallery(3),
    pos: { xPct: 38, yPct: 12 },
  },
  {
    id: "pulp-press",
    title: "Pulp Cold-Press Identity",
    category: "Brand Identity",
    positioning: "Cold-pressed, loudly.",
    thumbnailSrc: projectImages[3],
    description: "Identity and bottle system for a cold-press juicery. Built on a screaming colour palette and a wordmark you can read from across the room.",
    brief: {
      challenge: "Wellness branding is a sea of beige and lowercase. Be the opposite without being gimmicky.",
      direction: "Pantone-bright colour blocking, a fat grotesque wordmark, and labels that match the juice inside.",
      outcome: "Shelf turnover up sharply in the first month. Three cafes switched their house juice to the line.",
    },
    gallerySrcs: rotateGallery(4),
    pos: { xPct: 56, yPct: 18 },
  },
  {
    id: "solenne-womenswear",
    title: "Solenne Womenswear",
    category: "Web Design",
    positioning: "A quiet-luxury label, given a quiet-luxury website.",
    thumbnailSrc: projectImages[4],
    description: "End-to-end web design and build direction for a womenswear label. A slow, editorial commerce experience that treats the lookbook and the shop as one continuous scroll.",
    brief: {
      challenge: "Most fashion commerce feels like a spreadsheet with photos. Make browsing feel like turning pages.",
      direction: "Full-bleed imagery, type that gets out of the way, and a checkout that never breaks the spell.",
      outcome: "Average session time more than doubled. Return rate on first orders dropped sharply.",
    },
    gallerySrcs: rotateGallery(5),
    pos: { xPct: 72, yPct: 26 },
  },
  {
    id: "quiet-quarterly",
    title: "Quiet Quarterly · Issue 04",
    category: "Editorial",
    positioning: "A print quarterly about doing less, on purpose.",
    thumbnailSrc: projectImages[5],
    description: "Art direction and typesetting for issue 04 of an independent print quarterly. A single serif, a generous grid, and a lot of white space doing the heavy lifting.",
    brief: {
      challenge: "Hold a reader's attention in print without shouting, and without 200 pages.",
      direction: "One typeface, three weights, a strict baseline grid. Let the photography and the margins carry the rhythm.",
      outcome: "Issue 04 sold out its print run. Now stocked in eleven independent bookshops.",
    },
    gallerySrcs: rotateGallery(6),
    pos: { xPct: 14, yPct: 38 },
  },
  {
    id: "bloom-sneaker",
    title: "Bloom Sneaker Campaign",
    category: "Campaign",
    positioning: "A sneaker launch that behaves like a flower opening.",
    thumbnailSrc: projectImages[6],
    description: "Launch campaign and motion system for a seasonal sneaker drop. Colour, bloom, and a single hero animation reused across every surface from billboard to story.",
    brief: {
      challenge: "Launch a colourway, not a shoe, and make it feel like an event.",
      direction: "Build everything around one blooming gesture. Loud colour, clean product, no clutter.",
      outcome: "Drop sold out in under an hour. The hero loop crossed a million plays in the first week.",
    },
    gallerySrcs: rotateGallery(7),
    pos: { xPct: 30, yPct: 46 },
  },
  {
    id: "kew-botanical",
    title: "Kew Botanical Skincare",
    category: "Brand Identity",
    positioning: "Botanical skincare with a botanist's restraint.",
    thumbnailSrc: projectImages[7],
    description: "Identity and packaging for a plant-based skincare range. Latin nomenclature, pressed-specimen photography, and a palette pulled straight from the ingredients.",
    brief: {
      challenge: "Look scientific and natural at once, without tipping into either pharmacy or farmers' market.",
      direction: "Herbarium typography, a single sage tone, and labels that read like specimen cards.",
      outcome: "Launched into a national retailer. Reordered twice in the first quarter.",
    },
    gallerySrcs: rotateGallery(8),
    pos: { xPct: 46, yPct: 42 },
  },
  {
    id: "poppy-press",
    title: "Poppy Press — Spring Issue",
    category: "Editorial",
    positioning: "A spring issue that smells like the page.",
    thumbnailSrc: projectImages[8],
    description: "Cover and feature-well design for a magazine's spring issue. Pressed-flower art direction and a typographic system that loosens up as the issue goes on.",
    brief: {
      challenge: "Make a seasonal issue feel special without resetting the magazine's whole identity.",
      direction: "Let spring into the type. Pressed botanicals, a warmer paper stock, a cover that earns a second look.",
      outcome: "Best-selling issue of the year on the newsstand. The cover was reprinted as a limited poster.",
    },
    gallerySrcs: rotateGallery(9),
    pos: { xPct: 62, yPct: 50 },
  },
  {
    id: "saffron-issue",
    title: "Saffron — A Yellow Issue",
    category: "Editorial",
    positioning: "One colour, one issue, all the way through.",
    thumbnailSrc: projectImages[9],
    description: "Concept and design for a themed magazine issue built entirely around the colour yellow. A monochrome constraint applied to the cover, the type, and every spread inside.",
    brief: {
      challenge: "Sustain a single-colour concept across 90 pages without exhausting the reader.",
      direction: "Treat yellow as the grid, not the decoration. Shift temperature and saturation to mark each section.",
      outcome: "Picked up two editorial design awards. The most shared issue in the title's history.",
    },
    gallerySrcs: rotateGallery(0),
    pos: { xPct: 78, yPct: 44 },
  },
];

export const documents: Document[] = [
  {
    id: "cv",
    title: "CV — Alex Morgan",
    date: "Pinned",
    pinned: true,
    preview: "Independent product & brand designer, 12 years in.",
    body: `Independent product & brand designer. 12 years turning fuzzy briefs into things people actually use.

EXPERIENCE
Independent — Design lead for hire (2018–now)
Pentagram — Senior designer (2015–2018)
Method — Product designer (2013–2015)
Wolff Olins — Designer (2011–2013)

SELECTED CLIENTS
Independent fashion houses, two national retailers, a handful of startups you have probably tapped this week, and three magazines.

CAPABILITIES
Brand identity · Art direction · Product & web design · Packaging · Motion direction · The annoying details no one else wants to own.

CONTACT
hello@ateliermorgan.com — open to project work and the occasional good argument about kerning.`,
  },
  {
    id: "principles",
    title: "Design principles",
    date: "Today",
    preview: "Clarity over cleverness. Restraint over fireworks.",
    body: `Clarity over cleverness. Restraint over fireworks. Friction is information — when something feels hard, the design is telling you where it is broken.

Decide the hierarchy before you decide the colour. If everything is loud, nothing is.

Ship the boring version first. Earn the flourishes.`,
  },
  {
    id: "obsessions",
    title: "Current obsessions",
    date: "Yesterday",
    preview: "Variable fonts, glassy chrome, palette temperature.",
    body: `Variable fonts that animate their weight instead of swapping files.

Glassy chrome that actually refracts what is behind it, not just a blur.

Palette temperature — the difference between a warm grey and a cold grey is a whole mood, and most people never tune it.`,
  },
  {
    id: "clarity-essay",
    title: "Why I care about clarity",
    date: "Apr 14",
    preview: "A page that explains itself is a page that respects you.",
    body: `A page that explains itself in the first three seconds is a page that respects the person reading it. Everything after that is craft, but the first three seconds are manners.

Clever is for designers showing other designers. Clear is for everyone else, which is to say, the people who pay.`,
  },
  {
    id: "refining",
    title: "Things I keep refining",
    date: "Mar 02",
    preview: "Spring constants, hover timing, colour confidence.",
    body: `Spring constants — the gap between a motion that feels cheap and one that feels expensive is about three numbers.

Hover commit-timing — when does a hover become an intent? Too eager and the UI twitches.

Colour confidence — pick the colour, then stop second-guessing it. Indecision shows up as mud.`,
  },
];

export const photos: Photo[] = [
  { src: "/atelier/myphotos/darwin-boaventura-3lE9CTYns9o-unsplash.jpg", ratio: "wide", caption: "Late shore run" },
  { src: "/atelier/myphotos/darwin-boaventura-B6r__yz6_rQ-unsplash.jpg", ratio: "tall", caption: "Cone after dark" },
  { src: "/atelier/myphotos/darwin-boaventura-UeJkhBp_gNU-unsplash.jpg", ratio: "tall", caption: "Doorway, Paraty" },
  { src: "/atelier/myphotos/jack-berry-9rWOIkEHGqk-unsplash.jpg", ratio: "tall", caption: "Nagano, before the dig-out" },
  { src: "/atelier/myphotos/jamie-cooper-_4uJWT6tVNY-unsplash.jpg", ratio: "tall", caption: "Garden plate" },
  { src: "/atelier/myphotos/laurence-ziegler-XfOuweUwQTI-unsplash.jpg", ratio: "wide", caption: "North coast, golden hour" },
  { src: "/atelier/myphotos/laurence-ziegler-XhBNTX4-a68-unsplash.jpg", ratio: "tall", caption: "Lofoten, first night" },
  { src: "/atelier/myphotos/laurence-ziegler-qgj0DdEKQFs-unsplash.jpg", ratio: "wide", caption: "Late landing" },
  { src: "/atelier/myphotos/nikita-pishchugin-9Ai-n2F9Zz0-unsplash.jpg", ratio: "tall", caption: "Self, in a window" },
];

export const dockApps: DockApp[] = [
  { id: "figma", name: "Figma" },
  { id: "claude", name: "Claude Code" },
  { id: "notes", name: "Notes" },
  { id: "photos", name: "Photos" },
  { id: "x", name: "X" },
  { id: "mail", name: "Mail" },
  { id: "trash", name: "Trash" },
];

export const finderFavorites = [
  { label: "Desktop", color: "#62a8e8" },
  { label: "Applications", color: "#7c8595" },
  { label: "Projects", color: "#7c8595" },
  { label: "MotionIn.Design", color: "#5fd0c9" },
  { label: "Work", color: "#a8a08b" },
  { label: "Movies", color: "#d36e62" },
  { label: "Downloads", color: "#7c8595" },
  { label: "Documents", color: "#7c8595" },
];

export const claudeRecents = [
  "Stop explosive diarrhea?",
  "Delete embarrassing video",
  "How to make it pop",
  "Can you make this better?",
  "How to be famous on X",
  "Find me a job — $1M a year",
];

export const tweetActions = [
  { src: "/atelier/x_ui/reaply.svg", label: "3.4K" },
  { src: "/atelier/x_ui/repost.svg", label: "12K" },
  { src: "/atelier/x_ui/like.svg", label: "89K" },
  { src: "/atelier/x_ui/reach.svg", label: "1.2M" },
  { src: "/atelier/x_ui/save.svg", label: "1.1K" },
  { src: "/atelier/x_ui/share.svg", label: "" },
];

export const windowSizes = {
  project: { w: 980, h: 620 },
  notes: { w: 720, h: 520 },
  photos: { w: 880, h: 600 },
  claude: { w: 720, h: 620 },
  finder: { w: 760, h: 460 },
  video: { w: 720, h: 460 },
  compose: { w: 640, h: 580 },
  tweet: { w: 600, h: 640 },
  site: { w: 880, h: 600 },
};

export const allTiles = [
  ...projects.map(p => ({
    id: p.id,
    title: p.title,
    isFolder: false,
    thumbnailSrc: p.thumbnailSrc,
    pos: p.pos,
  })),
  { id: "dont-open", title: "Don't Open", isFolder: true, thumbnailSrc: "/atelier/doc-icons/folder.png", pos: { xPct: 6, yPct: 60 } },
];
