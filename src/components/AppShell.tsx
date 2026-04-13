import { useState } from "react";
import { BottomNav, type TabId } from "./BottomNav";
import { HomeScreen } from "@/pages/HomeScreen";
import { InternshipsScreen } from "@/pages/InternshipsScreen";
import { RoadmapsScreen } from "@/pages/RoadmapsScreen";
import { CompaniesScreen } from "@/pages/CompaniesScreen";
import { ProfileScreen } from "@/pages/ProfileScreen";
import { ProjectsScreen } from "@/pages/ProjectsScreen";
import { ResumeBuilderScreen } from "@/pages/ResumeBuilderScreen";

type SubScreen = "projects" | "resume" | null;

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [subScreen, setSubScreen] = useState<SubScreen>(null);

  const navigate = (tab: TabId) => {
    setActiveTab(tab);
    setSubScreen(null);
  };

  const renderScreen = () => {
    if (subScreen === "projects") {
      return <ProjectsScreen onBack={() => setSubScreen(null)} />;
    }
    if (subScreen === "resume") {
      return <ResumeBuilderScreen onBack={() => setSubScreen(null)} />;
    }

    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={navigate} onSubScreen={setSubScreen} />;
      case "internships":
        return <InternshipsScreen />;
      case "roadmaps":
        return <RoadmapsScreen />;
      case "companies":
        return <CompaniesScreen />;
      case "profile":
        return <ProfileScreen />;
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      <main className="pb-20">{renderScreen()}</main>
      <BottomNav active={activeTab} onNavigate={navigate} />
    </div>
  );
}
