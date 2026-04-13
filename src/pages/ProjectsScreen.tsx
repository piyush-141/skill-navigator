import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Chip } from "@/components/Chip";
import { Bookmark, BookmarkCheck, ArrowLeft, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  stack: string[];
  outcome: string;
  domain: string;
  problem: string;
}

const projects: Project[] = [
  { id: 1, title: "E-commerce REST API", difficulty: "Intermediate", stack: ["Node.js", "Express", "MongoDB"], outcome: "Working API with auth, cart, and payments", domain: "Backend", problem: "Build a complete REST API for an e-commerce platform supporting user authentication, product catalog, cart management, and order processing." },
  { id: 2, title: "Weather Dashboard", difficulty: "Beginner", stack: ["React", "Tailwind", "OpenWeather API"], outcome: "Responsive weather app with search", domain: "Frontend", problem: "Create a weather dashboard that displays current conditions, forecasts, and allows users to search and save favorite locations." },
  { id: 3, title: "ML Spam Classifier", difficulty: "Intermediate", stack: ["Python", "scikit-learn", "Flask"], outcome: "Trained model with API endpoint", domain: "ML/AI", problem: "Train a spam classifier on email data and expose it via a REST API for real-time predictions." },
  { id: 4, title: "Real-time Chat App", difficulty: "Advanced", stack: ["React", "Socket.io", "Node.js", "Redis"], outcome: "Scalable chat with rooms and presence", domain: "Full Stack", problem: "Build a real-time chat application supporting multiple rooms, online presence indicators, and message persistence." },
  { id: 5, title: "Portfolio Generator", difficulty: "Beginner", stack: ["HTML", "CSS", "JavaScript"], outcome: "Static portfolio site from JSON config", domain: "Frontend", problem: "Create a tool that generates a portfolio website from a simple JSON configuration file." },
];

const filters = ["All", "Beginner", "Intermediate", "Advanced"];
const domainFilters = ["All", "Frontend", "Backend", "Full Stack", "ML/AI"];

interface ProjectsScreenProps {
  onBack: () => void;
}

export function ProjectsScreen({ onBack }: ProjectsScreenProps) {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<Project | null>(null);

  const toggleSave = (id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredProjects = projects.filter((p) => {
    if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (selected) {
    const isSaved = savedIds.has(selected.id);
    return (
      <div className="px-4 pt-12 pb-4 animate-slide-up">
        <button onClick={() => setSelected(null)} className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">{selected.title}</h1>
            <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
              selected.difficulty === "Beginner" ? "bg-success/10 text-success" :
              selected.difficulty === "Intermediate" ? "bg-warning/10 text-warning" :
              "bg-destructive/10 text-destructive"
            }`}>
              {selected.difficulty}
            </span>
          </div>
          <button onClick={() => toggleSave(selected.id)} className="p-1">
            {isSaved ? <BookmarkCheck size={20} className="text-primary" /> : <Bookmark size={20} className="text-muted-foreground" />}
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Problem Statement</h3>
            <p className="text-sm text-foreground leading-relaxed">{selected.problem}</p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Expected Outcome</h3>
            <p className="text-sm text-foreground">{selected.outcome}</p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Suggested Stack</h3>
            <div className="flex flex-wrap gap-2">
              {selected.stack.map((s) => (
                <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-12 pb-4">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft size={16} /> Back
      </button>
      <h1 className="mb-4 text-lg font-bold text-foreground">Project Ideas</h1>

      <SearchBar placeholder="Search projects..." value={search} onChange={setSearch} className="mb-3" />

      <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-none">
        {filters.map((f) => (
          <Chip key={f} active={difficultyFilter === f} onClick={() => setDifficultyFilter(f)}>{f}</Chip>
        ))}
      </div>

      <div className="space-y-2">
        {filteredProjects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="w-full rounded-lg border p-4 text-left transition-colors hover:bg-secondary"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold text-foreground">{p.title}</p>
              <button
                onClick={(e) => { e.stopPropagation(); toggleSave(p.id); }}
                className="p-0.5"
              >
                {savedIds.has(p.id) ? (
                  <BookmarkCheck size={14} className="text-primary" />
                ) : (
                  <Bookmark size={14} className="text-muted-foreground" />
                )}
              </button>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                p.difficulty === "Beginner" ? "bg-success/10 text-success" :
                p.difficulty === "Intermediate" ? "bg-warning/10 text-warning" :
                "bg-destructive/10 text-destructive"
              }`}>
                {p.difficulty}
              </span>
              {p.stack.slice(0, 2).map((s) => (
                <span key={s} className="text-[10px] text-muted-foreground">{s}</span>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{p.outcome}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
