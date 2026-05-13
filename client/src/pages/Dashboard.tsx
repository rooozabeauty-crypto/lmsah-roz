import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Menu, X, Plus, Edit2, Trash2, TrendingUp, Users, Target, Zap } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: "active" | "paused" | "completed";
  budget: number;
  spent: number;
  conversions: number;
  roi: number;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  campaigns: number;
  revenue: number;
  status: "active" | "completed";
}

const revenueData = [
  { month: "يناير", revenue: 45000, target: 50000 },
  { month: "فبراير", revenue: 52000, target: 50000 },
  { month: "مارس", revenue: 48000, target: 50000 },
  { month: "أبريل", revenue: 61000, target: 50000 },
  { month: "مايو", revenue: 55000, target: 50000 },
  { month: "يونيو", revenue: 67000, target: 50000 },
];

const platformData = [
  { name: "Instagram", value: 35, fill: "#E1306C" },
  { name: "Facebook", value: 25, fill: "#1877F2" },
  { name: "TikTok", value: 20, fill: "#000000" },
  { name: "LinkedIn", value: 12, fill: "#0A66C2" },
  { name: "Twitter", value: 8, fill: "#1DA1F2" },
];

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "حملة صيف 2024",
    platform: "Instagram",
    status: "active",
    budget: 15000,
    spent: 12500,
    conversions: 342,
    roi: 285,
    createdAt: "2024-05-01",
  },
  {
    id: "2",
    name: "عرض العيد الخاص",
    platform: "Facebook",
    status: "active",
    budget: 20000,
    spent: 18000,
    conversions: 521,
    roi: 312,
    createdAt: "2024-05-05",
  },
  {
    id: "3",
    name: "إطلاق منتج جديد",
    platform: "TikTok",
    status: "paused",
    budget: 10000,
    spent: 8500,
    conversions: 215,
    roi: 198,
    createdAt: "2024-04-20",
  },
];

const projects: Project[] = [
  {
    id: "1",
    name: "متجر الملابس الفاخرة",
    description: "حملات تسويقية شاملة",
    campaigns: 5,
    revenue: 125000,
    status: "active",
  },
  {
    id: "2",
    name: "متجر الإكسسوارات",
    description: "تسويق السوشل ميديا",
    campaigns: 3,
    revenue: 85000,
    status: "active",
  },
  {
    id: "3",
    name: "متجر الأحذية",
    description: "حملة موسمية",
    campaigns: 2,
    revenue: 45000,
    status: "completed",
  },
];

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "projects">("overview");

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="border-border bg-card/50 backdrop-blur max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle>لوحة التحكم</CardTitle>
            <CardDescription>يجب تسجيل الدخول للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild>
              <a href={getLoginUrl()}>تسجيل الدخول</a>
            </Button>
            <Button size="lg" variant="outline" className="w-full" asChild>
              <Link href="/">العودة للرئيسية</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gradient-gold">لمسه</div>
            <span className="text-sm font-medium text-muted-foreground">لوحة التحكم</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-sm font-medium transition ${
                activeTab === "overview" ? "text-accent" : "hover:text-accent"
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`text-sm font-medium transition ${
                activeTab === "campaigns" ? "text-accent" : "hover:text-accent"
              }`}
            >
              الحملات
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`text-sm font-medium transition ${
                activeTab === "projects" ? "text-accent" : "hover:text-accent"
              }`}
            >
              المشاريع
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="container py-4 space-y-3">
              <button
                onClick={() => {
                  setActiveTab("overview");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-medium hover:text-accent"
              >
                نظرة عامة
              </button>
              <button
                onClick={() => {
                  setActiveTab("campaigns");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-medium hover:text-accent"
              >
                الحملات
              </button>
              <button
                onClick={() => {
                  setActiveTab("projects");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-medium hover:text-accent"
              >
                المشاريع
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">مرحباً بك، {user?.name || "التاجر"} 👋</h1>
          <p className="text-muted-foreground">إليك ملخص أداء متجرك اليوم</p>
        </div>

        {/* Stats Cards */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp size={18} className="text-accent" />
                    إجمالي الأرباح
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">382,000 ر.س</div>
                  <p className="text-xs text-accent mt-2">↑ 23.5% من الشهر السابق</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target size={18} className="text-accent" />
                    معدل التحويل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">318%</div>
                  <p className="text-xs text-accent mt-2">↑ 18.7% من الشهر السابق</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users size={18} className="text-accent" />
                    العملاء الجدد
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,245</div>
                  <p className="text-xs text-accent mt-2">↑ 42.3% من الشهر السابق</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap size={18} className="text-accent" />
                    الحملات النشطة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8</div>
                  <p className="text-xs text-accent mt-2">2 قيد المراجعة</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-border bg-card/50 backdrop-blur lg:col-span-2">
                <CardHeader>
                  <CardTitle>الأرباح الشهرية</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a2e",
                          border: "1px solid #333",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2} name="الأرباح الفعلية" />
                      <Line type="monotone" dataKey="target" stroke="#9d4edd" strokeWidth={2} strokeDasharray="5 5" name="الهدف" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>توزيع المنصات</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={platformData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">الحملات الإعلانية</h2>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus size={18} className="ml-2" />
                حملة جديدة
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-border bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">الميزانية</p>
                        <p className="font-semibold">{campaign.budget.toLocaleString()} ر.س</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">التحويلات</p>
                        <p className="font-semibold">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">العائد على الاستثمار</p>
                        <p className="font-semibold text-accent">{campaign.roi}%</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit2 size={16} />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">المشاريع</h2>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus size={18} className="ml-2" />
                مشروع جديد
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="border-border bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === "active"
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {project.status === "active" ? "نشط" : "مكتمل"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">الحملات</p>
                        <p className="text-2xl font-bold">{project.campaigns}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">الأرباح</p>
                        <p className="text-2xl font-bold text-accent">{project.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      عرض التفاصيل
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
