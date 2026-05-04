"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldType = "text" | "email" | "url" | "tel" | "number" | "textarea" | "select" | "checkboxGroup";

interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  hint?: string;
}

interface SectionDef {
  id: string;
  title: string;
  description: string;
  fields: FieldDef[];
}

type KeychainValues = Record<string, string | string[]>;
const STORAGE_KEY = "jobchain-preplist-v1";

// ─── Schema ───────────────────────────────────────────────────────────────────

const SECTIONS: SectionDef[] = [
  {
    id: "profile",
    title: "Quick Profile",
    description: "The basics every application form asks for. Fill once, paste everywhere.",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Hans Turner" },
      { id: "headline", label: "Professional Headline", type: "text", required: true, placeholder: "AI Systems Operator & Product Designer", hint: "This goes in the top of your résumé and LinkedIn. One line." },
      { id: "email", label: "Email Address", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Phone Number", type: "tel", placeholder: "(843) 555-0100" },
      { id: "location", label: "City, State", type: "text", required: true, placeholder: "Charleston, SC" },
      { id: "linkedin", label: "LinkedIn URL", type: "url", placeholder: "https://linkedin.com/in/yourname" },
      { id: "portfolio", label: "Portfolio / Website URL", type: "url", placeholder: "https://yoursite.com" },
      { id: "github", label: "GitHub URL", type: "url", placeholder: "https://github.com/yourhandle" },
      { id: "workAuth", label: "Work Authorization", type: "select", required: true, options: ["US Citizen", "Permanent Resident (Green Card)", "H-1B Visa", "OPT / STEM OPT", "TN Visa", "Other / Requires sponsorship"] },
      { id: "salaryRange", label: "Salary Expectation", type: "text", required: true, placeholder: "$80,000 – $110,000", hint: "State a range. This goes directly into applications and salary requirement fields." },
      { id: "remotePreference", label: "Work Location Preference", type: "select", options: ["Remote only", "Hybrid preferred", "Onsite preferred", "Flexible — open to any"] },
      { id: "openToRelocation", label: "Open to Relocation?", type: "select", options: ["No", "Yes — anywhere", "Yes — specific markets only", "Open to discuss"] },
    ],
  },
  {
    id: "story",
    title: "Professional Story",
    description: "Your positioning copy. These answers get reused across cover letters and application fields.",
    fields: [
      {
        id: "tagline",
        label: "One-Line Value Statement",
        type: "text",
        required: true,
        placeholder: "I help small businesses move faster with practical AI systems that actually stick.",
        hint: "Not your job title — your value. What problem do you solve for an employer?",
      },
      {
        id: "shortBio",
        label: "Short Bio (2–3 sentences)",
        type: "textarea",
        required: true,
        placeholder: "I'm a product designer and AI systems operator with 10+ years building digital experiences for startups and operators. My focus now is implementing practical AI workflows that reduce friction and improve output without replacing people. I move fast, audit first, and leave behind maintainable systems.",
        hint: "This is the go-to block for cover letters, intro fields, and 'About you' boxes. Write it in third person or first — your call.",
      },
      {
        id: "elevatorPitch",
        label: "Elevator Pitch (60 seconds, verbal)",
        type: "textarea",
        placeholder: "I've spent 10 years designing and building digital products — websites, apps, automation systems. Most recently I've been focused on helping small businesses modernize using AI: not replacing people, but giving teams better tools and less busywork. I tend to plug into teams quickly, audit what's slowing things down, and build something that outlasts my engagement.",
        hint: "Write this the way you'd say it out loud. You'll draw from this for phone screens.",
      },
      {
        id: "whyLooking",
        label: "Why You're Looking (internal — don't share verbatim)",
        type: "textarea",
        placeholder: "My current contract is wrapping up in June and I'm looking for either a long-term role or a 3–6 month engagement where I can have real impact quickly.",
        hint: "Be honest here — this is for your own prep. You'll refine it into a polished answer below.",
      },
      {
        id: "notLooking",
        label: "What You're NOT Looking For",
        type: "textarea",
        placeholder: "No pure support roles, no companies rebuilding basic CRUD apps, no purely offshore-managed engagements.",
        hint: "Use this to quickly disqualify bad fits early in conversations.",
      },
    ],
  },
  {
    id: "experience",
    title: "Work History Highlights",
    description: "Your top two roles and biggest wins — formatted and ready to paste.",
    fields: [
      { id: "role1Title", label: "Most Recent Job Title", type: "text", required: true, placeholder: "Director of Digital Experience & AI Systems" },
      { id: "role1Company", label: "Company / Client", type: "text", required: true, placeholder: "Independent / Freelance" },
      { id: "role1Period", label: "Dates", type: "text", placeholder: "2020 – Present" },
      {
        id: "role1Bullets",
        label: "Key Bullets (one per line)",
        type: "textarea",
        required: true,
        placeholder: "• Implemented AI audit pipeline for 20+ client sites, reducing discovery time by 60%\n• Built WebsiteCreditScore — AI SaaS with full brand, product, and scan-to-strategy workflow\n• Designed and shipped 6 full-stack products across AI, fintech, and nonprofit sectors",
        hint: "Lead with impact. Numbers beat adjectives. Copy these directly into experience fields.",
      },
      { id: "role2Title", label: "Previous Job Title", type: "text", placeholder: "Graphic & Web Designer" },
      { id: "role2Company", label: "Company", type: "text", placeholder: "Q4Launch" },
      { id: "role2Period", label: "Dates", type: "text", placeholder: "2013 – 2020" },
      {
        id: "role2Bullets",
        label: "Key Bullets (one per line)",
        type: "textarea",
        placeholder: "• Sole designer for 180+ websites over 7 years during rapid company scaling\n• Delivered full-stack web experiences end-to-end under tight deadlines\n• Contributed to significant revenue growth through high-volume, high-quality output",
      },
      {
        id: "achievement1",
        label: "Top Career Achievement #1",
        type: "textarea",
        required: true,
        placeholder: "Designed and launched WebsiteCreditScore in under 3 months — an AI audit platform that scores websites across 6 dimensions using live data. First paying customers within 30 days of launch.",
        hint: "Specific and measurable. This is your proof point for 'tell me about a project you're proud of.'",
      },
      {
        id: "achievement2",
        label: "Top Career Achievement #2",
        type: "textarea",
        placeholder: "Led complete brand and digital experience redesign for MYOOS — a privacy-first agentic OS startup — including WebGL hero, product architecture, and investor pitch narrative.",
      },
    ],
  },
  {
    id: "skills",
    title: "Skills & Stack",
    description: "What you know and what you're targeting — used in résumé skills sections and ATS keyword matching.",
    fields: [
      {
        id: "hardSkills",
        label: "Technical / Hard Skills",
        type: "textarea",
        required: true,
        placeholder: "AI Workflow Automation, Systems Design, Product Strategy, UX/UI Design, Information Architecture, Rapid Prototyping, Conversion-focused UX, Human-in-the-loop AI",
        hint: "Comma-separated. Mirror the exact language used in job descriptions for ATS matching.",
      },
      {
        id: "tools",
        label: "Tools & Platforms",
        type: "textarea",
        placeholder: "Figma, FigJam, Next.js, React, TanStack, Tailwind CSS, Framer, Supabase, Stripe, n8n, HubSpot, Notion, Monday.com, Claude, ChatGPT",
      },
      {
        id: "softSkills",
        label: "Soft Skills / Working Style",
        type: "textarea",
        placeholder: "I work best with high autonomy and clear outcomes. I'm fast to orient in new contexts, direct in communication, and process-driven without being rigid. I prefer async-first teams.",
        hint: "Frame these as how you actually work, not a generic buzzword list.",
      },
      {
        id: "education",
        label: "Education",
        type: "text",
        placeholder: "BFA, Graphic Design — The Art Institutes of Atlanta",
      },
      {
        id: "certifications",
        label: "Certifications / Courses",
        type: "text",
        placeholder: "Google UX Design Certificate (2022), AWS Cloud Practitioner (2023)",
      },
      {
        id: "targetRoles",
        label: "Role Types You're Targeting",
        type: "checkboxGroup",
        options: [
          "Product Design / UX",
          "AI / Automation",
          "Product Management",
          "Operations / Systems",
          "Engineering / Full-stack",
          "Creative Direction",
          "Consulting / Fractional",
          "Startup / Founding team",
        ],
        hint: "Check all that apply. Use this to quickly scan whether a job listing is in scope.",
      },
    ],
  },
  {
    id: "answers",
    title: "Pre-Written Answers",
    description: "The gold. Thoughtful, polished responses to the questions every interview and application asks.",
    fields: [
      {
        id: "tellAboutYourself",
        label: '"Tell me about yourself"',
        type: "textarea",
        required: true,
        placeholder: "I've spent about 10 years designing and building digital products — starting in high-volume web design, then moving into product strategy and brand systems for startups. For the past few years I've focused specifically on AI integration: helping small businesses identify where they're leaking time and money, then building practical automation that actually sticks. I tend to move fast, get up to speed quickly in new environments, and I care a lot about leaving things better than I found them.",
        hint: "60–90 seconds out loud. First-person, conversational. This is your opener in every phone screen.",
      },
      {
        id: "whyLeaving",
        label: '"Why are you leaving / looking for something new?"',
        type: "textarea",
        required: true,
        placeholder: "My current engagement is wrapping up, and I'm actively looking for a role where I can go deeper — either a long-term position with a team that's genuinely trying to modernize, or a meaningful consulting engagement where I can have measurable impact quickly.",
        hint: "Stay positive. Redirect toward what you want, not what you're escaping.",
      },
      {
        id: "greatestStrength",
        label: '"What\'s your greatest strength?"',
        type: "textarea",
        required: true,
        placeholder: "I'm unusually good at getting oriented fast and identifying what actually matters. In most engagements, I can audit what's happening, spot the real bottleneck, and start building a fix — all within the first week. That speed-to-clarity is genuinely rare, and it tends to unlock a lot of value quickly.",
        hint: "Be specific. Back it up with context. Generic answers get skipped.",
      },
      {
        id: "weakness",
        label: '"What\'s your greatest weakness?"',
        type: "textarea",
        placeholder: "I sometimes move faster than the teams I work with are ready for. I've learned to slow down the communication even when the work can move quickly — to make sure everyone understands the direction before I'm three steps ahead of the conversation.",
        hint: "Be real, but frame it as something you're actively managing. Not a fatal flaw.",
      },
      {
        id: "fiveYears",
        label: '"Where do you see yourself in 5 years?"',
        type: "textarea",
        placeholder: "Running a small, focused team that does exactly this at scale — helping businesses navigate the AI transition without losing the human element. Whether that's inside a company or independently, I want to be known as someone who builds things that last.",
      },
      {
        id: "whyThisCompany",
        label: '"Why do you want to work here?" (template)',
        type: "textarea",
        placeholder: "What drew me to [COMPANY] is [SPECIFIC THING — mission, product, recent news]. I've been following your work on [RELEVANT AREA] and I think my background in [YOUR RELEVANT SKILL] maps directly to where you're headed. I'd want to contribute to [SPECIFIC TEAM OR INITIATIVE].",
        hint: "Replace [COMPANY], [SPECIFIC THING], and [RELEVANT AREA] for each application. Keep the template honest.",
      },
      {
        id: "challengeStory",
        label: "Challenge / STAR Story",
        type: "textarea",
        placeholder: "Situation: A client came to me mid-project — their previous designer had delivered a brand that didn't match the product's positioning at all. Task: Rebuild the visual identity and site in 3 weeks before their investor demo. Action: I ran a rapid audit, stripped the system to its core, and rebuilt from a clear brand principle. Result: The demo went well, they closed a $500K seed round within 60 days.",
        hint: "Situation → Task → Action → Result. This answers 'tell me about a challenge you overcame.'",
      },
      {
        id: "coverLetterTemplate",
        label: "Cover Letter Template",
        type: "textarea",
        placeholder: "Dear [HIRING MANAGER / Team],\n\nI'm applying for the [ROLE TITLE] role at [COMPANY]. My background is in [YOUR CORE AREA], and I've spent the past several years [SHORT VALUE STATEMENT].\n\nWhat draws me to [COMPANY] specifically is [SPECIFIC REASON — product, mission, growth stage]. I think my experience with [RELEVANT SKILL OR PROJECT] maps directly to what you're building.\n\nI move fast, communicate clearly, and leave behind work that holds up. I'd love to show you what that looks like in the context of your team.\n\nBest,\n[YOUR NAME]",
        hint: "Fill in the bracketed sections for each application. Keep it under 200 words.",
      },
      {
        id: "references",
        label: "References (name, company, relationship, contact)",
        type: "textarea",
        placeholder: "1. Jane Smith — MYOOS, Direct Manager, jane@myoos.com, (555) 000-0001\n2. Robert Caldwell — Q4Launch, VP of Operations, robert@q4launch.com, (555) 000-0002\n3. Maria Torres — Gaia Eco, Project Sponsor, maria@gaiaecodevelopments.com, (555) 000-0003",
        hint: "Have these ready before you need them. Ask permission before listing.",
      },
    ],
  },
];

