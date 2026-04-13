import { useState } from "react";
import { ChevronDown, Lock, CheckCircle2, Circle, ThumbsUp, Plus, ExternalLink } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Map } from "lucide-react";

type NodeStatus = "locked" | "in-progress" | "completed";

interface RoadmapNode {
  id: string;
  skill: string;
  status: NodeStatus;
  resources: { title: string; url: string }[];
  upvotes: number;
}

const roles = ["Frontend Developer", "Backend Developer", "Data Scientist", "Product Designer", "DevOps Engineer"];

const roadmapData: Record<string, RoadmapNode[]> = {
  "Frontend Developer": [
    { id: "1", skill: "HTML & CSS", status: "completed", resources: [{ title: "MDN Web Docs", url: "#" }, { title: "CSS Tricks Guide", url: "#" }], upvotes: 342 },
    { id: "2", skill: "JavaScript Fundamentals", status: "completed", resources: [{ title: "javascript.info", url: "#" }, { title: "Eloquent JS", url: "#" }], upvotes: 289 },
    { id: "3", skill: "React", status: "in-progress", resources: [{ title: "React Docs", url: "#" }, { title: "React Patterns", url: "#" }], upvotes: 456 },
    { id: "4", skill: "TypeScript", status: "locked", resources: [{ title: "TS Handbook", url: "#" }], upvotes: 198 },
    { id: "5", skill: "State Management", status: "locked", resources: [{ title: "Zustand Docs", url: "#" }], upvotes: 167 },
    { id: "6", skill: "Testing", status: "locked", resources: [{ title: "Testing Library", url: "#" }], upvotes: 134 },
  ],
  "Backend Developer": [
    { id: "1", skill: "Programming Basics", status: "completed", resources: [{ title: "Python.org", url: "#" }], upvotes: 210 },
    { id: "2", skill: "Databases & SQL", status: "in-progress", resources: [{ title: "SQLBolt", url: "#" }], upvotes: 189 },
    { id: "3", skill: "REST APIs", status: "locked", resources: [{ title: "RESTful API Design", url: "#" }], upvotes: 256 },
    { id: "4", skill: "Authentication", status: "locked", resources: [{ title: "OWASP Guide", url: "#" }], upvotes: 145 },
  ],
};

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Completed" },
  "in-progress": { icon: Circle, color: "text-primary", bg: "bg-primary/10", label: "In Progress" },
  locked: { icon: Lock, color: "text-muted-foreground", bg: "bg-muted", label: "Locked" },
};

export function RoadmapsScreen() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const nodes = selectedRole ? (roadmapData[selectedRole] || []) : [];

  return (
    <div className="px-4 pt-12 pb-4">
      <h1 className="mb-4 text-lg font-bold text-foreground">Skill Roadmaps</h1>

      {/* Role Selector */}
      <div className="relative mb-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex w-full items-center justify-between rounded-lg border bg-background px-4 py-3 text-sm"
        >
          <span className={selectedRole ? "font-medium text-foreground" : "text-muted-foreground"}>
            {selectedRole || "Select a role"}
          </span>
          <ChevronDown size={16} className="text-muted-foreground" />
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-lg border bg-background shadow-sm">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => { setSelectedRole(role); setDropdownOpen(false); setExpandedNode(null); }}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {role}
              </button>
            ))}
          </div>
        )}
      </div>

      {!selectedRole ? (
        <EmptyState
          icon={Map}
          title="Choose a role"
          description="Select a career path above to see the skill roadmap"
        />
      ) : (
        <div className="relative">
          {nodes.map((node, index) => {
            const config = statusConfig[node.status];
            const StatusIcon = config.icon;
            const isExpanded = expandedNode === node.id;
            const isLast = index === nodes.length - 1;

            return (
              <div key={node.id} className="relative flex gap-4">
                {/* Vertical line */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                    <StatusIcon size={16} className={config.color} />
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-border" />}
                </div>

                {/* Content */}
                <div className={`mb-4 flex-1 ${isLast ? "" : "pb-2"}`}>
                  <button
                    onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{node.skill}</span>
                      <span className={`text-[10px] font-medium ${config.color}`}>{config.label}</span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 animate-slide-up space-y-3">
                      <div className="rounded-lg border p-3">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resources</h4>
                        <div className="space-y-2">
                          {node.resources.map((r) => (
                            <a
                              key={r.title}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <ExternalLink size={12} />
                              {r.title}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                          <ThumbsUp size={12} />
                          {node.upvotes} upvotes
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                          <Plus size={12} />
                          Suggest resource
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
