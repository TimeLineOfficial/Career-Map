import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { toast as sonnerToast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeCareerMapData } from "@/lib/data-service";
import { initializePerformanceOptimizations } from "@/lib/performance-utils";
import Layout from "@/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";

const HomePage = lazy(() => import("@/HomePage"));
const JobsLanding = lazy(() => import("@/pages/JobsLanding"));
const CareerByGoal = lazy(() => import("@/pages/CareerByGoal"));
const CareerByInterest = lazy(() => import("@/pages/CareerByInterest"));
const LatestVacancies = lazy(() => import("@/pages/LatestVacancies"));
const LatestJobs = lazy(() => import("@/pages/LatestJobs"));
const BusinessLanding = lazy(() => import("@/pages/BusinessLanding"));
const BusinessIdeas = lazy(() => import("@/pages/BusinessIdeas"));
const BusinessDocumentation = lazy(() => import("@/pages/BusinessDocumentation"));
const ROICalculator = lazy(() => import("@/pages/ROICalculator"));
const InteractiveMap = lazy(() => import("@/InteractiveMap"));
const PlaceholderPage = lazy(() => import("@/pages/PlaceholderPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="skeleton h-12 w-48 mx-auto"></div>
        <div className="skeleton h-6 w-64 mx-auto"></div>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initializeCareerMapData();
    initializePerformanceOptimizations();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        sonnerToast("Notifications", {
          description: "Press Alt+T any time to show a test notification.",
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/jobs" element={<JobsLanding />} />
                  <Route path="/jobs/by-goal" element={<CareerByGoal />} />
                  <Route path="/jobs/by-interest" element={<CareerByInterest />} />
                  <Route path="/jobs/vacancies" element={<LatestVacancies />} />
                  <Route path="/latest-jobs" element={<LatestJobs />} />
                  <Route path="/jobs/latest" element={<LatestJobs />} />
                  
                  <Route path="/business" element={<BusinessLanding />} />
                  <Route path="/business/ideas" element={<BusinessIdeas />} />
                  <Route path="/business/documentation" element={<BusinessDocumentation />} />
                  <Route path="/business/calculator" element={<ROICalculator />} />
                  <Route
                    path="/business/guidance"
                    element={
                      <PlaceholderPage
                        title="Business Guidance"
                        description="Complete business guidance and tutorials. Coming soon!"
                      />
                    }
                  />
                  <Route
                    path="/business/documents"
                    element={
                      <PlaceholderPage
                        title="Business Documents"
                        description="Downloadable business templates and guides. Coming soon!"
                      />
                    }
                  />
                  <Route
                    path="/business/funding"
                    element={
                      <PlaceholderPage
                        title="Business Funding"
                        description="Funding options and investment opportunities. Coming soon!"
                      />
                    }
                  />
                  
                  <Route path="/career-map" element={<InteractiveMap />} />
                  <Route path="/vacancies" element={<LatestVacancies />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
