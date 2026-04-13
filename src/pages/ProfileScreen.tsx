import { useState } from "react";
import { Bookmark, Briefcase, FolderOpen, Map, Settings, ChevronRight, TrendingUp } from "lucide-react";

const user = {
  name: "Aarav Sharma",
  email: "aarav@university.edu",
  joined: "Dec 2025",
};

const savedInternships = [
  { title: "Frontend Developer Intern", company: "Razorpay" },
  { title: "Data Science Intern", company: "Flipkart" },
];

const roadmapProgress = [
  { role: "Frontend Developer", progress: 50 },
  { role: "Backend Developer", progress: 25 },
];

const savedProjects = [
  { title: "E-commerce REST API", stack: "Node.js, Express, MongoDB" },
];

const activities = [
  { text: "Viewed Frontend Developer Intern at Razorpay", time: "2h ago" },
  { text: "Completed JavaScript Fundamentals node", time: "1d ago" },
  { text: "Saved E-commerce REST API project", time: "2d ago" },
];

export function ProfileScreen() {
  return (
    <div className="px-4 pt-12 pb-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground">{user.name}</h1>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <button className="rounded-lg p-2 hover:bg-secondary transition-colors">
          <Settings size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-2">
        {[
          { label: "Saved", value: savedInternships.length, icon: Bookmark },
          { label: "Roadmaps", value: roadmapProgress.length, icon: Map },
          { label: "Projects", value: savedProjects.length, icon: FolderOpen },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center rounded-lg border py-3">
            <stat.icon size={16} className="mb-1 text-primary" />
            <span className="text-lg font-bold text-foreground">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Saved Internships */}
      <section className="mb-5">
        <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Briefcase size={12} /> Saved Internships
        </h2>
        <div className="space-y-1.5">
          {savedInternships.map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.company}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap Progress */}
      <section className="mb-5">
        <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <TrendingUp size={12} /> Roadmap Progress
        </h2>
        <div className="space-y-3">
          {roadmapProgress.map((item) => (
            <div key={item.role} className="rounded-lg border px-3 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.role}</span>
                <span className="text-xs text-muted-foreground">{item.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent Activity</h2>
        <div className="space-y-2">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start justify-between py-1.5">
              <p className="text-sm text-muted-foreground leading-snug">{a.text}</p>
              <span className="shrink-0 ml-3 text-[10px] text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
