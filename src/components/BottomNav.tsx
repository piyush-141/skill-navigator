import { Home, Briefcase, Map, Building2, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "internships", label: "Internships", icon: Briefcase },
  { id: "roadmaps", label: "Roadmaps", icon: Map },
  { id: "companies", label: "Companies", icon: Building2 },
  { id: "profile", label: "Profile", icon: User },
] as const;

export type TabId = (typeof tabs)[number]["id"];

interface BottomNavProps {
  active: TabId;
  onNavigate: (tab: TabId) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] font-medium transition-colors",
              active === id
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon size={20} strokeWidth={active === id ? 2.2 : 1.8} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