const ALL_REQUIRED = SECTIONS.flatMap((s) => s.fields.filter((f) => f.required).map((f) => f.id));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isEmpty(val: string | string[] | undefined): boolean {
  if (!val) return true;
  if (Array.isArray(val)) return val.length === 0;
  return val.trim() === "";
}

function calcProgress(values: KeychainValues): number {
  const filled = ALL_REQUIRED.filter((id) => !isEmpty(values[id])).length;
  return Math.round((filled / ALL_REQUIRED.length) * 100);
}

function sectionProgress(section: SectionDef, values: KeychainValues) {
  const required = section.fields.filter((f) => f.required);
  if (required.length === 0) return 100;
  const filled = required.filter((f) => !isEmpty(values[f.id])).length;
  return Math.round((filled / required.length) * 100);
}

function missingRequiredCount(section: SectionDef, values: KeychainValues) {
  return section.fields.filter((f) => f.required && isEmpty(values[f.id])).length;
}

// ─── Field ───────────────────────────────────────────────────────────────────

function Field({ def, value, onChange }: {
  def: FieldDef;
  value: string | string[];
  onChange: (id: string, val: string | string[]) => void;
}) {
  const strVal = Array.isArray(value) ? "" : (value ?? "");
  const arrVal = Array.isArray(value) ? value : [];
  const missing = def.required && isEmpty(value);

  const base =
    "w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors font-light";
  const colors = `bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)]`;
  const border = missing
    ? "border-[var(--blue)]/40 focus:border-[var(--blue)] focus:ring-[var(--blue)]/20"
    : "border-[var(--card-border)] focus:border-[var(--blue)] focus:ring-[var(--blue)]/15";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <label htmlFor={def.id} className="block text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {def.label}
          {def.required && <span className="ml-1 text-[10px]" style={{ color: "var(--blue)" }} aria-label="required">*</span>}
        </label>
        {missing && (
          <span className="text-[10px] font-bold eyebrow flex-shrink-0" style={{ color: "var(--blue)" }}>
            Needs input
          </span>
        )}
      </div>

      {def.type === "textarea" ? (
        <textarea
          id={def.id}
          value={strVal}
          onChange={(e) => onChange(def.id, e.target.value)}
          placeholder={def.placeholder}
          rows={4}
          className={`${base} ${colors} ${border} resize-y`}
        />
      ) : def.type === "select" ? (
        <select
          id={def.id}
          value={strVal}
          onChange={(e) => onChange(def.id, e.target.value)}
          className={`${base} ${colors} ${border}`}
        >
          <option value="">Select…</option>
          {def.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : def.type === "checkboxGroup" ? (
        <div className="space-y-2 pt-1">
          {def.options?.map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 text-sm font-light cursor-pointer" style={{ color: "var(--foreground)" }}>
              <input
                type="checkbox"
                className="w-4 h-4 rounded"
                style={{ accentColor: "var(--blue)" }}
                checked={arrVal.includes(opt)}
                onChange={(e) => {
                  const next = e.target.checked ? [...arrVal, opt] : arrVal.filter((v) => v !== opt);
                  onChange(def.id, next);
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      ) : (
        <input
          id={def.id}
          type={def.type}
          value={strVal}
          onChange={(e) => onChange(def.id, e.target.value)}
          placeholder={def.placeholder}
          className={`${base} ${colors} ${border}`}
        />
      )}

      {def.hint && (
        <p className="mt-1.5 text-xs font-light leading-relaxed" style={{ color: "var(--muted)" }}>{def.hint}</p>
      )}
    </div>
  );
}

// ─── Accordion section ────────────────────────────────────────────────────────

function AccordionSection({ section, isOpen, onToggle, values, onChange }: {
  section: SectionDef;
  isOpen: boolean;
  onToggle: () => void;
  values: KeychainValues;
  onChange: (id: string, val: string | string[]) => void;
}) {
  const pct = sectionProgress(section, values);
  const missing = missingRequiredCount(section, values);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left transition-colors hover:opacity-90"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors"
            style={{
              background: pct === 100 ? "var(--blue)" : pct > 0 ? "var(--blue-tint)" : "var(--muted-bg)",
              color: pct === 100 ? "white" : pct > 0 ? "var(--blue)" : "var(--muted)",
            }}
          >
            {pct === 100 ? "✓" : `${pct}%`}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{section.title}</div>
            <div className="text-xs font-light mt-0.5 hidden sm:block" style={{ color: "var(--muted)" }}>{section.description}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
          {missing > 0 && !isOpen && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full eyebrow hidden sm:block"
              style={{ color: "var(--blue)", background: "var(--blue-tint)" }}
            >
              {missing} needed
            </span>
          )}
          <svg
            className={`w-4 h-4 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}
            style={{ color: "var(--muted)" }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div className="px-5 sm:px-6 pb-6 pt-3 space-y-5" style={{ borderTop: "1px solid var(--card-border)" }}>
            {section.fields.map((field) => (
              <Field
                key={field.id}
                def={field}
                value={values[field.id] ?? (field.type === "checkboxGroup" ? [] : "")}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Progress ring ────────────────────────────────────────────────────────────

function ProgressRing({ pct }: { pct: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden className="flex-shrink-0">
      <circle cx="22" cy="22" r={r} fill="none" stroke="var(--card-border)" strokeWidth="3.5" />
      <circle
        cx="22" cy="22" r={r} fill="none"
        stroke="var(--blue)" strokeWidth="3.5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
        style={{ transition: "stroke-dasharray 0.4s ease" }}
      />
      <text x="22" y="26" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--foreground)" fontFamily="var(--font-inter)">
        {pct}%
      </text>
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PreplistForm() {
  const [values, setValues] = useState<KeychainValues>({});
  const [openSection, setOpenSection] = useState<string>("profile");
  const [saveState, setSaveState] = useState<"idle" | "saved" | "imported">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValues(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const persistSave = useCallback((vals: KeychainValues) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(vals));
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2000);
      } catch { /* quota */ }
    }, 600);
  }, []);

  const handleChange = (id: string, val: string | string[]) => {
    setValues((prev) => {
      const next = { ...prev, [id]: val };
      persistSave(next);
      return next;
    });
  };

  const handleExport = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      name: (values["fullName"] as string) || "My Keychain",
      keychain: values,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jobchain-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        const keychain = parsed.keychain ?? parsed;
        setValues(keychain);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(keychain));
        setSaveState("imported");
        setTimeout(() => setSaveState("idle"), 3000);
      } catch {
        alert("Could not read that file. Make sure it's a JobChain export.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => {
    if (!confirm("Clear all keychain data? This cannot be undone.")) return;
    setValues({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const progress = calcProgress(values);
  const totalMissing = ALL_REQUIRED.filter((id) => isEmpty(values[id])).length;
  const statusText = saveState === "saved" ? "Saved ✓" : saveState === "imported" ? "Imported!" : "Auto-saves locally";

  return (
    <div>
      {/* Sticky progress bar */}
      <div
        className="sticky top-[4.5rem] z-20 border-b backdrop-blur-xl"
        style={{ background: "color-mix(in srgb, var(--background) 95%, transparent)", borderColor: "var(--card-border)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <ProgressRing pct={progress} />
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>
                  {progress === 100 ? "Keychain complete — ready to apply!" : `${totalMissing} required field${totalMissing === 1 ? "" : "s"} remaining`}
                </div>
                <div className="text-xs font-light" style={{ color: "var(--muted)" }}>{statusText}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-3 h-8 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap"
                style={{ borderColor: "var(--card-border)", color: "var(--muted-strong)" }}
              >
                Import
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center px-3 h-8 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ background: "var(--blue)" }}
              >
                Export
              </button>
              <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleFileChange} />
            </div>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "var(--card-border)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "var(--blue)" }}
            />
          </div>
        </div>
      </div>

      {/* Form body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <p className="text-[10px] font-bold eyebrow text-right mb-4" style={{ color: "var(--muted)" }}>
          80% = ready to apply to most roles
        </p>

        <div className="space-y-2.5">
          {SECTIONS.map((section) => (
            <AccordionSection
              key={section.id}
              section={section}
              isOpen={openSection === section.id}
              onToggle={() => setOpenSection((prev) => prev === section.id ? "" : section.id)}
              values={values}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-8 p-6 sm:p-8 rounded-xl relative overflow-hidden"
          style={{ background: "var(--ink)" }}
        >
          <div className="relative z-10">
            {progress >= 80 ? (
              <>
                <p className="eyebrow mb-2" style={{ color: "var(--blue-light)" }}>Your keychain is ready</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                  Time to start applying.
                </h3>
                <p className="text-base mb-5 font-light max-w-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Your keychain has everything you need. Export it as a backup, then start copy-pasting
                  your way through applications — fast.
                </p>
              </>
            ) : (
              <>
                <p className="eyebrow mb-2" style={{ color: "var(--blue-light)" }}>{progress}% complete</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                  Every field you fill saves you time on every application.
                </h3>
                <p className="text-base mb-5 font-light max-w-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
                  The more complete your keychain, the faster you move. Keep going — you&rsquo;re building
                  something that pays dividends with every application you submit.
                </p>
              </>
            )}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center px-6 h-11 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--blue)" }}
              >
                Export Keychain
              </button>
              <a
                href="https://hansturner.com/contact"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-6 h-11 rounded-full text-sm font-semibold transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)" }}
              >
                Work with Hans →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-light transition-colors hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            Clear all data
          </button>
        </div>
      </div>
    </div>
  );
}
