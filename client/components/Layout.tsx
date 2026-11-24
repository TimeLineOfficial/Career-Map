import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDataStore } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
import StudentAccountModal from "./StudentAccountModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Moon,
  Sun,
  Globe,
  MapPin,
  Briefcase,
  User,
  Building,
  Scale,
  Lock,
  BookOpen,
} from "lucide-react";
import EnhancedNavigation from "./EnhancedNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const getLanguageData = () => [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
];

export default function Layout({ children }: LayoutProps) {
  const {
    careerMapData,
    currentLanguage,
    darkMode,
    setLanguage,
    toggleDarkMode,
    getText,
  } = useDataStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleOpenAccount = () => setIsAccountOpen(true);
    window.addEventListener("open-student-account-modal", handleOpenAccount);
    return () => window.removeEventListener("open-student-account-modal", handleOpenAccount);
  }, []);

  const languages = getLanguageData();
  const selectedLanguage =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  // Site title and tagline from data with localized fallback
  const siteTitle = careerMapData?.site?.name || "CareerMap";
  const siteTagline = getText("site_tagline");

  const navItems = [
    {
      label: getText("nav_institutes") || "Schools & Colleges",
      href: "/institutes",
      icon: Building,
      description: getText("nav_institutes_desc"),
    },
    {
      label: getText("nav_compare") || "Compare",
      href: "/compare",
      icon: Scale,
      description: getText("nav_compare_desc"),
    },
    {
      label: getText("nav_career_map") || "Career Map",
      href: "/career-map",
      icon: MapPin,
      description: getText("nav_career_map_desc"),
    },
    {
      label: "Community Blogs",
      href: "/blogs",
      icon: BookOpen,
      description: "Student articles, reviews, and admissions guides",
    },
    {
      label: "Career Guides",
      href: "/jobs/by-goal",
      icon: Briefcase,
      description: "Pathways & options by goal & interest",
    },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={`${
              mobile
                ? "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-accent"
                : "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent/10"
            } ${
              isActive
                ? "bg-career-primary text-white"
                : mobile
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => mobile && setIsMenuOpen(false)}
          >
            <item.icon className={mobile ? "h-5 w-5" : "h-4 w-4"} />
            <div className={mobile ? "flex flex-col" : ""}>
              <span>{item.label}</span>
              {mobile && (
                <span className="text-xs opacity-70">{item.description}</span>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-h-screen bg-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo (Clean map design with no top dot) */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground tracking-tight">
                {siteTitle}
              </span>
              <span className="text-xs text-muted-foreground leading-none">
                {siteTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <EnhancedNavigation />

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-base">{selectedLanguage.flag}</span>
                  <span className="hidden lg:inline text-xs font-medium">
                    {selectedLanguage.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="gap-2 cursor-pointer text-xs"
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="gap-2"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="hidden lg:inline text-xs">
                {darkMode ? getText("nav_light") : getText("nav_dark")}
              </span>
            </Button>

            {/* Student Account Button (Interactive Modal) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAccountOpen(true)}
              className="gap-2 text-xs border-blue-500/30 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/40"
            >
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">{getText("nav_account")}</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      CareerMap
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <NavLinks mobile />
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {/* Mobile Language Selector */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3"
                        >
                          <Globe className="h-5 w-5" />
                          <span className="text-lg">
                            {selectedLanguage.flag}
                          </span>
                          <span>{selectedLanguage.name}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        {languages.map((lang) => (
                          <DropdownMenuItem
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className="gap-2 cursor-pointer"
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Dark Mode Toggle */}
                    <Button
                      variant="ghost"
                      onClick={toggleDarkMode}
                      className="w-full justify-start gap-3"
                    >
                      {darkMode ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                      {darkMode ? getText("nav_light") : getText("nav_dark")}
                    </Button>

                    {/* Mobile User Account */}
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsAccountOpen(true);
                      }}
                      className="w-full justify-start gap-3"
                    >
                      <User className="h-5 w-5" />
                      {getText("nav_account")}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Student Account Modal */}
      <StudentAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t bg-muted/10">
        <div className="container py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold">CareerMap</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your Complete Career Roadmap. Connecting students with verified placement data and authentic campus audits.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Schools & Colleges</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/institutes" className="hover:text-foreground">
                    Institutes Directory
                  </Link>
                </li>
                <li>
                  <Link to="/compare" className="hover:text-foreground">
                    Side-by-Side Comparison
                  </Link>
                </li>
                <li>
                  <Link to="/institutes" className="hover:text-foreground">
                    Board Guidance (UP/CBSE/ICSE)
                  </Link>
                </li>
                <li>
                  <Link to="/institutes" className="hover:text-foreground">
                    Corporate Verified Placements
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Career Pathways</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/jobs/by-goal" className="hover:text-foreground">
                    By Career Goal
                  </Link>
                </li>
                <li>
                  <Link to="/jobs/by-interest" className="hover:text-foreground">
                    By Subject & Interest
                  </Link>
                </li>
                <li>
                  <Link to="/career-map" className="hover:text-foreground">
                    Interactive Career Map
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Verification & Audits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/institutes" className="hover:text-foreground">
                    Request Placement Verification
                  </Link>
                </li>
                <li>
                  <Link to="/institutes" className="hover:text-foreground">
                    Book On-Site Campus Audit
                  </Link>
                </li>
                <li>
                  <a href="mailto:career.mapofficials@gmail.com" className="hover:text-foreground">
                    Official Support Desk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>
              © 2024-2026 CareerMap. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms of Service
              </a>
              <a href="mailto:career.mapofficials@gmail.com" className="hover:text-foreground">
                Contact: career.mapofficials@gmail.com
              </a>
              {/* Discreet Admin Login Link in Footer */}
              <Link to="/admin" className="hover:text-blue-500 inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <Lock className="h-3 w-3" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
