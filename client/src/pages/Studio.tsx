import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Download, Loader2, RefreshCw, Menu, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Studio() {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageFormat, setImageFormat] = useState<"square" | "portrait" | "landscape">("square");

  const generateImageMutation = trpc.studio.generateImage.useMutation({
    onSuccess: (data: any) => {
      setGeneratedImage(data.url || null);
      setIsLoading(false);
      toast.success("تم توليد الصورة بنجاح!");
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error((error?.message as string) || "حدث خطأ في توليد الصورة");
    },
  });

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error("الرجاء إدخال وصف الصورة");
      return;
    }

    if (!isAuthenticated) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    setIsLoading(true);
    generateImageMutation.mutate({
      prompt: prompt.trim(),
      format: imageFormat,
    });
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lamsah-design-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("تم تحميل الصورة بنجاح!");
    } catch (error) {
      toast.error("حدث خطأ في تحميل الصورة");
    }
  };

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
            <Link href="/" className="text-sm font-medium hover:text-accent transition">العودة للرئيسية</Link>
            <a href="/#tools" className="text-sm font-medium hover:text-accent transition">الأدوات</a>
            <a href="/#pricing" className="text-sm font-medium hover:text-accent transition">الأسعار</a>
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
              <Link href="/" className="block text-sm font-medium hover:text-accent">العودة للرئيسية</Link>
              <a href="/#tools" className="block text-sm font-medium hover:text-accent">الأدوات</a>
              <a href="/#pricing" className="block text-sm font-medium hover:text-accent">الأسعار</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-purple-dark opacity-30" />
        <div className="container relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-5xl font-bold">
              استوديو التصميم <span className="text-gradient-gold">الذكي</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              وليّد صور احترافية بالذكاء الاصطناعي من وصف نصي بسيط
            </p>
          </div>
        </div>
      </section>

      {/* Main Studio Section */}
      <section className="py-12 md:py-20 border-t border-border">
        <div className="container">
          {!isAuthenticated ? (
            <div className="text-center space-y-6 py-12">
              <Card className="border-border bg-card/50 backdrop-blur max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>يجب تسجيل الدخول</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    لاستخدام استوديو التصميم الذكي، يجب أن تكون مشتركاً في إحدى باقاتنا.
                  </p>
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild>
                    <a href={getLoginUrl()}>تسجيل الدخول أو إنشاء حساب</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <Card className="border-border bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>وصف الصورة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">صيغة الصورة</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["square", "portrait", "landscape"] as const).map((format) => (
                          <button
                            key={format}
                            onClick={() => setImageFormat(format)}
                            className={`p-3 rounded-lg border transition ${
                              imageFormat === format
                                ? "border-accent bg-accent/20"
                                : "border-border hover:border-accent/50"
                            }`}
                          >
                            <div className="text-xs font-medium">
                              {format === "square" && "مربع"}
                              {format === "portrait" && "عمودي"}
                              {format === "landscape" && "أفقي"}
                            </div>
                            <div className={`mt-2 mx-auto ${
                              format === "square" ? "w-12 h-12" :
                              format === "portrait" ? "w-8 h-12" :
                              "w-12 h-8"
                            } border border-muted rounded`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="prompt" className="text-sm font-medium">
                        صف الصورة التي تريدها
                      </label>
                      <Textarea
                        id="prompt"
                        placeholder="مثال: صورة منتج عطر فاخر في زجاجة ذهبية على خلفية داكنة مع إضاءة احترافية..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-32 resize-none"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>💡 نصائح للحصول على أفضل النتائج:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>كن محدداً وواضحاً في الوصف</li>
                        <li>اذكر الألوان والأسلوب المطلوب</li>
                        <li>حدد الإضاءة والخلفية</li>
                        <li>اذكر جودة الصورة (احترافية، عالية الدقة، إلخ)</li>
                      </ul>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={handleGenerateImage}
                      disabled={isLoading || !prompt.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          جاري التوليد...
                        </>
                      ) : (
                        <>
                          <span>توليد الصورة</span>
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Examples */}
                <Card className="border-border bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-base">أمثلة للأوصاف</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "عطر فاخر في زجاجة ذهبية مع ورود حمراء على خلفية سوداء",
                      "حقيبة يد جلدية بنية بتصميم عصري على طاولة خشبية",
                      "ساعة ذهبية فاخرة بتفاصيل دقيقة على خلفية بيضاء نظيفة",
                      "أحذية رياضية حديثة بألوان زاهية على خلفية رمادية",
                    ].map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPrompt(example)}
                        className="w-full text-right p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-card/50 transition text-sm"
                      >
                        {example}
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Preview Section */}
              <div className="space-y-6">
                <Card className="border-border bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>معاينة الصورة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className={`flex items-center justify-center rounded-lg bg-muted/20 ${
                        imageFormat === "square" ? "aspect-square" :
                        imageFormat === "portrait" ? "aspect-[3/4]" :
                        "aspect-video"
                      }`}>
                        <div className="text-center space-y-2">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto text-accent" />
                          <p className="text-sm text-muted-foreground">جاري توليد الصورة...</p>
                        </div>
                      </div>
                    ) : generatedImage ? (
                      <div className="space-y-4">
                        <img
                          src={generatedImage}
                          alt="Generated"
                          className={`w-full rounded-lg border border-border ${
                            imageFormat === "square" ? "aspect-square" :
                            imageFormat === "portrait" ? "aspect-[3/4]" :
                            "aspect-video"
                          } object-cover`}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={handleDownload}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            تحميل
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setGeneratedImage(null)}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            جديدة
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className={`flex items-center justify-center rounded-lg bg-muted/20 ${
                        imageFormat === "square" ? "aspect-square" :
                        imageFormat === "portrait" ? "aspect-[3/4]" :
                        "aspect-video"
                      }`}>
                        <div className="text-center space-y-2">
                          <div className="text-4xl">🎨</div>
                          <p className="text-sm text-muted-foreground">
                            أدخل وصفاً وانقر على "توليد الصورة"
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="border-border bg-accent/10">
                  <CardHeader>
                    <CardTitle className="text-base">معلومات مهمة</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2 text-muted-foreground">
                    <p>✓ الصور المولدة ملك لك بالكامل</p>
                    <p>✓ يمكنك استخدامها في متجرك بحرية</p>
                    <p>✓ جودة عالية وجاهزة للنشر الفوري</p>
                    <p>✓ لا توجد حدود على عدد الصور</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2024 لمسه Lamsah. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
