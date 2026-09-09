"use client";

import { useSectionFocus } from "@/context/SectionFocusContext";

interface NavItem {
  step: string;
  name: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { step: "01", name: "ABOUT", href: "#about", id: "about" },
  { step: "02", name: "PROJECTS", href: "#projects", id: "projects" },
  { step: "03", name: "SKILLS", href: "#skills", id: "skills" },
  { step: "04", name: "EXPERIENCE", href: "#experience", id: "experience" },
  { step: "05", name: "CONTACT", href: "#contact", id: "contact" },
];

export default function SidebarNav() {
  const { activeSection, setActiveSection } = useSectionFocus();

  return (
    <nav className="nav hidden lg:block" aria-label="In-page section navigation">
      <ul className="flex flex-col space-y-3">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`group flex items-center py-1.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400 opacity-100 filter-none"
                    : "text-zinc-500 dark:text-zinc-400 opacity-35 blur-[0.6px] hover:opacity-100 hover:blur-none hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {/* Horizontal Indicator Line */}
                <span
                  className={`mr-4 h-px transition-all duration-200 motion-reduce:transition-none ${
                    isActive
                      ? "w-16 bg-cyan-600 dark:bg-cyan-400 opacity-100"
                      : "w-8 bg-zinc-300 dark:bg-zinc-700 opacity-50 group-hover:w-16 group-hover:bg-zinc-700 dark:group-hover:bg-zinc-300 group-hover:opacity-100"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold transition-opacity ${
                      isActive
                        ? "text-cyan-600 dark:text-cyan-400 opacity-100"
                        : "opacity-40 group-hover:opacity-75"
                    }`}
                  >
                    {item.step}
                  </span>
                  <span className="opacity-30 select-none">{"//"}</span>
                  <span>{item.name}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

