import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Menu, X, Zap, TrendingUp, Users, Clock, MessageSquare, Mail, Instagram, Twitter } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const robots = [
    {
      id: "seo",
      icon: "🔍",
      title: "روبوت SEO",
      subtitle: "تصدّر نتائج البحث",
      description: "يحلل متجرك ومنافسيك ويضع استراتيجية SEO متكاملة لتحسين ظهورك في Google وزيادة الزيارات العضوية بشكل مستمر",
      stats: "↑ 340%",
      label: "ظهور",
      features: ["تحليل الكلمات المفتاحية", "تحسين المحتوى", "بناء الروابط", "تقارير أداء أسبوعية"],
    },
    {
      id: "ads",
      icon: "📊",
      title: "روبوت الإعلانات",
      subtitle: "حملات تجذب وتحوّل",
      description: "يصمم ويدير حملاتك الإعلانية على Google Ads وSocial Media باستخدام تقنيات الذكاء الاصطناعي لتحقيق أعلى عائد استثمار",
      stats: "↑ 280%",
      label: "ROI",
      features: ["Google Ads", "Meta Ads", "TikTok Ads", "تحسين الميزانية"],
    },
    {
      id: "social",
      icon: "📱",
      title: "روبوت السوشل ميديا",
      subtitle: "محتوى يومي احترافي",
      description: "يضع استراتيجية كاملة لمنصات التواصل الاجتماعي وينشئ محتوى يومياً مصمم خصيصاً لجمهورك الخليجي",
      stats: "↑ 520%",
      label: "تفاعل",
      features: ["Instagram", "Twitter/X", "TikTok", "Snapchat", "جدولة النشر"],
    },
    {
      id: "assistant",
      icon: "🤖",
      title: "المساعد الخليجي",
      subtitle: "يفهمك بالكويتي والسعودي",
      description: "مساعد ذكي يتحدث اللهجة الخليجية البحتة، متاح 24/7 لإجابة أسئلتك وتقديم حلول فورية لمشاكل متجرك",
      stats: "< 3",
      label: "ثواني استجابة",
      features: ["لهجة خليجية بحتة", "دعم 24/7", "حلول فورية", "تعلم مستمر"],
    },
    {
      id: "products",
      icon: "📦",
      title: "روبوت المنتجات",
      subtitle: "محتوى منتجات يبيع",
      description: "يضيف منتجات وهمية جاهزة للتعديل ويساعدك على كتابة وصف جذاب وتصوير منتجاتك بشكل احترافي للنشر الفوري",
      stats: "+1,200",
      label: "منتج جاهز",
      features: ["وصف منتجات بالذكاء الاصطناعي", "صور منتجات", "أسعار تنافسية", "نشر تلقائي"],
    },
    {
      id: "email",
      icon: "✉️",
      title: "روبوت البريد الإلكتروني",
      subtitle: "تواصل مع عملائك باحترافية",
      description: "يصمم حملات بريد إلكتروني مخصصة لعملائك مع متابعة تلقائية وتحليل معدلات الفتح والنقر لتحسين النتائج",
      stats: "↑ 68%",
      label: "معدل الفتح",
      features: ["حملات مخصصة", "أتمتة كاملة", "تحليل الأداء", "قوالب عربية"],
    },
  ];

  const plans = [
    {
      id: "starter",
      name: "المبتدئ",
      robots: "1 روبوت",
      monthlyPrice: 599,
      yearlyPrice: 5990,
      description: "مثالي للتجار الجدد الذين يريدون البدء بالتسويق الرقمي",
      features: [
        "روبوت SEO أساسي",
        "تقرير شهري واحد",
        "دعم بريد إلكتروني",
        "تحليل 5 كلمات مفتاحية",
        "نشر 3 منشورات/أسبوع",
        "تجربة مجانية 15 يوم",
      ],
      highlighted: false,
    },
    {
      id: "growth",
      name: "النمو",
      robots: "2 روبوتات",
      monthlyPrice: 980,
      yearlyPrice: 9800,
      description: "للتجار الذين يريدون تسريع نمو متاجرهم بشكل ملحوظ",
      features: [
        "روبوت SEO متقدم",
        "روبوت السوشل ميديا",
        "تقارير أسبوعية",
        "دعم واتساب",
        "تحليل 20 كلمة مفتاحية",
        "نشر يومي على 3 منصات",
        "تجربة مجانية 15 يوم",
      ],
      highlighted: false,
    },
    {
      id: "professional",
      name: "الاحترافي",
      robots: "6 روبوتات",
      monthlyPrice: 1500,
      yearlyPrice: 15000,
      description: "الباقة الأكثر طلباً — تغطي كل احتياجات التسويق",
      features: [
        "جميع الروبوتات الـ6",
        "إدارة Google Ads",
        "حملات Meta Ads",
        "روبوت البريد الإلكتروني",
        "تصميم محتوى ذكي",
        "تقارير يومية مفصلة",
        "مساعد خليجي 24/7",
        "استشارة شهرية مع خبير",
        "تجربة مجانية 15 يوم",
      ],
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "المؤسسي",
      robots: "6 روبوتات",
      monthlyPrice: 2666,
      yearlyPrice: 26660,
      description: "للمتاجر الكبيرة التي تريد هيمنة كاملة على السوق",
      features: [
        "كل مميزات الاحترافي",
        "فريق تسويق مخصص",
        "استراتيجية شاملة مخصصة",
        "Google Analytics متقدم",
        "Google Search Console",
        "تصميم هوية بصرية كاملة",
        "متجر وهمي مع 50 منتج",
        "أكواد خصم ذكية",
        "تكامل مع سلة وزد",
        "دعم أولوية 24/7",
        "تجربة مجانية 15 يوم",
      ],
      highlighted: false,
    },
  ];

  const aiTools = [
    { id: "firefly", icon: "🔥", name: "Adobe Firefly", category: "design", description: "توليد صور احترافية بالذكاء الاصطناعي من Adobe" },
    { id: "midjourney", icon: "🎨", name: "Midjourney", category: "design", description: "أفضل أداة لتوليد الصور الفنية والإبداعية" },
    { id: "dalle", icon: "🤖", name: "DALL·E 3", category: "design", description: "توليد صور واقعية من OpenAI بدقة عالية" },
    { id: "express", icon: "⚡", name: "Adobe Express", category: "design", description: "تصميم سريع لمنشورات وقوالب السوشل ميديا" },
    { id: "canva", icon: "🖼️", name: "Canva", category: "design", description: "منصة التصميم الأشهر — قوالب جاهزة بالعربي" },
    { id: "capcut", icon: "✂️", name: "CapCut", category: "video", description: "تحرير فيديو احترافي سهل وسريع للسوشل ميديا" },
    { id: "runway", icon: "🎬", name: "Runway ML", category: "video", description: "توليد فيديوهات بالذكاء الاصطناعي — الأحدث في السوق" },
    { id: "figma", icon: "🎯", name: "Figma", category: "design", description: "تصميم واجهات وهويات بصرية احترافية بالتعاون الفوري" },
  ];

  const [toolFilter, setToolFilter] = useState<"all" | "design" | "video">("all");

  const filteredTools = toolFilter === "all" ? aiTools : aiTools.filter(tool => tool.category === toolFilter);

  const testimonials = [
    {
      name: "فهد العتيبي",
      business: "متجر العتيبي للعطور",
      plan: "باقة الاحترافي",
      stats: "+320%",
      label: "مبيعات",
      quote: "والله من يوم ما اشتركت في لمسه تغير وضع متجري كلياً. الروبوت الخليجي يفهمني زين وعطاني حلول ما كنت أتوقعها. مبيعاتي زادت أكثر من 300% في 3 أشهر.",
      initial: "ف",
    },
    {
      name: "نورة المطيري",
      business: "بوتيك نورة للأزياء",
      plan: "باقة المؤسسي",
      stats: "+180%",
      label: "تفاعل",
      quote: "استوديو التصميم شي ما توقعته — صممت هوية متجري كاملة في يوم واحد! والحملات الإعلانية تشتغل لحالها بدون ما أتدخل.",
      initial: "ن",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gradient-gold">لمسه</div>
            <span className="text-sm font-medium text-muted-foreground">LAMSAH</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-accent transition">الخدمات</a>
            <a href="#pricing" className="text-sm font-medium hover:text-accent transition">الأسعار</a>
            <a href="#tools" className="text-sm font-medium hover:text-accent transition">الأدوات</a>
            <Link href="/store" className="text-sm font-medium hover:text-accent transition">المتجر</Link>
            <a href="#contact" className="text-sm font-medium hover:text-accent transition">التواصل</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>تسجيل الخروج</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <a href={getLoginUrl()}>تسجيل الدخول</a>
                </Button>
                <Button size="sm" className="bg-accent hover:bg-accent/90" asChild>
                  <a href={getLoginUrl()}>ابدأ مجاناً</a>
                </Button>
              </>
            )}
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
              <a href="#services" className="block text-sm font-medium hover:text-accent">الخدمات</a>
              <a href="#pricing" className="block text-sm font-medium hover:text-accent">الأسعار</a>
              <a href="#tools" className="block text-sm font-medium hover:text-accent">الأدوات</a>
              <Link href="/store" className="block text-sm font-medium hover:text-accent">المتجر</Link>
              <a href="#contact" className="block text-sm font-medium hover:text-accent">التواصل</a>
              {isAuthenticated ? (
                <Button variant="outline" size="sm" onClick={logout} className="w-full">تسجيل الخروج</Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <a href={getLoginUrl()}>تسجيل الدخول</a>
                  </Button>
                  <Button size="sm" className="w-full bg-accent hover:bg-accent/90" asChild>
                    <a href={getLoginUrl()}>ابدأ مجاناً</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-purple-dark opacity-50" />
        <div className="container relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/10">
                <span className="text-sm font-medium text-accent">منصة التسويق الذكي رقم #1 في الخليج</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                ارفع مستوى <span className="text-gradient-gold">ظهورك</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                بذكاء اصطناعي متقدم
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                روبوتات ذكية متخصصة تعمل على مدار الساعة لتحسين ظهورك، إنشاء حملاتك، وتصميم محتواك التسويقي باحترافية تامة
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              <div className="p-4 rounded-lg border border-border bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-accent">+2,400</div>
                <div className="text-sm text-muted-foreground">تاجر نشط</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">رضا العملاء</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">دعم ذكي</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-accent">+340%</div>
                <div className="text-sm text-muted-foreground">نمو المبيعات</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                <a href={getLoginUrl()}>ابدأ تجربتك المجانية 15 يوم</a>
              </Button>
              <Button size="lg" variant="outline">
                شاهد كيف تعمل المنصة
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              تجربة مجانية 15 يوماً — بدون بطاقة ائتمان
            </p>
          </div>
        </div>
      </section>

      {/* Robots Section */}
      <section id="services" className="py-20 md:py-32 border-t border-border">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">روبوتات ذكية متخصصة</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              6 روبوتات ذكية تعمل لأجلك — كل روبوت متخصص في مجاله، يعمل تلقائياً بدون تدخل منك، ويقدم نتائج قابلة للقياس
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {robots.map((robot) => (
              <Card key={robot.id} className="border-border bg-card/50 backdrop-blur hover:border-accent/50 transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="text-4xl">{robot.icon}</div>
                      <CardTitle className="text-xl">{robot.title}</CardTitle>
                      <CardDescription className="text-accent">{robot.subtitle}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{robot.stats}</div>
                      <div className="text-xs text-muted-foreground">{robot.label}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{robot.description}</p>
                  <div className="space-y-2">
                    {robot.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">عرض التفاصيل</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              فعّل جميع الروبوتات الآن
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 border-t border-border bg-card/30">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">باقات الاشتراك</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اختر الباقة المناسبة لك — جميع الباقات تشمل تجربة مجانية لمدة 15 يوماً بدون أي التزام
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-4">
            <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
              شهري
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-accent" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-1" : "-translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
              سنوي
            </span>
            {billingCycle === "yearly" && (
              <span className="ml-2 inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                -20%
              </span>
            )}
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
              const displayPrice = billingCycle === "yearly" ? Math.floor(price / 12) : price;

              return (
                <Card
                  key={plan.id}
                  className={`relative border transition-all ${
                    plan.highlighted
                      ? "border-accent bg-card lg:scale-105 shadow-lg shadow-accent/20"
                      : "border-border bg-card/50 backdrop-blur"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-block px-3 py-1 rounded-full bg-accent text-background text-xs font-bold">
                        ⭐ الأكثر طلباً
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.robots}</CardDescription>
                    <div className="pt-4">
                      <span className="text-3xl font-bold">{displayPrice}</span>
                      <span className="text-muted-foreground mr-2">ر.س</span>
                      <span className="text-sm text-muted-foreground">
                        {billingCycle === "monthly" ? "/ شهر" : "/ شهر"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Button
                      size="lg"
                      className={`w-full ${
                        plan.highlighted
                          ? "bg-accent hover:bg-accent/90"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                      asChild
                    >
                      <a href={getLoginUrl()}>ابدأ التجربة المجانية</a>
                    </Button>
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <Zap size={16} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            جميع الأسعار بالريال السعودي. الاشتراك يُجدد تلقائياً ويمكن إلغاؤه في أي وقت.
          </p>
        </div>
      </section>

      {/* AI Tools Section */}
      <section id="tools" className="py-20 md:py-32 border-t border-border">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">أقوى أدوات التصميم في مكان واحد</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              وصول مباشر لأفضل أدوات التصميم والفيديو المدعومة بالذكاء الاصطناعي
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            {["all", "design", "video"].map((filter) => (
              <Button
                key={filter}
                variant={toolFilter === filter ? "default" : "outline"}
                onClick={() => setToolFilter(filter as any)}
                className={toolFilter === filter ? "bg-accent hover:bg-accent/90" : ""}
              >
                {filter === "all" ? "جميع الأدوات" : filter === "design" ? "التصميم" : "الفيديو"}
              </Button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="border-border bg-card/50 backdrop-blur hover:border-accent/50 transition">
                <CardHeader>
                  <div className="text-4xl mb-2">{tool.icon}</div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-xs">{tool.category === "design" ? "تصميم" : "فيديو"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    تشغيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Studio & Store CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <Card className="border-accent bg-gradient-to-r from-accent/10 to-transparent p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">استوديو التصميم الذكي</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                وليد صور احترافية بالذكاء الاصطناعي
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                <Link href="/studio">دخول الاستوديو</Link>
              </Button>
            </Card>
            <Card className="border-accent bg-gradient-to-r from-accent/10 to-transparent p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">متجر لمسة</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                اطلع على متجرنا الوهمي بمنتجات فاخرة
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                <Link href="/store">الذهاب للمتجر</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 border-t border-border bg-card/30">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">آراء عملائنا</h2>
            <p className="text-lg text-muted-foreground">تجار يثقون في لمسه</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.business}</CardDescription>
                      <div className="text-xs text-accent mt-1">{testimonial.plan}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{testimonial.stats}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.label}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 border-t border-border">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">تواصل معنا</h2>
            <p className="text-lg text-muted-foreground">نحن هنا لمساعدتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-accent mb-2" />
                <CardTitle>واتساب</CardTitle>
                <CardDescription>تواصل فوري مع فريقنا</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-4">+966 508 047 159</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://wa.me/966508047159" target="_blank" rel="noopener noreferrer">
                    تحدث الآن
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <Mail className="w-8 h-8 text-accent mb-2" />
                <CardTitle>البريد الإلكتروني</CardTitle>
                <CardDescription>للاستفسارات والشكاوى</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-4">zoooz2426@gmail.com</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:zoooz2426@gmail.com">أرسل رسالة</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://wa.me/966508047159" target="_blank" rel="noopener noreferrer" title="واتساب">
                <MessageSquare size={20} />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:zoooz2426@gmail.com" title="البريد الإلكتروني">
                <Mail size={20} />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="انستغرام">
                <Instagram size={20} />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="تويتر">
                <Twitter size={20} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-bold">الخدمات</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-accent transition">روبوت SEO</a></li>
                <li><a href="#services" className="hover:text-accent transition">إدارة الإعلانات</a></li>
                <li><a href="#services" className="hover:text-accent transition">السوشل ميديا</a></li>
                <li><a href="#services" className="hover:text-accent transition">البريد الإلكتروني</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold">الأسعار</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#pricing" className="hover:text-accent transition">المبتدئ</a></li>
                <li><a href="#pricing" className="hover:text-accent transition">النمو</a></li>
                <li><a href="#pricing" className="hover:text-accent transition">الاحترافي</a></li>
                <li><a href="#pricing" className="hover:text-accent transition">المؤسسي</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold">الأدوات</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#tools" className="hover:text-accent transition">استوديو التصميم</a></li>
                <li><a href="#tools" className="hover:text-accent transition">أدوات التصميم</a></li>
                <li><a href="#tools" className="hover:text-accent transition">أدوات الفيديو</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold">قانوني</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-accent transition">الشروط والأحكام</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 لمسه Lamsah. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
