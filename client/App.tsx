import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeCareerMapData } from "@/lib/data-service";
import { initializePerformanceOptimizations } from "@/lib/performance-utils";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import JobsLanding from "./pages/JobsLanding";
import CareerByGoal from "./pages/CareerByGoal";
import CareerByInterest from "./pages/CareerByInterest";
import InteractiveCareerMap from "./pages/InteractiveCareerMap";
import AdminDashboard from "./pages/AdminDashboard";
import InstitutesDirectory from "./pages/InstitutesDirectory";
import InstituteCompare from "./pages/InstituteCompare";

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
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/institutes" element={<InstitutesDirectory />} />
              <Route path="/schools" element={<InstitutesDirectory />} />
              <Route path="/colleges" element={<InstitutesDirectory />} />
              <Route path="/compare" element={<InstituteCompare />} />
              <Route path="/jobs" element={<JobsLanding />} />

              {/* Career paths sub-routes */}
              <Route path="/jobs/by-goal" element={<CareerByGoal />} />
              <Route path="/jobs/by-interest" element={<CareerByInterest />} />
              <Route path="/latest-jobs" element={<Navigate to="/jobs" replace />} />
              <Route path="/career-map" element={<InteractiveCareerMap />} />

              {/* Clean redirects for removed business and vacancies routes */}
              <Route path="/business/*" element={<Navigate to="/institutes" replace />} />
              <Route path="/business" element={<Navigate to="/institutes" replace />} />
              <Route path="/vacancies/*" element={<Navigate to="/jobs" replace />} />
              <Route path="/vacancies" element={<Navigate to="/jobs" replace />} />
              <Route path="/jobs/vacancies" element={<Navigate to="/jobs" replace />} />

              {/* Admin route */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
