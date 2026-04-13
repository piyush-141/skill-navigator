import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Chip } from "@/components/Chip";
import { ExternalLink, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const filters = ["All", "Remote", "On-site", "Paid", "Unpaid", "< 3 months", "3-6 months"];

const internships = [
  { id: 1, title: "Frontend Developer Intern", company: "Razorpay", tags: ["Remote", "Paid"], deadline: "Jan 15, 2026", domain: "Engineering", url: "#" },
  { id: 2, title: "Data Science Intern", company: "Flipkart", tags: ["On-site", "Paid"], deadline: "Jan 20, 2026", domain: "Data", url: "#" },
  { id: 3, title: "Product Design Intern", company: "Swiggy", tags: ["Remote", "Stipend"], deadline: "Feb 1, 2026", domain: "Design", url: "#" },
  { id: 4, title: "Backend Engineering Intern", company: "PhonePe", tags: ["Hybrid", "Paid"], deadline: "Jan 28, 2026", domain: "Engineering", url: "#" },
  { id: 5, title: "Marketing Intern", company: "Meesho", tags: ["Remote", "Unpaid"], deadline: "Feb 10, 2026", domain: "Marketing", url: "#" },
  { id: 6, title: "ML Research Intern", company: "Google", tags: ["On-site", "Paid"], deadline: "Mar 1, 2026", domain: "Research", url: "#" },
];

export function InternshipsScreen() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<typeof internships[0] | null>(null);

  if (selected) {
    return (
      <div className="px-4 pt-12 pb-4 animate-slide-up">
        <button onClick={() => setSelected(null)} className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="mb-6">
          <h1 className="text-lg font-bold text-foreground">{selected.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{selected.company}</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Domain</span>
                <span className="font-medium text-foreground">{selected.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-medium text-foreground">{selected.tags[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Compensation</span>
                <span className="font-medium text-foreground">{selected.tags[1]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deadline</span>
                <span className="font-medium text-foreground">{selected.deadline}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is an opportunity at {selected.company} for the role of {selected.title}. 
              Visit the source to learn more about requirements and apply directly.
            </p>
          </div>
        </div>

        <Button className="w-full gap-2" onClick={() => window.open(selected.url, "_blank")}>
          <ExternalLink size={16} />
          View on Source
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-12 pb-4">
      <h1 className="mb-4 text-lg font-bold text-foreground">Internships</h1>

      <div className="sticky top-0 z-10 bg-background pb-3">
        <SearchBar
          placeholder="Search roles, companies..."
          value={search}
          onChange={setSearch}
          className="mb-3"
        />
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((f) => (
            <Chip key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>
              {f}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {internships.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="w-full rounded-lg border p-4 text-left transition-colors hover:bg-secondary"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.company}</p>
              </div>
              <ExternalLink size={14} className="mt-1 shrink-0 text-muted-foreground" />
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                  {tag}
                </span>
              ))}
              <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar size={10} />
                {item.deadline}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
