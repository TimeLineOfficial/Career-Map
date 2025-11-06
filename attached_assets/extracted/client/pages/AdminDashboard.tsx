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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Download,
  Eye,
  BarChart,
  PieChart,
  Clock,
  Star,
  DollarSign,
  Building,
  BookOpen,
  Play,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogin = () => {
    if (username === "Himesh Singh" && password === "Himesh@147Singh2") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-career-primary to-career-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Access the CareerMap administration panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-career-primary to-career-secondary"
            >
              <Shield className="h-4 w-4 mr-2" />
              Login to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dashboardStats = [
    {
      title: "Total Users",
      value: "52,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Jobs",
      value: "15,234",
      change: "+8.2%",
      icon: Building,
      color: "text-green-600",
    },
    {
      title: "Business Ideas",
      value: "547",
      change: "+5.1%",
      icon: TrendingUp,
      color: "text-yellow-600",
    },
    {
      title: "Revenue",
      value: "₹12.4L",
      change: "+22.1%",
      icon: DollarSign,
      color: "text-purple-600",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Software Engineer",
      organization: "Tech Corp",
      location: "Bangalore",
      postedDate: "2024-01-15",
      applications: 245,
      status: "Active",
    },
    {
      id: 2,
      title: "Marketing Manager",
      organization: "StartupXYZ",
      location: "Mumbai",
      postedDate: "2024-01-14",
      applications: 189,
      status: "Active",
    },
    {
      id: 3,
      title: "Data Analyst",
      organization: "Analytics Inc",
      location: "Delhi",
      postedDate: "2024-01-13",
      applications: 167,
      status: "Expired",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <section className="py-6 bg-gradient-to-r from-career-primary/10 to-purple-500/10 border-b">
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, Himesh Singh
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Clock className="h-4 w-4 mr-2" />
                Last login: Today, 2:30 PM
              </Badge>
              <Button
                variant="outline"
                onClick={() => setIsAuthenticated(false)}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-6 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-600">
                          {stat.change} from last month
                        </p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Job Posts</CardTitle>
                  <CardDescription>
                    Latest job listings and their performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {job.organization} • {job.location}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {job.applications} applications
                          </p>
                        </div>
                        <Badge
                          variant={
                            job.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Job Posting
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Content Update
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video Tutorial
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Post
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Job Management</h2>
              <Button className="bg-gradient-to-r from-career-primary to-career-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add New Job
              </Button>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Add/Edit Job Posting</CardTitle>
                <CardDescription>
                  Create or update job listings and vacancy information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      placeholder="e.g., Software Engineer"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Organization</Label>
                    <Input placeholder="e.g., Tech Corp" className="mt-2" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Location</Label>
                    <Input
                      placeholder="e.g., Bangalore, Karnataka"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Job Type</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="psu">PSU</SelectItem>
                        <SelectItem value="banking">Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Salary Range</Label>
                    <Input placeholder="e.g., ₹8-15 LPA" className="mt-2" />
                  </div>
                  <div>
                    <Label>Application Deadline</Label>
                    <Input type="date" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label>Job Description</Label>
                  <Textarea
                    placeholder="Detailed job description, requirements, and qualifications"
                    className="mt-2 h-32"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Application Fee</Label>
                    <Input
                      placeholder="e.g., ₹500 (Gen/OBC), ₹250 (SC/ST)"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Number of Vacancies</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 150"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-career-secondary to-green-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Job Post
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Content Management</h2>
              <Button className="bg-gradient-to-r from-career-primary to-career-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Create Content
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Video Content</CardTitle>
                  <CardDescription>
                    Manage tutorial videos and guidance content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Video Title</Label>
                    <Input
                      placeholder="e.g., How to Apply for Government Jobs"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Video Description</Label>
                    <Textarea
                      placeholder="Brief description of the video content"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="career-guidance">
                          Career Guidance
                        </SelectItem>
                        <SelectItem value="business-tips">
                          Business Tips
                        </SelectItem>
                        <SelectItem value="application-help">
                          Application Help
                        </SelectItem>
                        <SelectItem value="interview-prep">
                          Interview Preparation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Video File</Label>
                    <Input type="file" accept="video/*" className="mt-2" />
                  </div>
                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>PDF Resources</CardTitle>
                  <CardDescription>
                    Manage downloadable guides and documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Document Title</Label>
                    <Input
                      placeholder="e.g., Complete Business Setup Guide"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Document Type</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="career-guide">
                          Career Guide
                        </SelectItem>
                        <SelectItem value="business-plan">
                          Business Plan Template
                        </SelectItem>
                        <SelectItem value="application-form">
                          Application Form
                        </SelectItem>
                        <SelectItem value="checklist">Checklist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Access Level</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select access" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free Access</SelectItem>
                        <SelectItem value="premium">Premium Only</SelectItem>
                        <SelectItem value="registered">
                          Registered Users
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>PDF File</Label>
                    <Input type="file" accept=".pdf" className="mt-2" />
                  </div>
                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-8">
            <h2 className="text-2xl font-bold">User Management</h2>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>
                  Overview of user activity and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      52,847
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Users
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      8,234
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active This Month
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      1,456
                    </div>
                    <div className="text-sm text-muted-foreground">
                      New Registrations
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Traffic Analytics</CardTitle>
                  <CardDescription>
                    Website traffic and user engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Analytics Chart</p>
                      <p className="text-sm text-muted-foreground">
                        Traffic visualization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>
                    Premium subscriptions and revenue tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Revenue Chart</p>
                      <p className="text-sm text-muted-foreground">
                        Income breakdown
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-8">
            <h2 className="text-2xl font-bold">Settings</h2>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  Manage system settings and configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Automated Data Fetching</Label>
                  <div className="mt-2 space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Enable Auto Job Scraping
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Configure Update Frequency
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Manage Data Sources
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Notification Settings</Label>
                  <div className="mt-2 space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Configure Email Alerts
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Push Notification Settings
                    </Button>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-career-primary to-career-secondary">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
