import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Chip } from "@/components/Chip";
import { Briefcase, Map, Lightbulb, Building2, Clock, TrendingUp, FileText } from "lucide-react";
import type { TabId } from "@/components/BottomNav";

const featureItems = [
  { id: "internships", label: "Internship Aggregator", desc: "Find & compare opportunities", icon: Briefcase, span: "col-span-2" },
  { id: "roadmaps", label: "Skill Roadmaps", desc: "Role-based learning paths", icon: Map, span: "" },
  { id: "projects", label: "Project Ideas", desc: "Build & learn", icon: Lightbulb, span: "" },
  { id: "companies", label: "Companies & Calendar", desc: "Hiring timelines & prep", icon: Building2, span: "col-span-2" },
  { id: "resume", label: "Resume Builder", desc: "ATS-friendly format", icon: FileText, span: "col-span-2" },
];

const recentlyViewed = [
  { title: "Frontend Developer Intern", company: "Razorpay", type: "Internship" },
  { title: "React Roadmap", company: "Full Stack", type: "Roadmap" },
  { title: "E-commerce API", company: "Node.js Project", type: "Project" },
];

const trendingSkills = ["React", "Python", "System Design", "TypeScript", "AWS", "Docker", "Next.js", "SQL"];

interface HomeScreenProps {
  onNavigate: (tab: TabId) => void;
  onSubScreen: (screen: "projects" | "resume") => void;
}

export function HomeScreen({ onNavigate, onSubScreen }: HomeScreenProps) {
  const [search, setSearch] = useState("");

  const handleFeatureClick = (id: string) => {
    if (id === "projects") return onSubScreen("projects");
    if (id === "resume") return onSubScreen("resume");
    onNavigate(id as TabId);
  };

  return (
    <div className="px-4 pt-12 pb-4">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Good morning</p>
        <h1 className="text-xl font-bold text-foreground">What are you working on?</h1>
      </div>

      <SearchBar
        placeholder="Search internships, skills, companies..."
        value={search}
        onChange={setSearch}
        className="mb-8"
      />

      <div className="mb-8 grid grid-cols-2 gap-3">
        {featureItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleFeatureClick(item.id)}
            className={`flex flex-col items-start rounded-lg border p-4 text-left transition-colors hover:bg-secondary ${item.span}`}
          >
            <item.icon size={20} className="mb-3 text-primary" />
            <span className="text-sm font-semibold text-foreground">{item.label}</span>
            <span className="mt-0.5 text-xs text-muted-foreground">{item.desc}</span>
          </button>
        ))}
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Recently Viewed</h2>
          <Clock size={14} className="text-muted-foreground" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {recentlyViewed.map((item) => (
            <div key={item.title} className="flex min-w-[200px] flex-col rounded-lg border p-3">
              <span className="text-xs text-muted-foreground">{item.type}</span>
              <span className="mt-1 text-sm font-medium text-foreground">{item.title}</span>
              <span className="mt-0.5 text-xs text-muted-foreground">{item.company}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-1.5">
          <TrendingUp size={14} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Trending Skills</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingSkills.map((skill) => (
            <Chip key={skill}>{skill}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
