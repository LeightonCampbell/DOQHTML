// Article Content Tracker — Deals of Quality
// Publishing schedule + simulated scroll depth engagement tracker

import { useState } from "react";

const ARTICLES = [
  { id: 1, title: "How High Should a TV Be Mounted Above a Fireplace?", slug: "how-high-should-a-tv-be-mounted-above-a-fireplace", keyword: "how high should a TV be mounted above a fireplace", tier: 1, status: "ready", publishDate: "2026-03-17", wordCount: 1600, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 2, title: "How to Hide TV Wires Without Cutting the Wall", slug: "how-to-hide-tv-wires-without-cutting-the-wall", keyword: "how to hide TV wires without cutting the wall", tier: 1, status: "scheduled", publishDate: "2026-03-24", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 3, title: "TV Mount Not Hitting Stud — What to Do", slug: "tv-mount-not-hitting-stud-what-to-do", keyword: "TV mount not hitting stud what to do", tier: 1, status: "scheduled", publishDate: "2026-03-31", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 4, title: "Best Height to Mount a 65 Inch TV in the Living Room", slug: "best-height-to-mount-65-inch-tv-living-room", keyword: "best height to mount 65 inch TV in living room", tier: 1, status: "scheduled", publishDate: "2026-04-07", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 5, title: "How to Mount a TV on a Plaster Wall", slug: "how-to-mount-a-tv-on-a-plaster-wall", keyword: "how to mount a TV on a plaster wall", tier: 1, status: "scheduled", publishDate: "2026-04-14", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 6, title: "Fixed vs Tilting vs Full Motion TV Mount — Which Is Best?", slug: "fixed-vs-tilting-vs-full-motion-tv-mount", keyword: "fixed vs tilting vs full motion TV mount which is best", tier: 2, status: "scheduled", publishDate: "2026-04-21", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 7, title: "How Much Does TV Mounting Cost?", slug: "how-much-does-tv-mounting-cost", keyword: "how much does TV mounting cost", tier: 2, status: "scheduled", publishDate: "2026-04-28", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 8, title: "How to Set Up a Home Theater on a Budget", slug: "how-to-set-up-home-theater-on-a-budget", keyword: "how to set up a home theater on a budget", tier: 2, status: "scheduled", publishDate: "2026-05-05", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 9, title: "Smart Home Devices Worth Buying for Your First Home", slug: "smart-home-devices-worth-buying-first-home", keyword: "smart home devices worth buying for first home", tier: 2, status: "scheduled", publishDate: "2026-05-12", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 10, title: "How to Childproof a TV from Falling", slug: "how-to-childproof-tv-from-falling", keyword: "how to childproof a TV from falling", tier: 2, status: "scheduled", publishDate: "2026-05-19", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 11, title: "Apartment Living Room Setup Ideas for Small Spaces", slug: "apartment-living-room-setup-ideas-small-space", keyword: "apartment living room setup ideas small space", tier: 3, status: "scheduled", publishDate: "2026-05-26", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 12, title: "Handyman vs Contractor — Which Do I Need?", slug: "handyman-vs-contractor-which-do-i-need", keyword: "handyman vs contractor which do I need", tier: 3, status: "scheduled", publishDate: "2026-06-02", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
  { id: 13, title: "How to Prepare Your Home for a Professional Installer", slug: "how-to-prepare-home-for-professional-installer", keyword: "how to prepare your home for a professional installer", tier: 3, status: "scheduled", publishDate: "2026-06-09", wordCount: 0, engagementData: { views: 0, avgReadDepth: 0, dropoffSections: [] } },
];

const ARTICLE_SECTIONS = ["Opening", "The Rule Everyone Ignores", "The Fireplace Problem", "The Formula", "The Tilt Bracket Compromise", "What About Heat?", "What DIYers Get Wrong", "Closing CTA"];

const TIER_COLORS = {
  1: { bg: "bg-emerald-950", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400" },
  2: { bg: "bg-amber-950", badge: "bg-amber-500/20 text-amber-400 border-amber-500/30", dot: "bg-amber-400" },
  3: { bg: "bg-violet-950", badge: "bg-violet-500/20 text-violet-400 border-violet-500/30", dot: "bg-violet-400" },
};

const STATUS_STYLES = {
  ready: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  scheduled: "bg-zinc-800 text-zinc-400 border border-zinc-700",
  published: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  draft: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
};

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function ReadDepthBar({ sections, dropoffs, depth }) {
  return (
    <div className="space-y-1.5">
      {sections.map((section, i) => {
        const isDropoff = dropoffs.includes(section);
        const readerPct = depth > 0 ? Math.max(0, 100 - i * (100 / sections.length) * (1 - depth / 100)) : 0;
        return (
          <div key={section} className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 w-40 truncate shrink-0">{section}</span>
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${isDropoff ? "bg-red-500" : "bg-blue-500"}`} style={{ width: depth > 0 ? `${readerPct}%` : "0%" }} />
            </div>
            {isDropoff && <span className="text-xs text-red-400 shrink-0">↓ drop-off</span>}
          </div>
        );
      })}
    </div>
  );
}

function ArticleCard({ article, onSelect, isSelected }) {
  const days = daysUntil(article.publishDate);
  const tier = TIER_COLORS[article.tier];
  const isNext = article.status === "ready";
  return (
    <button
      onClick={() => onSelect(article)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${isSelected ? "border-blue-500/60 bg-blue-950/30" : isNext ? "border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-500/60" : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tier.badge}`}>Tier {article.tier}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[article.status]}`}>{article.status === "ready" ? "✦ Ready to publish" : article.status}</span>
        </div>
        <span className="text-xs text-zinc-500 shrink-0 pt-0.5">{formatDate(article.publishDate)}</span>
      </div>
      <p className="text-sm font-medium text-zinc-200 leading-snug mb-1">{article.title}</p>
      <p className="text-xs text-zinc-500 truncate">{article.keyword}</p>
      {days >= 0 && days <= 7 && article.status !== "published" && (
        <p className="text-xs text-amber-400 mt-2 font-medium">{days === 0 ? "📅 Publish today" : `📅 ${days} day${days !== 1 ? "s" : ""} until publish`}</p>
      )}
    </button>
  );
}

function SimulatedEngagement({ article }) {
  const [simData, setSimData] = useState(null);
  const [running, setRunning] = useState(false);
  const runSimulation = () => {
    setRunning(true);
    setTimeout(() => {
      const views = Math.floor(Math.random() * 800) + 200;
      const depth = Math.floor(Math.random() * 40) + 45;
      const dropoffCount = Math.floor(Math.random() * 2) + 1;
      const shuffled = [...ARTICLE_SECTIONS].sort(() => Math.random() - 0.5);
      setSimData({ views, depth, dropoffs: shuffled.slice(0, dropoffCount) });
      setRunning(false);
    }, 1200);
  };
  if (article.status !== "published" && article.status !== "ready") {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-center">
        <p className="text-sm text-zinc-500">Engagement data available after publishing.</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">Article Engagement</h3>
        <button onClick={runSimulation} disabled={running} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50">
          {running ? "Simulating…" : "Simulate reader data"}
        </button>
      </div>
      {!simData && !running && <p className="text-xs text-zinc-500">Once published, connect your analytics (Plausible, GA4) and paste scroll depth data here. Or simulate a sample to see how the tracker works.</p>}
      {running && (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-zinc-400">Reading scroll data…</span>
        </div>
      )}
      {simData && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-zinc-800/60 rounded-lg p-3 text-center">
              <p className="text-xl font-semibold text-zinc-100">{simData.views.toLocaleString()}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Page views</p>
            </div>
            <div className="bg-zinc-800/60 rounded-lg p-3 text-center">
              <p className="text-xl font-semibold text-zinc-100">{simData.depth}%</p>
              <p className="text-xs text-zinc-500 mt-0.5">Avg read depth</p>
            </div>
            <div className={`rounded-lg p-3 text-center ${simData.depth >= 70 ? "bg-emerald-950/60" : simData.depth >= 50 ? "bg-amber-950/60" : "bg-red-950/60"}`}>
              <p className={`text-xl font-semibold ${simData.depth >= 70 ? "text-emerald-400" : simData.depth >= 50 ? "text-amber-400" : "text-red-400"}`}>{simData.depth >= 70 ? "Strong" : simData.depth >= 50 ? "OK" : "Weak"}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Engagement</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400 mb-3">Section read-through rate</p>
            <ReadDepthBar sections={ARTICLE_SECTIONS} dropoffs={simData.dropoffs} depth={simData.depth} />
          </div>
          {simData.dropoffs.length > 0 && (
            <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-3">
              <p className="text-xs font-medium text-red-400 mb-1">Drop-off detected</p>
              <p className="text-xs text-zinc-400">
                Readers are leaving at <strong className="text-zinc-300">{simData.dropoffs.join(" and ")}</strong>.
                {simData.dropoffs.includes("The Formula") && " Consider making the formula section shorter and more visual."}
                {simData.dropoffs.includes("What About Heat?") && " The heat section may feel like a tangent — consider cutting or condensing."}
                {simData.dropoffs.includes("Closing CTA") && " Good news: they read almost everything. Strengthen the CTA copy."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CheckItem({ label }) {
  const [checked, setChecked] = useState(false);
  return (
    <button onClick={() => setChecked((c) => !c)} className="flex items-center gap-3 w-full text-left group">
      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${checked ? "bg-emerald-600 border-emerald-600" : "border-zinc-700 group-hover:border-zinc-500"}`}>
        {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className={`text-xs transition-colors ${checked ? "text-zinc-600 line-through" : "text-zinc-400 group-hover:text-zinc-300"}`}>{label}</span>
    </button>
  );
}

export default function ContentTracker() {
  const [articles, setArticles] = useState(ARTICLES);
  const [selected, setSelected] = useState(ARTICLES[0]);
  const nextUp = articles.find((a) => a.status === "ready" || (a.status === "scheduled" && daysUntil(a.publishDate) <= 7));
  const published = articles.filter((a) => a.status === "published").length;
  const scheduled = articles.filter((a) => a.status === "scheduled").length;
  const markPublished = (id) => {
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === id) return { ...a, status: "published" };
        if (a.id === id + 1 && a.status === "scheduled") return { ...a, status: "ready" };
        return a;
      })
    );
    if (selected?.id === id) setSelected((s) => ({ ...s, status: "published" }));
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center text-zinc-900 text-xs font-bold">D</div>
            <span className="text-sm font-semibold text-zinc-200">Deals of Quality</span>
            <span className="text-zinc-700">·</span>
            <span className="text-sm text-zinc-500">Content Tracker</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span><span className="text-emerald-400 font-medium">{published}</span> published</span>
            <span><span className="text-zinc-300 font-medium">{scheduled}</span> scheduled</span>
            <span><span className="text-zinc-300 font-medium">{articles.length}</span> total</span>
          </div>
        </div>
      </div>
      {nextUp && nextUp.status === "ready" && (
        <div className="bg-emerald-950/50 border-b border-emerald-800/40">
          <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-300 font-medium">Next to publish:</span>
              <span className="text-sm text-zinc-300">{nextUp.title}</span>
              <span className="text-xs text-emerald-500 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">{formatDate(nextUp.publishDate)}</span>
            </div>
            <button onClick={() => markPublished(nextUp.id)} className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shrink-0">Mark published ✓</button>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Publishing Queue</h2>
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full" />Tier 1</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-400 rounded-full" />Tier 2</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-violet-400 rounded-full" />Tier 3</span>
            </div>
          </div>
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
            {articles.map((a) => <ArticleCard key={a.id} article={a} onSelect={setSelected} isSelected={selected?.id === a.id} />)}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-4">
          {selected && (
            <>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TIER_COLORS[selected.tier].badge}`}>Tier {selected.tier}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[selected.status]}`}>{selected.status}</span>
                  </div>
                  {selected.status === "ready" && <button onClick={() => markPublished(selected.id)} className="text-xs px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors shrink-0">Mark published</button>}
                </div>
                <h1 className="text-base font-semibold text-zinc-100 mb-1 leading-snug">{selected.title}</h1>
                <p className="text-xs text-zinc-500 mb-4">Keyword: {selected.keyword}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 mb-0.5">Publish date</p>
                    <p className="text-sm font-medium text-zinc-200">{formatDate(selected.publishDate)}</p>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 mb-0.5">Days away</p>
                    <p className="text-sm font-medium text-zinc-200">{selected.status === "published" ? "Published ✓" : daysUntil(selected.publishDate) === 0 ? "Today" : daysUntil(selected.publishDate) < 0 ? "Overdue" : `${daysUntil(selected.publishDate)} days`}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">Article checklist</h3>
                <div className="space-y-2">
                  {["Primary keyword in H1 title", "Meta title under 60 characters", "Meta description under 155 characters", "Opening paragraph — human moment, not information", "Subheadings every 200–300 words", "No paragraphs longer than 3 sentences", "At least 2 internal links included", "Single low-friction CTA at the end", "Article schema JSON-LD in <head>", "Images have alt text"].map((item, i) => <CheckItem key={i} label={item} />)}
                </div>
              </div>
              <SimulatedEngagement article={selected} />
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">Publishing rhythm</h3>
                <div className="space-y-2 text-xs text-zinc-400 leading-relaxed">
                  <p>→ <span className="text-zinc-300 font-medium">One article per week,</span> published individually — never in batches.</p>
                  <p>→ Publish on the same day each week to establish a freshness pattern Google notices.</p>
                  <p>→ Tier 1 articles first (weeks 1–5). Tier 2 from week 6. Tier 3 from week 11.</p>
                  <p>→ If an article runs late, publish it as soon as it's done — don't skip a week to "catch up."</p>
                  <p>→ After 8 published articles, review read-depth data and prioritize rewrites over new topics where depth is below 50%.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
