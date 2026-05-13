import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Menu,
  X,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: string;
  content: string;
  platforms: string[];
  scheduledTime: string;
  status: "scheduled" | "published" | "draft";
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const posts: Post[] = [
  {
    id: "1",
    content: "عرض صيفي حصري! اشتري الآن واحصل على خصم 40% على جميع المنتجات 🔥 #صيف_2024 #تسوق",
    platforms: ["Instagram", "Facebook", "Twitter"],
    scheduledTime: "2024-06-15 10:00",
    status: "published",
    engagement: { likes: 1245, comments: 89, shares: 156 },
  },
  {
    id: "2",
    content: "منتج جديد وصل! تعرف على أحدث تشكيلتنا من الملابس الفاخرة 👗✨ #جديد #موضة",
    platforms: ["Instagram", "TikTok"],
    scheduledTime: "2024-06-16 14:00",
    status: "scheduled",
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: "3",
    content: "شكراً لكم على الدعم المستمر! وصلنا لـ 50,000 متابع 🎉 #شكراً #مجتمعنا",
    platforms: ["Facebook", "Twitter"],
    scheduledTime: "2024-06-14 09:00",
    status: "published",
    engagement: { likes: 2341, comments: 234, shares: 456 },
  },
];

export default function SocialMedia() {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "schedule" | "analytics">("posts");
  const [postContent, setPostContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { name: "Instagram", icon: Instagram, color: "#E1306C" },
    { name: "Facebook", icon: Facebook, color: "#1877F2" },
    { name: "Twitter", icon: Twitter, color: "#1DA1F2" },
    { name: "TikTok", icon: null, color: "#000000" },
  ];

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handlePublishPost = () => {
    if (!postContent.trim()) {
      toast.error("الرجاء كتابة محتوى المنشور");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("الرجاء اختيار منصة واحدة على الأقل");
      return;
    }
    toast.success("تم نشر المنشور بنجاح!");
    setPostContent("");
    setSelectedPlatforms([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="border-border bg-card/50 backdrop-blur max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle>إدارة السوشل ميديا</CardTitle>
            <CardDescription>يجب تسجيل الدخول للوصول إلى إدارة السوشل ميديا</CardDescription>
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
            <span className="text-sm font-medium text-muted-foreground">السوشل ميديا</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setActiveTab("posts")}
              className={`text-sm font-medium transition ${
                activeTab === "posts" ? "text-accent" : "hover:text-accent"
              }`}
            >
              المنشورات
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`text-sm font-medium transition ${
                activeTab === "schedule" ? "text-accent" : "hover:text-accent"
              }`}
            >
              الجدولة
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`text-sm font-medium transition ${
                activeTab === "analytics" ? "text-accent" : "hover:text-accent"
              }`}
            >
              التحليلات
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
                  setActiveTab("posts");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-medium hover:text-accent"
              >
                المنشورات
              </button>
              <button
                onClick={() => {
                  setActiveTab("schedule");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-medium hover:text-accent"
              >
                الجدولة
              </button>
              <button
                onClick={() => {
                  setActiveTab("analytics");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-medium hover:text-accent"
              >
                التحليلات
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="container py-8">
        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div className="space-y-8">
            {/* Create Post Section */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>إنشاء منشور جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="اكتب محتوى المنشور هنا..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-32"
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">اختر المنصات</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {platforms.map((platform) => (
                      <button
                        key={platform.name}
                        onClick={() => togglePlatform(platform.name)}
                        className={`p-3 rounded-lg border transition ${
                          selectedPlatforms.includes(platform.name)
                            ? "border-accent bg-accent/20"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <div className="text-sm font-medium">{platform.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handlePublishPost}
                    className="flex-1 bg-accent hover:bg-accent/90"
                  >
                    <Plus size={18} className="ml-2" />
                    نشر الآن
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar size={18} className="ml-2" />
                    جدولة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">المنشورات الأخيرة</h2>
              {posts.map((post) => (
                <Card key={post.id} className="border-border bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <p className="text-foreground">{post.content}</p>

                      <div className="flex flex-wrap gap-2">
                        {post.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Heart size={18} className="text-accent" />
                          <div>
                            <p className="text-xs text-muted-foreground">إعجابات</p>
                            <p className="font-semibold">{post.engagement.likes}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle size={18} className="text-accent" />
                          <div>
                            <p className="text-xs text-muted-foreground">تعليقات</p>
                            <p className="font-semibold">{post.engagement.comments}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Share2 size={18} className="text-accent" />
                          <div>
                            <p className="text-xs text-muted-foreground">مشاركات</p>
                            <p className="font-semibold">{post.engagement.shares}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-accent" />
                          <div>
                            <p className="text-xs text-muted-foreground">الحالة</p>
                            <p className="font-semibold text-xs">
                              {post.status === "published" ? "منشور" : "مجدول"}
                            </p>
                          </div>
                        </div>
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

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">جدولة المنشورات</h2>
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-12">
                  جدول المنشورات المجدولة سيظهر هنا
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">تحليلات الأداء</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">إجمالي الإعجابات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3,586</div>
                  <p className="text-xs text-accent mt-2">↑ 12.5% من الأسبوع الماضي</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">إجمالي التعليقات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">323</div>
                  <p className="text-xs text-accent mt-2">↑ 8.3% من الأسبوع الماضي</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">إجمالي المشاركات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">612</div>
                  <p className="text-xs text-accent mt-2">↑ 15.7% من الأسبوع الماضي</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">معدل التفاعل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8.5%</div>
                  <p className="text-xs text-accent mt-2">↑ 2.1% من الأسبوع الماضي</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
