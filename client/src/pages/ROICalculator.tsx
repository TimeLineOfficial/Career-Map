import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  PieChart,
  BarChart,
  LineChart,
  Download,
  Save,
  Share,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";

export default function ROICalculator() {
  const [businessType, setBusinessType] = useState("");
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [projectionPeriod, setProjectionPeriod] = useState("12");
  const [growthRate, setGrowthRate] = useState("5");

  const [results, setResults] = useState({
    monthlyProfit: 0,
    annualProfit: 0,
    roi: 0,
    breakEvenMonths: 0,
    totalRevenue: 0,
    totalProfit: 0,
    profitability: "Medium",
  });

  const businessTypes = [
    {
      value: "restaurant",
      label: "Restaurant/Food Business",
      avgRoi: "15-25%",
      riskLevel: "Medium",
    },
    {
      value: "retail",
      label: "Retail Store",
      avgRoi: "20-35%",
      riskLevel: "Medium",
    },
    {
      value: "ecommerce",
      label: "E-commerce",
      avgRoi: "25-40%",
      riskLevel: "Low",
    },
    {
      value: "manufacturing",
      label: "Manufacturing",
      avgRoi: "18-30%",
      riskLevel: "High",
    },
    {
      value: "services",
      label: "Service Business",
      avgRoi: "30-50%",
      riskLevel: "Low",
    },
    {
      value: "tech",
      label: "Technology/Software",
      avgRoi: "40-70%",
      riskLevel: "Medium",
    },
    {
      value: "healthcare",
      label: "Healthcare",
      avgRoi: "20-35%",
      riskLevel: "Low",
    },
    {
      value: "education",
      label: "Education/Training",
      avgRoi: "25-45%",
      riskLevel: "Low",
    },
  ];

  const calculateROI = () => {
    const investment = parseFloat(initialInvestment) || 0;
    const revenue = parseFloat(monthlyRevenue) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const period = parseInt(projectionPeriod) || 12;
    const growth = parseFloat(growthRate) / 100 || 0;

    const monthlyProfit = revenue - expenses;
    let totalProfit = 0;
    let totalRevenue = 0;

    // Calculate projected profit with growth
    for (let month = 1; month <= period; month++) {
      const monthRevenue = revenue * Math.pow(1 + growth / 12, month - 1);
      const monthProfit = monthRevenue - expenses;
      totalProfit += monthProfit;
      totalRevenue += monthRevenue;
    }

    const roi = investment > 0 ? (totalProfit / investment) * 100 : 0;
    const breakEvenMonths = monthlyProfit > 0 ? investment / monthlyProfit : 0;

    let profitability = "Low";
    if (roi > 30) profitability = "High";
    else if (roi > 15) profitability = "Medium";

    setResults({
      monthlyProfit,
      annualProfit: totalProfit,
      roi,
      breakEvenMonths,
      totalRevenue,
      totalProfit,
      profitability,
    });
  };

  useEffect(() => {
    calculateROI();
  }, [
    initialInvestment,
    monthlyRevenue,
    monthlyExpenses,
    projectionPeriod,
    growthRate,
  ]);

  const getProfitabilityColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "Low":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const sampleBusinesses = [
    {
      name: "Cloud Kitchen",
      investment: "₹5,00,000",
      monthlyRevenue: "₹3,50,000",
      monthlyExpenses: "₹2,80,000",
      roi: "28%",
      breakEven: "7.2 months",
    },
    {
      name: "Digital Marketing Agency",
      investment: "₹75,000",
      monthlyRevenue: "₹2,00,000",
      monthlyExpenses: "₹1,20,000",
      roi: "128%",
      breakEven: "0.9 months",
    },
    {
      name: "Organic Farm",
      investment: "₹8,00,000",
      monthlyRevenue: "₹1,80,000",
      monthlyExpenses: "₹1,20,000",
      roi: "18%",
      breakEven: "13.3 months",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-career-secondary/10 to-green-500/10">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calculator className="h-10 w-10 text-career-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold">ROI Calculator</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate investment requirements, projected returns, and
              break-even analysis for your business idea. Make informed
              decisions with comprehensive financial projections.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Advanced Analytics
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <PieChart className="h-4 w-4 mr-2" />
                Visual Reports
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Download className="h-4 w-4 mr-2" />
                Exportable Results
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="calculator" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Business Parameters
                      </CardTitle>
                      <CardDescription>
                        Enter your business details for accurate calculations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="text-base font-medium">
                          Business Type
                        </Label>
                        <Select
                          value={businessType}
                          onValueChange={setBusinessType}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{type.label}</span>
                                  <div className="flex items-center gap-2 ml-4">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {type.avgRoi}
                                    </Badge>
                                    <span
                                      className={`text-xs ${getRiskColor(type.riskLevel)}`}
                                    >
                                      {type.riskLevel} Risk
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="investment"
                          className="text-base font-medium"
                        >
                          Initial Investment (₹)
                        </Label>
                        <Input
                          id="investment"
                          type="number"
                          placeholder="500000"
                          value={initialInvestment}
                          onChange={(e) => setInitialInvestment(e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="revenue"
                          className="text-base font-medium"
                        >
                          Expected Monthly Revenue (₹)
                        </Label>
                        <Input
                          id="revenue"
                          type="number"
                          placeholder="200000"
                          value={monthlyRevenue}
                          onChange={(e) => setMonthlyRevenue(e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="expenses"
                          className="text-base font-medium"
                        >
                          Monthly Operating Expenses (₹)
                        </Label>
                        <Input
                          id="expenses"
                          type="number"
                          placeholder="150000"
                          value={monthlyExpenses}
                          onChange={(e) => setMonthlyExpenses(e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-base font-medium">
                            Projection Period
                          </Label>
                          <Select
                            value={projectionPeriod}
                            onValueChange={setProjectionPeriod}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6">6 months</SelectItem>
                              <SelectItem value="12">1 year</SelectItem>
                              <SelectItem value="24">2 years</SelectItem>
                              <SelectItem value="36">3 years</SelectItem>
                              <SelectItem value="60">5 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label
                            htmlFor="growth"
                            className="text-base font-medium"
                          >
                            Annual Growth Rate (%)
                          </Label>
                          <Input
                            id="growth"
                            type="number"
                            placeholder="5"
                            value={growthRate}
                            onChange={(e) => setGrowthRate(e.target.value)}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={calculateROI}
                        className="w-full bg-gradient-to-r from-career-secondary to-green-600"
                        size="lg"
                      >
                        <Calculator className="h-5 w-5 mr-2" />
                        Calculate ROI
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Results */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">
                            Return on Investment
                          </h3>
                          <TrendingUp className="h-5 w-5 text-career-secondary" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-career-secondary">
                            {results.roi.toFixed(1)}%
                          </div>
                          <Badge
                            className={getProfitabilityColor(
                              results.profitability,
                            )}
                          >
                            {results.profitability} Profitability
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">
                            Break-Even Period
                          </h3>
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-blue-600">
                            {results.breakEvenMonths.toFixed(1)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            months
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Financial Summary */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Financial Summary ({projectionPeriod} months)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-career-primary">
                            ₹{(results.monthlyProfit * 1000).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Monthly Profit
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-career-secondary">
                            ₹{(results.totalRevenue / 100000).toFixed(1)}L
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Revenue
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            ₹{(results.totalProfit / 100000).toFixed(1)}L
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Profit
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">
                            ₹
                            {(parseFloat(initialInvestment) / 100000).toFixed(
                              1,
                            )}
                            L
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Investment
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insights */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Business Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.roi > 25 && (
                          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-green-800">
                                Excellent ROI
                              </div>
                              <div className="text-sm text-green-700">
                                Your projected ROI of {results.roi.toFixed(1)}%
                                is above average for most businesses.
                              </div>
                            </div>
                          </div>
                        )}

                        {results.breakEvenMonths > 24 && (
                          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-yellow-800">
                                Long Break-Even Period
                              </div>
                              <div className="text-sm text-yellow-700">
                                Consider reducing initial investment or
                                increasing monthly profit margins.
                              </div>
                            </div>
                          </div>
                        )}

                        {results.monthlyProfit < 0 && (
                          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-red-800">
                                Negative Cash Flow
                              </div>
                              <div className="text-sm text-red-700">
                                Monthly expenses exceed revenue. Review your
                                business model.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export Report
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Calculation
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share className="h-4 w-4" />
                      Share Results
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis">
              <div className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Business Analysis Report</CardTitle>
                    <CardDescription>
                      Comprehensive analysis of your business financials
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                              Revenue vs Expenses Chart
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Visual representation will appear here
                            </p>
                          </div>
                        </div>

                        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                              Growth Projection
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Growth trend visualization
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                              Cost Breakdown
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expense distribution chart
                            </p>
                          </div>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Risk Assessment
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span>Market Risk</span>
                                <Badge
                                  variant="outline"
                                  className="text-yellow-600"
                                >
                                  Medium
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Financial Risk</span>
                                <Badge
                                  variant="outline"
                                  className="text-green-600"
                                >
                                  Low
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Operational Risk</span>
                                <Badge
                                  variant="outline"
                                  className="text-yellow-600"
                                >
                                  Medium
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examples">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Sample Business Calculations
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Real-world examples to help you understand the calculations
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {sampleBusinesses.map((business, index) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {business.name}
                        </CardTitle>
                        <CardDescription>
                          Sample calculation for reference
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Investment:
                            </span>
                            <span className="font-medium">
                              {business.investment}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Monthly Revenue:
                            </span>
                            <span className="font-medium">
                              {business.monthlyRevenue}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Monthly Expenses:
                            </span>
                            <span className="font-medium">
                              {business.monthlyExpenses}
                            </span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Annual ROI:
                              </span>
                              <span className="font-bold text-career-secondary">
                                {business.roi}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Break-even:
                              </span>
                              <span className="font-medium">
                                {business.breakEven}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          Use This Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
