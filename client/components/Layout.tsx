import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDataStore } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
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
  Target,
  Search,
  Bookmark,
  User,
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
  const location = useLocation();

  const languages = getLanguageData();
  const selectedLanguage =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  // Site title and tagline from data
  const siteTitle = careerMapData?.site.name || "CareerMap";
  const siteTagline =
    careerMapData?.site.tagline || "Your Complete Career & Business Roadmap";

  const navItems = [
    {
      label: "Jobs",
      href: "/jobs",
      icon: Briefcase,
      description: "Find your perfect career path",
    },
    {
      label: "Business",
      href: "/business",
      icon: Target,
      description: "Start your entrepreneurial journey",
    },
    {
      label: "Career Map",
      href: "/career-map",
      icon: MapPin,
      description: "Interactive career planning",
    },
    {
      label: "Vacancies",
      href: "/vacancies",
      icon: Search,
      description: "Latest job openings",
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
                ? mobile
                  ? "bg-career-primary text-white"
                  : "bg-career-primary text-white"
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-career-primary to-career-secondary flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-career-accent"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
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
                  <span className="text-lg">{selectedLanguage.flag}</span>
                  <span className="hidden lg:inline">
                    {selectedLanguage.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
              <span className="hidden lg:inline">
                {darkMode ? "Light" : "Dark"}
              </span>
            </Button>

            {/* User Account */}
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">Account</span>
            </Button>

            {/* Bookmarks */}
            <Button variant="ghost" size="sm" className="gap-2">
              <Bookmark className="h-4 w-4" />
              <span className="hidden lg:inline">Saved</span>
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
                      <div className="relative">
                        <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-career-primary to-career-secondary flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-career-accent"></div>
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
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </Button>

                    {/* Mobile User Account */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3"
                    >
                      <User className="h-5 w-5" />
                      Account
                    </Button>

                    {/* Mobile Bookmarks */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3"
                    >
                      <Bookmark className="h-5 w-5" />
                      Saved Items
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

      {/* Footer */}
      <footer className="border-t bg-muted/10">
        <div className="container py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-career-primary to-career-secondary flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-career-accent"></div>
                </div>
                <span className="font-bold">CareerMap</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your Complete Career & Business Roadmap. Navigate your
                professional journey with confidence.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Career Guidance</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/jobs/by-goal" className="hover:text-foreground">
                    By Goal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs/by-interest"
                    className="hover:text-foreground"
                  >
                    By Interest
                  </Link>
                </li>
                <li>
                  <Link to="/vacancies" className="hover:text-foreground">
                    Latest Vacancies
                  </Link>
                </li>
                <li>
                  <Link to="/career-map" className="hover:text-foreground">
                    Interactive Map
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Business</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/business" className="hover:text-foreground">
                    Business Ideas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/guidance"
                    className="hover:text-foreground"
                  >
                    Start-up Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/documents"
                    className="hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/funding"
                    className="hover:text-foreground"
                  >
                    Funding Options
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Premium Notes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    AI Assistant
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 CareerMap.com. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
