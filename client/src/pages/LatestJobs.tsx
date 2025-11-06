import React, { useState, useEffect } from "react";
import { useDataStore } from "../lib/data-service";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  Building2,
  Clock,
  FileText,
  Users,
  Play,
  BookOpen,
  Zap,
} from "lucide-react";
import { JobPosting } from "../lib/job-dataset";

export default function LatestJobs() {
  const { getLatestJobs, searchJobs, autoFetchJobs, getText, currentLanguage } =
    useDataStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<
    "all" | "government" | "private"
  >("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [isAutoFetching, setIsAutoFetching] = useState(false);

  const allJobs = getLatestJobs();
  const governmentJobs = getLatestJobs("government");
  const privateJobs = getLatestJobs("private");

  // Get unique sectors
  const sectors = [
    "all",
    ...Array.from(new Set(allJobs.map((job) => job.sector))),
  ];

  useEffect(() => {
    let jobs = allJobs;

    // Filter by type
    if (selectedType !== "all") {
      jobs = getLatestJobs(selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      jobs = searchJobs(searchQuery).filter(
        (job) => selectedType === "all" || job.type === selectedType,
      );
    }

    // Filter by sector
    if (selectedSector !== "all") {
      jobs = jobs.filter((job) => job.sector === selectedSector);
    }

    setFilteredJobs(jobs);
  }, [searchQuery, selectedType, selectedSector, allJobs]);

  const handleAutoFetch = async () => {
    setIsAutoFetching(true);
    await autoFetchJobs();
    setIsAutoFetching(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Last day";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const JobCard = ({
    job,
    onClick,
  }: {
    job: JobPosting;
    onClick: () => void;
  }) => {
    const timeRemaining = getTimeRemaining(job.end_date);
    const isExpiring =
      timeRemaining.includes("day") && !timeRemaining.includes("days");
    const isExpired = timeRemaining === "Expired";

    return (
      <Card
        className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group hover:border-blue-300 ${
          isExpired ? "opacity-60" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-900 mb-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 font-medium">
                  {job.organization}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{job.experience_required}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge
                variant={job.type === "government" ? "default" : "secondary"}
                className="mb-2"
              >
                {job.type === "government" ? "Government" : "Private"}
              </Badge>
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  isExpired
                    ? "bg-red-100 text-red-800"
                    : isExpiring
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {timeRemaining}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-600">
                {job.salary.total_range}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Apply by: {formatDate(job.end_date)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="w-4 h-4" />
              <span>{job.sector}</span>
            </div>

            {job.age_limit && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Age: {job.age_limit}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 group-hover:border-blue-500"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Apply Now
              </Button>
              {job.form_guide_youtube && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 group-hover:border-blue-500"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Guide
                </Button>
              )}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-1">
              Required documents:
            </div>
            <div className="flex flex-wrap gap-1">
              {job.required_documents.slice(0, 3).map((doc, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {doc}
                </Badge>
              ))}
              {job.required_documents.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{job.required_documents.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const JobDetailsModal = ({
    job,
    onClose,
  }: {
    job: JobPosting;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
              <p className="text-gray-600">{job.organization}</p>
              <div className="flex gap-2 mt-2">
                <Badge
                  variant={job.type === "government" ? "default" : "secondary"}
                >
                  {job.type === "government" ? "Government" : "Private"}
                </Badge>
                <Badge variant="outline">{job.sector}</Badge>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="salary">Salary</TabsTrigger>
              <TabsTrigger value="apply">How to Apply</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      Job Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">
                        Organization:
                      </span>
                      <p className="font-semibold">{job.organization}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Location:</span>
                      <p className="font-semibold">{job.location}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Experience:</span>
                      <p className="font-semibold">{job.experience_required}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Sector:</span>
                      <p className="font-semibold">{job.sector}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      Important Dates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">
                        Application Start:
                      </span>
                      <p className="font-semibold">
                        {formatDate(job.start_date)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Application End:
                      </span>
                      <p className="font-semibold">
                        {formatDate(job.end_date)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Time Remaining:
                      </span>
                      <p
                        className={`font-semibold ${
                          getTimeRemaining(job.end_date).includes("Expired")
                            ? "text-red-600"
                            : getTimeRemaining(job.end_date).includes("day") &&
                                !getTimeRemaining(job.end_date).includes("days")
                              ? "text-orange-600"
                              : "text-green-600"
                        }`}
                      >
                        {getTimeRemaining(job.end_date)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="eligibility" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.eligibility.map((criteria, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {job.required_documents.map((doc, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                        >
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="salary" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Salary Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Basic Pay:</span>
                    <p className="text-2xl font-bold text-green-600">
                      {job.salary.basic_pay}
                    </p>
                  </div>

                  {job.salary.allowances &&
                    job.salary.allowances.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-600">
                          Allowances:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.salary.allowances.map((allowance, i) => (
                            <Badge key={i} variant="outline">
                              {allowance}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  <div>
                    <span className="text-sm text-gray-600">Total Range:</span>
                    <p className="text-xl font-bold text-blue-600">
                      {job.salary.total_range}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="apply" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Process</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <Button className="gap-2" asChild>
                        <a
                          href={job.application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Apply Online
                        </a>
                      </Button>

                      {job.form_guide_youtube && (
                        <Button variant="outline" className="gap-2" asChild>
                          <a
                            href={job.form_guide_youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Play className="w-4 h-4" />
                            Form Guide Video
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Application Tips:
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>
                          • Fill the form carefully and double-check all details
                        </li>
                        <li>
                          • Keep all required documents ready in PDF format
                        </li>
                        <li>• Apply well before the deadline</li>
                        <li>
                          • Take a screenshot of the application form after
                          submission
                        </li>
                        <li>
                          • Keep the registration number safe for future
                          reference
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getText("latest_jobs_title", currentLanguage) ||
              "Latest Job Vacancies"}
          </h1>
          <p className="text-xl text-gray-600">
            {getText("latest_jobs_subtitle", currentLanguage) ||
              "100 verified job opportunities updated daily"}
          </p>

          <div className="mt-4">
            <Button
              onClick={handleAutoFetch}
              disabled={isAutoFetching}
              className="gap-2"
            >
              <Zap className="w-4 h-4" />
              {isAutoFetching ? "Fetching..." : "Auto-Fetch Latest Jobs"}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search jobs by title, organization, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <Tabs
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as any)}
              >
                <TabsList>
                  <TabsTrigger value="all">
                    All Jobs ({allJobs.length})
                  </TabsTrigger>
                  <TabsTrigger value="government">
                    Government ({governmentJobs.length})
                  </TabsTrigger>
                  <TabsTrigger value="private">
                    Private ({privateJobs.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1"
              >
                <option value="all">All Sectors</option>
                {sectors.slice(1).map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => {
                  setSelectedJob(job);
                  setShowJobDetails(true);
                }}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 mb-4">
                Try different search terms or adjust your filters
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                  setSelectedSector("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Job Details Modal */}
        {showJobDetails && selectedJob && (
          <JobDetailsModal
            job={selectedJob}
            onClose={() => {
              setShowJobDetails(false);
              setSelectedJob(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
