import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Briefcase,
  MapPin,
  GraduationCap,
  Building,
  Scale,
  Target,
  Heart,
  Compass,
  BookOpen,
} from "lucide-react";
import { useDataStore } from "@/lib/data-service";

export default function EnhancedNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const { getText } = useDataStore();

  const navigationItems = [
    {
      id: "institutes",
      label: getText("nav_institutes") || "Schools & Colleges",
      icon: GraduationCap,
      href: "/institutes",
      subItems: [
        {
          label: "Institutes Directory",
          href: "/institutes",
          description: "Search 500+ schools and colleges with verified placement data",
        },
        {
          label: "Side-by-Side Compare",
          href: "/compare",
          description: "Compare pros, cons, packages & ratings between colleges",
        },
        {
          label: "Class 8-10th Board Guidance",
          href: "/institutes",
          description: "Explore top schools across UP Board, CBSE, and ICSE",
        },
        {
          label: "Corporate Verified Placements",
          href: "/institutes",
          description: "Placement records confirmed directly by recruiting companies",
        },
      ],
    },
    {
      id: "compare",
      label: getText("nav_compare") || "Compare",
      icon: Scale,
      href: "/compare",
      subItems: [],
    },
    {
      id: "career-map",
      label: getText("nav_career_map") || "Interactive Career Map",
      icon: MapPin,
      href: "/career-map",
      subItems: [],
    },
    {
      id: "blogs",
      label: "Community Blogs",
      icon: BookOpen,
      href: "/blogs",
      subItems: [
        {
          label: "All Community Articles",
          href: "/blogs",
          description: "Guides on courses, college audits, hostels, and careers",
        },
        {
          label: "Write an Article",
          href: "/blogs",
          description: "Share your college experience and tips with other students",
        },
      ],
    },
    {
      id: "career-guides",
      label: "Career Guides",
      icon: Compass,
      href: "/jobs/by-goal",
      subItems: [
        {
          label: "By Career Goal",
          href: "/jobs/by-goal",
          description: "Step-by-step roadmap from school to your dream job",
        },
        {
          label: "By Subject & Interest",
          href: "/jobs/by-interest",
          description: "Discover careers matching Indian subjects & passions",
        },
      ],
    },
  ];

  const handleMouseEnter = (itemId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 280); // Smooth 280ms grace period so cursor never loses menu
  };

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navigationItems.map((item) => {
        const isActive = location.pathname.startsWith(item.href);
        const hasDropdown = item.subItems && item.subItems.length > 0;

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={item.href}
              className={`
                flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold
                transition-all duration-200 hover:bg-accent/15
                ${
                  isActive
                    ? "bg-career-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {hasDropdown && (
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 opacity-70 ${
                    activeDropdown === item.id ? "rotate-180" : ""
                  }`}
                />
              )}
            </Link>

            {/* Dropdown Menu with zero-gap hover bridge */}
            {hasDropdown && activeDropdown === item.id && (
              <div
                className="absolute top-full left-0 pt-1.5 w-80 z-[100]"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="bg-popover text-popover-foreground rounded-xl shadow-xl border border-border p-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  {item.subItems?.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.href}
                      className="block px-3 py-2.5 rounded-lg hover:bg-accent/60 transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-semibold text-xs text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {subItem.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                        {subItem.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
