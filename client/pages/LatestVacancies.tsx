import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  ExternalLink,
  Bell,
  BookOpen,
  Calendar,
  FileText,
  Play,
  Download,
  TrendingUp,
  Building,
  GraduationCap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function LatestVacancies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [salaryRange, setSalaryRange] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("deadline");

  const sectors = [
    { value: "government", label: "Government Jobs" },
    { value: "private", label: "Private Sector" },
    { value: "psu", label: "PSU Jobs" },
    { value: "banking", label: "Banking" },
    { value: "defence", label: "Defence" },
    { value: "railway", label: "Railway" },
  ];

  const states = [
    "All India",
    "Andhra Pradesh",
    "Bihar",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
  ];

  const categories = ["General", "OBC", "SC", "ST", "EWS", "PWD"];

  const salaryRanges = [
    { value: "0-3", label: "₹0 - ₹3 LPA" },
    { value: "3-6", label: "₹3 - ₹6 LPA" },
    { value: "6-10", label: "₹6 - ₹10 LPA" },
    { value: "10-15", label: "₹10 - ₹15 LPA" },
    { value: "15+", label: "₹15+ LPA" },
  ];

  const jobListings = [
    {
      id: 1,
      title: "Software Engineer",
      organization: "Indian Space Research Organisation (ISRO)",
      type: "Government",
      location: "Bangalore, Karnataka",
      salary: "₹6.5 - ₹12 LPA",
      inHandSalary: "₹55,000 - ₹85,000",
      allowances: "₹15,000 - ₹25,000",
      applicationStart: "2024-01-15",
      applicationEnd: "2024-02-15",
      examDate: "2024-03-20",
      fee: "₹500 (Gen/OBC), ₹250 (SC/ST/PWD)",
      eligibility: "B.Tech/B.E. in Computer Science/IT",
      experience: "0-3 years",
      vacancies: 45,
      category: ["General", "OBC", "SC", "ST"],
      status: "Active",
      urgent: false,
      featured: true,
      applyLink: "https://isro.gov.in/careers",
      tutorialLink: "https://youtube.com/watch?v=example1",
    },
    {
      id: 2,
      title: "Banking Associate",
      organization: "State Bank of India",
      type: "Banking",
      location: "Multiple Locations",
      salary: "₹4 - ₹8 LPA",
      inHandSalary: "₹35,000 - ₹55,000",
      allowances: "₹8,000 - ₹15,000",
      applicationStart: "2024-01-10",
      applicationEnd: "2024-02-05",
      examDate: "2024-02-25",
      fee: "₹750 (Gen/OBC), ₹100 (SC/ST/PWD)",
      eligibility: "Graduation in any discipline",
      experience: "0-2 years",
      vacancies: 2000,
      category: ["General", "OBC", "SC", "ST", "EWS"],
      status: "Active",
      urgent: true,
      featured: false,
      applyLink: "https://sbi.co.in/careers",
      tutorialLink: "https://youtube.com/watch?v=example2",
    },
    {
      id: 3,
      title: "Assistant Commandant",
      organization: "Central Reserve Police Force (CRPF)",
      type: "Defence",
      location: "All India",
      salary: "₹9 - ₹18 LPA",
      inHandSalary: "₹65,000 - ₹95,000",
      allowances: "₹20,000 - ₹35,000",
      applicationStart: "2024-01-20",
      applicationEnd: "2024-02-20",
      examDate: "2024-04-10",
      fee: "₹200 (All Categories)",
      eligibility: "Graduation + Physical Standards",
      experience: "Fresh graduates welcome",
      vacancies: 219,
      category: ["General", "OBC", "SC", "ST"],
      status: "Active",
      urgent: false,
      featured: true,
      applyLink: "https://crpf.gov.in/recruitment",
      tutorialLink: "https://youtube.com/watch?v=example3",
    },
    {
      id: 4,
      title: "Junior Engineer",
      organization: "Indian Railways",
      type: "Railway",
      location: "Multiple Zones",
      salary: "₹3.5 - ₹7 LPA",
      inHandSalary: "₹30,000 - ₹50,000",
      allowances: "₹10,000 - ₹18,000",
      applicationStart: "2024-01-25",
      applicationEnd: "2024-02-25",
      examDate: "2024-03-30",
      fee: "₹500 (Gen/OBC), ₹250 (SC/ST/PWD)",
      eligibility: "Diploma/B.Tech in Engineering",
      experience: "0-2 years",
      vacancies: 13487,
      category: ["General", "OBC", "SC", "ST", "EWS"],
      status: "Active",
      urgent: false,
      featured: false,
      applyLink: "https://rrbcdg.gov.in",
      tutorialLink: "https://youtube.com/watch?v=example4",
    },
    {
      id: 5,
      title: "Data Analyst",
      organization: "Tech Mahindra",
      type: "Private",
      location: "Pune, Maharashtra",
      salary: "₹4.5 - ₹8 LPA",
      inHandSalary: "₹35,000 - ₹60,000",
      allowances: "₹5,000 - ₹12,000",
      applicationStart: "2024-01-12",
      applicationEnd: "2024-02-10",
      examDate: "2024-02-18",
      fee: "No Application Fee",
      eligibility: "B.Tech/BCA/MCA with Analytics knowledge",
      experience: "0-1 years",
      vacancies: 150,
      category: ["Open for all"],
      status: "Active",
      urgent: true,
      featured: false,
      applyLink: "https://careers.techmahindra.com",
      tutorialLink: "https://youtube.com/watch?v=example5",
    },
  ];

  const filteredJobs = jobListings.filter((job) => {
    if (
      searchTerm &&
      !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.organization.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (selectedSector !== "all" && job.type.toLowerCase() !== selectedSector)
      return false;
    if (selectedState !== "all" && !job.location.includes(selectedState))
      return false;
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.some((cat) => job.category.includes(cat))
    )
      return false;
    return true;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "deadline":
        return (
          new Date(a.applicationEnd).getTime() -
          new Date(b.applicationEnd).getTime()
        );
      case "salary":
        return b.salary.localeCompare(a.salary);
      case "vacancies":
        return b.vacancies - a.vacancies;
      default:
        return 0;
    }
  });

  const getDaysLeft = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 7) return "text-red-600 bg-red-50";
    if (daysLeft <= 15) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-career-secondary/10 to-green-500/10">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="h-10 w-10 text-career-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Latest Vacancies
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time government and private job openings with complete
              application guidance. Never miss an opportunity with our live
              updates and alerts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Live Updates
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Bell className="h-4 w-4 mr-2" />
                Job Alerts
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Play className="h-4 w-4 mr-2" />
                Application Tutorials
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs by title, organization, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>

                {/* Filter Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Select
                    value={selectedSector}
                    onValueChange={setSelectedSector}
                  >
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      {sectors.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedState}
                    onValueChange={setSelectedState}
                  >
                    <SelectTrigger>
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={salaryRange} onValueChange={setSalaryRange}>
                    <SelectTrigger>
                      <DollarSign className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Salary Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Salaries</SelectItem>
                      {salaryRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deadline">
                        Application Deadline
                      </SelectItem>
                      <SelectItem value="salary">
                        Salary (High to Low)
                      </SelectItem>
                      <SelectItem value="vacancies">
                        Number of Vacancies
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filters */}
                <div>
                  <h4 className="font-medium mb-3">Category Filters:</h4>
                  <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                category,
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (c) => c !== category,
                                ),
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {sortedJobs.length} Job Openings Found
              </h2>
              <p className="text-muted-foreground">Updated 2 hours ago</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Set Job Alert
            </Button>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {sortedJobs.map((job) => {
              const daysLeft = getDaysLeft(job.applicationEnd);
              return (
                <Card
                  key={job.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    job.featured ? "ring-2 ring-career-primary/20" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{job.title}</h3>
                              {job.featured && (
                                <Badge className="bg-career-primary text-white">
                                  Featured
                                </Badge>
                              )}
                              {job.urgent && (
                                <Badge variant="destructive">Urgent</Badge>
                              )}
                            </div>
                            <p className="text-lg text-muted-foreground">
                              {job.organization}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {job.vacancies} positions
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(daysLeft)}`}
                          >
                            {daysLeft > 0
                              ? `${daysLeft} days left`
                              : "Deadline passed"}
                          </div>
                        </div>

                        {/* Job Details Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              Salary & Benefits
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>
                                Package:{" "}
                                <span className="font-medium">
                                  {job.salary}
                                </span>
                              </div>
                              <div>
                                In-hand:{" "}
                                <span className="font-medium">
                                  {job.inHandSalary}
                                </span>
                              </div>
                              <div>
                                Allowances:{" "}
                                <span className="font-medium">
                                  {job.allowances}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Important Dates
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>
                                Apply Start:{" "}
                                <span className="font-medium">
                                  {new Date(
                                    job.applicationStart,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                Apply End:{" "}
                                <span className="font-medium">
                                  {new Date(
                                    job.applicationEnd,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                Exam Date:{" "}
                                <span className="font-medium">
                                  {new Date(job.examDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              Eligibility
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>{job.eligibility}</div>
                              <div>
                                Experience:{" "}
                                <span className="font-medium">
                                  {job.experience}
                                </span>
                              </div>
                              <div>
                                Fee:{" "}
                                <span className="font-medium">{job.fee}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Categories */}
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">
                            Available Categories:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.category.map((cat) => (
                              <Badge key={cat} variant="outline">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Panel */}
                      <div className="lg:w-64 space-y-4">
                        <Card className="bg-muted/30">
                          <CardContent className="p-4">
                            <div className="text-center mb-4">
                              <div className="text-2xl font-bold text-career-primary">
                                {job.vacancies.toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Total Vacancies
                              </div>
                            </div>

                            <div className="space-y-3">
                              <a
                                href={job.applyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="w-full bg-gradient-to-r from-career-primary to-career-secondary">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Apply Now
                                </Button>
                              </a>

                              <a
                                href={job.tutorialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="outline" className="w-full">
                                  <Play className="h-4 w-4 mr-2" />
                                  How to Apply
                                </Button>
                              </a>

                              <Button variant="ghost" className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                Download Details
                              </Button>

                              <Button variant="ghost" className="w-full">
                                <Bell className="h-4 w-4 mr-2" />
                                Set Reminder
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-career-secondary" />
                          <span className="text-muted-foreground">
                            Verified Opening
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Showing {sortedJobs.length} of 1,247 total job openings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
