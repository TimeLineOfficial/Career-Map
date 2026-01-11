import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeCareerMapData } from "@/lib/data-service";
import { initializePerformanceOptimizations } from "@/lib/performance-utils";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import JobsLanding from "./pages/JobsLanding";
import PlaceholderPage from "./pages/PlaceholderPage";
import CareerByGoal from "./pages/CareerByGoal";
import CareerByInterest from "./pages/CareerByInterest";
import LatestVacancies from "./pages/LatestVacancies";
import LatestJobs from "./pages/LatestJobs";
import BusinessLanding from "./pages/BusinessLanding";
import BusinessIdeas from "./pages/BusinessIdeas";
import BusinessDocumentation from "./pages/BusinessDocumentation";
import ROICalculator from "./pages/ROICalculator";
import InteractiveCareerMap from "./pages/InteractiveCareerMap";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // Initialize CareerMap data on app startup
    initializeCareerMapData();

    // Initialize performance optimizations
    initializePerformanceOptimizations();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jobs" element={<JobsLanding />} />

              {/* Jobs sub-routes */}
              <Route path="/jobs/by-goal" element={<CareerByGoal />} />
              <Route path="/jobs/by-interest" element={<CareerByInterest />} />
              <Route path="/jobs/vacancies" element={<LatestVacancies />} />
              <Route path="/latest-jobs" element={<LatestJobs />} />

              {/* Business routes */}
              <Route path="/business" element={<BusinessLanding />} />
              <Route path="/business/ideas" element={<BusinessIdeas />} />
              <Route
                path="/business/documentation"
                element={<BusinessDocumentation />}
              />
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

              {/* Other routes */}
              <Route path="/career-map" element={<InteractiveCareerMap />} />
              <Route path="/vacancies" element={<LatestVacancies />} />

              {/* Admin route */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
