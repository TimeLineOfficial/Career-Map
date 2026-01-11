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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Shield,
  Building,
  Globe,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  BookOpen,
  Award,
} from "lucide-react";

export default function BusinessDocumentation() {
  const [selectedBusinessType, setSelectedBusinessType] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const businessTypes = [
    { value: "sole-proprietorship", label: "Sole Proprietorship" },
    { value: "partnership", label: "Partnership" },
    { value: "llp", label: "Limited Liability Partnership (LLP)" },
    { value: "private-limited", label: "Private Limited Company" },
    { value: "public-limited", label: "Public Limited Company" },
    { value: "opc", label: "One Person Company (OPC)" },
  ];

  const states = [
    "All India",
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
  ];

  const documentCategories = [
    {
      id: "registration",
      title: "Business Registration",
      description: "Essential documents to legally establish your business",
      icon: Building,
      color: "from-blue-500 to-indigo-500",
      documents: [
        {
          name: "Business Registration Certificate",
          description: "Official registration of your business entity",
          mandatory: true,
          processingTime: "7-15 days",
          fees: "₹500-5,000",
          validityPeriod: "Lifetime",
          renewalRequired: false,
          applicableFor: ["All business types"],
          documents: ["PAN Card", "Address Proof", "Identity Proof"],
          process:
            "Apply online through official portal or visit registrar office",
        },
        {
          name: "GST Registration",
          description: "Goods and Services Tax registration for tax compliance",
          mandatory: true,
          processingTime: "3-7 days",
          fees: "Free",
          validityPeriod: "Lifetime",
          renewalRequired: false,
          applicableFor: ["Turnover > ₹20 lakh (₹10 lakh for NE states)"],
          documents: [
            "Business Registration",
            "Bank Statement",
            "Address Proof",
          ],
          process: "Apply online through GST portal with required documents",
        },
      ],
    },
    {
      id: "licensing",
      title: "Industry Licenses",
      description: "Specific licenses based on your industry and business type",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      documents: [
        {
          name: "FSSAI License",
          description:
            "Food Safety and Standards Authority license for food businesses",
          mandatory: true,
          processingTime: "15-30 days",
          fees: "₹100-7,500",
          validityPeriod: "1-5 years",
          renewalRequired: true,
          applicableFor: ["Food & Beverage businesses"],
          documents: [
            "Business Registration",
            "Layout Plan",
            "NOC from Fire Dept",
          ],
          process:
            "Apply online through FSSAI portal with supporting documents",
        },
        {
          name: "Drug License",
          description:
            "License for manufacturing, selling, or distributing drugs",
          mandatory: true,
          processingTime: "30-60 days",
          fees: "₹2,500-10,000",
          validityPeriod: "5 years",
          renewalRequired: true,
          applicableFor: ["Pharmaceutical businesses"],
          documents: [
            "Qualified Person Certificate",
            "Premises Details",
            "Equipment List",
          ],
          process: "Apply through State Drug Control Department",
        },
      ],
    },
    {
      id: "environmental",
      title: "Environmental Clearances",
      description: "Permits for businesses with environmental impact",
      icon: Globe,
      color: "from-career-secondary to-green-600",
      documents: [
        {
          name: "Pollution Control Board NOC",
          description:
            "No Objection Certificate from State Pollution Control Board",
          mandatory: true,
          processingTime: "30-90 days",
          fees: "₹1,000-25,000",
          validityPeriod: "5 years",
          renewalRequired: true,
          applicableFor: ["Manufacturing, Chemical, Food processing"],
          documents: [
            "Project Report",
            "Site Plan",
            "Environmental Impact Assessment",
          ],
          process: "Apply through State Pollution Control Board website",
        },
      ],
    },
    {
      id: "labor",
      title: "Labor & Employment",
      description: "Registrations related to employee welfare and labor laws",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      documents: [
        {
          name: "ESI Registration",
          description:
            "Employee State Insurance registration for employee benefits",
          mandatory: true,
          processingTime: "7-15 days",
          fees: "Free",
          validityPeriod: "Lifetime",
          renewalRequired: false,
          applicableFor: ["Businesses with 10+ employees"],
          documents: [
            "Business Registration",
            "Employee Details",
            "Salary Structure",
          ],
          process: "Apply online through ESI portal",
        },
        {
          name: "PF Registration",
          description:
            "Provident Fund registration for employee retirement benefits",
          mandatory: true,
          processingTime: "15-30 days",
          fees: "Free",
          validityPeriod: "Lifetime",
          renewalRequired: false,
          applicableFor: ["Businesses with 20+ employees"],
          documents: ["Business Registration", "Employee List", "Bank Details"],
          process: "Apply through EPFO unified portal",
        },
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Business Type Selection",
      description: "Choose the right business structure based on your needs",
      duration: "1-2 days",
      documents: ["Business Plan", "Investment Details"],
      tips: "Consider factors like liability, tax implications, and compliance requirements",
    },
    {
      step: 2,
      title: "Name Reservation",
      description: "Reserve your business name with the registrar",
      duration: "1-3 days",
      documents: ["Name Application", "Alternative Names"],
      tips: "Check name availability online before applying",
    },
    {
      step: 3,
      title: "Document Preparation",
      description: "Gather and prepare all required documents",
      duration: "3-7 days",
      documents: ["MOA", "AOA", "Identity Proofs", "Address Proofs"],
      tips: "Get documents notarized and ensure all details are accurate",
    },
    {
      step: 4,
      title: "Registration Filing",
      description: "Submit application with all required documents",
      duration: "1 day",
      documents: ["Complete Application Form", "Fee Payment"],
      tips: "Double-check all information before submission",
    },
    {
      step: 5,
      title: "Verification & Approval",
      description: "Registrar verifies documents and approves registration",
      duration: "7-15 days",
      documents: ["Additional documents if requested"],
      tips: "Respond promptly to any queries from authorities",
    },
    {
      step: 6,
      title: "Certificate Issuance",
      description: "Receive official registration certificate",
      duration: "1-2 days",
      documents: ["Digital Certificate", "Physical Certificate"],
      tips: "Keep multiple copies of certificate for future use",
    },
  ];

  const downloadableTemplates = [
    {
      name: "Business Registration Application",
      description: "Complete form for business registration",
      format: "PDF",
      pages: 8,
      downloads: 1250,
    },
    {
      name: "GST Registration Checklist",
      description: "Step-by-step checklist for GST registration",
      format: "PDF",
      pages: 4,
      downloads: 2100,
    },
    {
      name: "Partnership Deed Template",
      description: "Ready-to-use partnership agreement template",
      format: "DOC",
      pages: 12,
      downloads: 850,
    },
    {
      name: "MOA & AOA Templates",
      description: "Memorandum and Articles of Association templates",
      format: "DOC",
      pages: 20,
      downloads: 950,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="h-10 w-10 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Business Documentation
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete guide to business registrations, permits, and legal
              compliance. Get step-by-step guidance and downloadable templates
              for hassle-free setup.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Legal Compliance
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Download className="h-4 w-4 mr-2" />
                Free Templates
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Step-by-step Guide
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="documents" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-8">
              {/* Filters */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Search documents, permits, or licenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Select
                        value={selectedBusinessType}
                        onValueChange={setSelectedBusinessType}
                      >
                        <SelectTrigger>
                          <Building className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Business Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            All Business Types
                          </SelectItem>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
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
                          <SelectValue placeholder="State/Location" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Categories */}
              <div className="space-y-8">
                {documentCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="border-0 shadow-lg overflow-hidden"
                  >
                    <CardHeader
                      className={`bg-gradient-to-r ${category.color} text-white p-6`}
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className="h-8 w-8" />
                        <div>
                          <CardTitle className="text-2xl">
                            {category.title}
                          </CardTitle>
                          <CardDescription className="text-white/80">
                            {category.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {category.documents.map((doc, index) => (
                          <Card
                            key={index}
                            className="border hover:shadow-md transition-shadow"
                          >
                            <CardContent className="p-6">
                              <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-xl font-semibold">
                                      {doc.name}
                                    </h3>
                                    {doc.mandatory && (
                                      <Badge variant="destructive">
                                        Mandatory
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground mb-4">
                                    {doc.description}
                                  </p>

                                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          Processing:{" "}
                                          <strong>{doc.processingTime}</strong>
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          Fees: <strong>{doc.fees}</strong>
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          Validity:{" "}
                                          <strong>{doc.validityPeriod}</strong>
                                        </span>
                                      </div>
                                    </div>

                                    <div className="space-y-3">
                                      <div>
                                        <h4 className="font-medium mb-2">
                                          Required Documents:
                                        </h4>
                                        <div className="flex flex-wrap gap-1">
                                          {doc.documents.map((reqDoc) => (
                                            <Badge
                                              key={reqDoc}
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {reqDoc}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="font-medium mb-2">
                                          Applicable For:
                                        </h4>
                                        <div className="flex flex-wrap gap-1">
                                          {doc.applicableFor.map((type) => (
                                            <Badge
                                              key={type}
                                              variant="secondary"
                                              className="text-xs"
                                            >
                                              {type}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-muted/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">
                                      Application Process:
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {doc.process}
                                    </p>
                                  </div>
                                </div>

                                <div className="lg:w-64 space-y-3">
                                  <Button className="w-full" variant="outline">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Apply Online
                                  </Button>
                                  <Button className="w-full" variant="ghost">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    View Guide
                                  </Button>
                                  <Button className="w-full" variant="ghost">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Form
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="process" className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Business Registration Process
                  </CardTitle>
                  <CardDescription>
                    Complete step-by-step process to register your business
                    legally
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    {processSteps.map((step, index) => (
                      <div key={index} className="flex gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-career-primary to-career-secondary text-white flex items-center justify-center font-bold text-lg">
                            {step.step}
                          </div>
                          {index < processSteps.length - 1 && (
                            <div className="w-0.5 h-16 bg-muted mx-auto mt-4"></div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-xl font-semibold">
                              {step.title}
                            </h3>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.duration}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {step.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">
                                Required Documents:
                              </h4>
                              <div className="space-y-1">
                                {step.documents.map((doc) => (
                                  <div
                                    key={doc}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <CheckCircle className="h-4 w-4 text-career-secondary" />
                                    {doc}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-medium mb-2 text-blue-800">
                                💡 Pro Tip:
                              </h4>
                              <p className="text-sm text-blue-700">
                                {step.tips}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Free Document Templates
                </h2>
                <p className="text-xl text-muted-foreground">
                  Download ready-to-use templates and forms for business
                  registration
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {downloadableTemplates.map((template, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-career-primary to-career-secondary text-white">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {template.format}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {template.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <span>{template.pages} pages</span>
                          <span className="text-muted-foreground">
                            {template.downloads} downloads
                          </span>
                        </div>

                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download Free
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
