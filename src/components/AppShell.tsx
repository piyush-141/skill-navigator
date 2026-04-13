import { useState } from "react";
import { BottomNav, type TabId } from "./BottomNav";
import { HomeScreen } from "@/pages/HomeScreen";
import { InternshipsScreen } from "@/pages/InternshipsScreen";
import { RoadmapsScreen } from "@/pages/RoadmapsScreen";
import { CompaniesScreen } from "@/pages/CompaniesScreen";
import { ProfileScreen } from "@/pages/ProfileScreen";

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={setActiveTab} />;
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
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
}
