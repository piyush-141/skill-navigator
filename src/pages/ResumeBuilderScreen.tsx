import { useState } from "react";
import { ArrowLeft, ArrowRight, Download, User, GraduationCap, Briefcase, FolderOpen, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { id: "basic", label: "Basic Info", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Wrench },
] as const;

type StepId = (typeof steps)[number]["id"];

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: string;
  degree: string;
  year: string;
  company: string;
  role: string;
  duration: string;
  projectTitle: string;
  projectDesc: string;
  skills: string;
}

interface ResumeBuilderScreenProps {
  onBack: () => void;
}

export function ResumeBuilderScreen({ onBack }: ResumeBuilderScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [data, setData] = useState<ResumeData>({
    name: "", email: "", phone: "",
    education: "", degree: "", year: "",
    company: "", role: "", duration: "",
    projectTitle: "", projectDesc: "",
    skills: "",
  });

  const update = (field: keyof ResumeData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const step = steps[currentStep];

  const renderField = (label: string, field: keyof ResumeData, placeholder: string) => (
    <div className="mb-3">
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        value={data[field]}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );

  const renderStepContent = () => {
    switch (step.id) {
      case "basic":
        return <>{renderField("Full Name", "name", "Aarav Sharma")}{renderField("Email", "email", "aarav@email.com")}{renderField("Phone", "phone", "+91 98765 43210")}</>;
      case "education":
        return <>{renderField("Institution", "education", "IIT Delhi")}{renderField("Degree", "degree", "B.Tech CSE")}{renderField("Year", "year", "2024-2028")}</>;
      case "experience":
        return <>{renderField("Company", "company", "Razorpay")}{renderField("Role", "role", "SDE Intern")}{renderField("Duration", "duration", "May-Jul 2026")}</>;
      case "projects":
        return <>{renderField("Project Title", "projectTitle", "E-commerce API")}{renderField("Description", "projectDesc", "Built a REST API with...")}</>;
      case "skills":
        return renderField("Skills (comma-separated)", "skills", "React, Node.js, Python...");
    }
  };

  if (showPreview) {
    return (
      <div className="px-4 pt-12 pb-4 animate-slide-up">
        <button onClick={() => setShowPreview(false)} className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <ArrowLeft size={16} /> Edit
        </button>

        <div className="rounded-lg border bg-background p-6">
          <h1 className="mb-0.5 text-center text-lg font-bold text-foreground">{data.name || "Your Name"}</h1>
          <p className="mb-4 text-center text-xs text-muted-foreground">
            {[data.email, data.phone].filter(Boolean).join(" • ") || "email@example.com • +91 00000 00000"}
          </p>

          {(data.education || data.degree) && (
            <section className="mb-4">
              <h2 className="mb-1 border-b pb-1 text-xs font-bold uppercase tracking-wider text-foreground">Education</h2>
              <p className="text-xs text-foreground">{data.degree}{data.education ? ` — ${data.education}` : ""}</p>
              {data.year && <p className="text-[10px] text-muted-foreground">{data.year}</p>}
            </section>
          )}

          {(data.company || data.role) && (
            <section className="mb-4">
              <h2 className="mb-1 border-b pb-1 text-xs font-bold uppercase tracking-wider text-foreground">Experience</h2>
              <p className="text-xs text-foreground">{data.role}{data.company ? ` at ${data.company}` : ""}</p>
              {data.duration && <p className="text-[10px] text-muted-foreground">{data.duration}</p>}
            </section>
          )}

          {data.projectTitle && (
            <section className="mb-4">
              <h2 className="mb-1 border-b pb-1 text-xs font-bold uppercase tracking-wider text-foreground">Projects</h2>
              <p className="text-xs font-medium text-foreground">{data.projectTitle}</p>
              {data.projectDesc && <p className="text-[10px] text-muted-foreground">{data.projectDesc}</p>}
            </section>
          )}

          {data.skills && (
            <section>
              <h2 className="mb-1 border-b pb-1 text-xs font-bold uppercase tracking-wider text-foreground">Skills</h2>
              <p className="text-xs text-foreground">{data.skills}</p>
            </section>
          )}
        </div>

        <Button className="mt-4 w-full gap-2">
          <Download size={16} />
          Export PDF
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-12 pb-4">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft size={16} /> Back
      </button>
      <h1 className="mb-4 text-lg font-bold text-foreground">Resume Builder</h1>

      {/* Step indicator */}
      <div className="mb-6 flex gap-1">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= currentStep ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      <div className="mb-2 flex items-center gap-2">
        <step.icon size={16} className="text-primary" />
        <h2 className="text-sm font-semibold text-foreground">{step.label}</h2>
        <span className="ml-auto text-xs text-muted-foreground">{currentStep + 1}/{steps.length}</span>
      </div>

      <div className="mt-4">{renderStepContent()}</div>

      <div className="mt-6 flex gap-3">
        {currentStep > 0 && (
          <Button variant="outline" className="flex-1" onClick={() => setCurrentStep(currentStep - 1)}>
            Back
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button className="flex-1 gap-1" onClick={() => setCurrentStep(currentStep + 1)}>
            Next <ArrowRight size={14} />
          </Button>
        ) : (
          <Button className="flex-1" onClick={() => setShowPreview(true)}>
            Preview Resume
          </Button>
        )}
      </div>
    </div>
  );
}
