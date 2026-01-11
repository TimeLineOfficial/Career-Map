import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Briefcase,
  Target,
  MapPin,
  Search,
  Building2,
} from "lucide-react";

export default function EnhancedNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navigationItems = [
    {
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
      href: "/jobs",
      subItems: [
        {
          label: "By Goal",
          href: "/jobs/by-goal",
          description: "Find careers based on your current education and goals",
        },
        {
          label: "By Interest",
          href: "/jobs/by-interest",
          description: "Discover careers matching your interests and passions",
        },
        {
          label: "Latest Vacancies",
          href: "/jobs/vacancies",
          description: "Browse current job openings and opportunities",
        },
        {
          label: "All Jobs",
          href: "/latest-jobs",
          description: "100+ verified government and private jobs",
        },
      ],
    },
    {
      id: "business",
      label: "Business",
      icon: Building2,
      href: "/business",
      subItems: [
        {
          label: "Business Ideas",
          href: "/business/ideas",
          description: "Profitable business opportunities with guides",
        },
        {
          label: "Startup Guide",
          href: "/business/guidance",
          description: "Complete business setup tutorials",
        },
        {
          label: "Documentation",
          href: "/business/documentation",
          description: "Legal docs and templates",
        },
        {
          label: "ROI Calculator",
          href: "/business/calculator",
          description: "Calculate business investment returns",
        },
      ],
    },
    {
      id: "career-map",
      label: "Career Map",
      icon: MapPin,
      href: "/career-map",
      subItems: [
        {
          label: "Interactive Map",
          href: "/career-map",
          description: "Visual career progression paths",
        },
        {
          label: "Career Guidance",
          href: "/jobs/by-goal",
          description: "Step-by-step career planning",
        },
        {
          label: "Skill Assessment",
          href: "/career-map#skills",
          description: "Evaluate your current skills",
        },
      ],
    },
    {
      id: "vacancies",
      label: "Vacancies",
      icon: Search,
      href: "/vacancies",
      subItems: [
        {
          label: "Government Jobs",
          href: "/latest-jobs?type=government",
          description: "50+ verified government positions",
        },
        {
          label: "Private Jobs",
          href: "/latest-jobs?type=private",
          description: "50+ private sector opportunities",
        },
        {
          label: "Form Guides",
          href: "/vacancies#guides",
          description: "Application form tutorials",
        },
      ],
    },
  ];

  const handleMouseEnter = (itemId: string) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleClick = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
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
              onClick={() => hasDropdown && handleClick(item.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
                transition-all duration-200 hover:bg-accent/10
                ${
                  isActive
                    ? "bg-career-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {hasDropdown && (
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${
                    activeDropdown === item.id ? "rotate-180" : ""
                  }`}
                />
              )}
            </Link>

            {/* Dropdown Menu */}
            {hasDropdown && activeDropdown === item.id && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[100]">
                <div className="p-2">
                  {item.subItems?.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.href}
                      className="block px-3 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium text-gray-900 dark:text-white group-hover:text-career-primary">
                        {subItem.label}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
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
