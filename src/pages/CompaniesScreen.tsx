import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Building2, Clock, ChevronRight, CheckCircle2, Lightbulb, Tag } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

interface CompanyData {
  name: string;
  timeline: { month: string; event: string }[];
  process: string[];
  roles: string[];
  tips: string[];
  cached?: boolean;
}

const companiesDb: Record<string, CompanyData> = {
  google: {
    name: "Google",
    timeline: [
      { month: "Aug", event: "Applications open" },
      { month: "Sep", event: "Online assessment" },
      { month: "Oct", event: "Phone interviews" },
      { month: "Nov", event: "Onsite interviews" },
      { month: "Dec", event: "Offers rolled out" },
    ],
    process: ["Online Coding Round", "Phone Screen", "Technical Interview (x2)", "Behavioral Interview", "Team Matching"],
    roles: ["SWE Intern", "STEP Intern", "UX Research Intern", "PM Intern"],
    tips: [
      "Focus on DSA — LeetCode medium/hard level",
      "Practice system design basics",
      "Prepare behavioral answers using STAR method",
      "Solve problems aloud during interviews",
    ],
    cached: true,
  },
  razorpay: {
    name: "Razorpay",
    timeline: [
      { month: "Jul", event: "Campus registrations" },
      { month: "Aug", event: "Coding test" },
      { month: "Sep", event: "Interviews" },
      { month: "Oct", event: "Offers" },
    ],
    process: ["Aptitude Test", "Coding Round", "Technical Interview", "HR Round"],
    roles: ["SDE Intern", "Data Analyst Intern", "Product Intern"],
    tips: [
      "Strong DSA fundamentals required",
      "System design not expected for interns",
      "Know about payment systems basics",
    ],
  },
};

const recentSearches = ["Google", "Microsoft", "Razorpay", "Amazon"];

export function CompaniesScreen() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    const key = query.toLowerCase().trim();
    if (!key) return;
    setLoading(true);
    // Simulate fetch
    setTimeout(() => {
      setResult(companiesDb[key] || null);
      setLoading(false);
    }, 600);
  };

  if (loading) {
    return (
      <div className="px-4 pt-12 pb-4">
        <h1 className="mb-4 text-lg font-bold text-foreground">Companies</h1>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <div className="skeleton h-4 w-1/3" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="px-4 pt-12 pb-4 animate-slide-up">
        <button onClick={() => setResult(null)} className="mb-4 text-sm text-muted-foreground">
          ← Back to search
        </button>

        <div className="mb-1 flex items-center gap-2">
          <h1 className="text-lg font-bold text-foreground">{result.name}</h1>
          {result.cached && (
            <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Cached</span>
          )}
        </div>

        {/* Timeline */}
        <section className="mt-6">
          <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Clock size={12} /> Hiring Timeline
          </h2>
          <div className="relative ml-2">
            {result.timeline.map((t, i) => (
              <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {i < result.timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="-mt-0.5">
                  <span className="text-xs font-semibold text-foreground">{t.month}</span>
                  <p className="text-xs text-muted-foreground">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-6">
          <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <ChevronRight size={12} /> Selection Process
          </h2>
          <div className="space-y-1.5">
            {result.process.map((step, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-md bg-secondary px-3 py-2 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </section>

        {/* Roles */}
        <section className="mt-6">
          <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Tag size={12} /> Roles Offered
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.roles.map((role) => (
              <span key={role} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {role}
              </span>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mt-6">
          <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Lightbulb size={12} /> Prep Tips
          </h2>
          <ul className="space-y-2">
            {result.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-success" />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  return (
    <div className="px-4 pt-12 pb-4">
      <h1 className="mb-4 text-lg font-bold text-foreground">Companies</h1>

      <SearchBar
        placeholder="Search a company..."
        value={search}
        onChange={setSearch}
        className="mb-6"
      />

      {search.length > 0 ? (
        <button
          onClick={() => handleSearch(search)}
          className="w-full rounded-lg border p-3 text-left text-sm hover:bg-secondary transition-colors"
        >
          Search for "<span className="font-medium text-foreground">{search}</span>"
        </button>
      ) : (
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent Searches</h2>
          <div className="space-y-1">
            {recentSearches.map((name) => (
              <button
                key={name}
                onClick={() => { setSearch(name); handleSearch(name); }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
              >
                <Building2 size={14} className="text-muted-foreground" />
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
