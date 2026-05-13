import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Menu, X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "كيف أزيد مبيعاتي في الصيف؟",
  "ما أفضل استراتيجية للسوشل ميديا؟",
  "كيف أحسّن معدل التحويل؟",
  "ما أفضل وقت للإعلان على Instagram؟",
  "كيف أتعامل مع العملاء الغاضبين؟",
  "ما أفضل الكلمات المفتاحية للبحث؟",
];

const assistantResponses: { [key: string]: string } = {
  "مبيعات": "يا هلا! 🎉 لتزيد المبيعات في الصيف، أنصحك بـ:\n1. ركز على الحملات الموسمية\n2. استخدم عروض محدودة الوقت\n3. استهدف الفئات العمرية المناسبة\n4. اجعل الشحن مجاني للطلبات الكبيرة\n\nتبي أساعدك في حملة معينة؟",
  "سوشل": "حبيبي! 💪 أفضل استراتيجية للسوشل ميديا:\n1. انشر 3-4 مرات يومياً\n2. تفاعل مع التعليقات فوراً\n3. استخدم الهاشتاجات الصحيحة\n4. اصنع محتوى حصري وقيّم\n5. استخدم الفيديوهات والقصص\n\nأي منصة تركز عليها أكثر؟",
  "تحويل": "ممتاز! 🚀 لتحسين معدل التحويل:\n1. اجعل الموقع سريع التحميل\n2. اختصر خطوات الشراء\n3. أضف صور عالية الجودة\n4. اكتب وصف منتج مقنع\n5. أضف تقييمات العملاء\n\nتبي نصائح أكثر تفصيلاً؟",
  "إعلان": "يا الله! 📱 أفضل وقت للإعلان:\n- Instagram: 11 صباحاً و 7 مساءً\n- Facebook: 1 ظهراً و 8 مساءً\n- TikTok: 6-10 مساءً\n- LinkedIn: 8-10 صباحاً\n\nاختار الوقت حسب جمهورك! 😊",
  "عملاء": "لا تقلق! 💙 في التعامل مع العملاء الغاضبين:\n1. استمع لشكواهم بصبر\n2. اعتذر بصدق\n3. قدم حل فوري\n4. تابع معهم بعدها\n5. أعطهم خصم أو هدية\n\nكل عميل غاضب يمكن يصير مشجع! 🌟",
  "كلمات": "حكيم! 🎯 أفضل الكلمات المفتاحية:\n1. ابحث عن كلمات بحجم بحث عالي\n2. استخدم أدوات مثل Google Keyword Planner\n3. ركز على كلمات طويلة الذيل\n4. تنافس على كلمات ذات CPC منخفض\n5. راقب كلمات المنافسين\n\nتبي أساعدك في البحث؟",
};

export default function AIAssistant() {
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `السلام عليكم ورحمة الله وبركاته! 👋\n\nأنا مساعدك الذكي من لمسة، هنا لأساعدك في تطوير متجرك وزيادة مبيعاتك! 🚀\n\nأنا متخصص في:\n✨ استراتيجيات التسويق الرقمي\n📱 إدارة السوشل ميديا\n💰 زيادة الأرباح والمبيعات\n🎯 تحسين معدل التحويل\n📊 تحليل البيانات والأداء\n\nشنو أول سؤال عندك؟ 😊`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      let responseText = "شكراً على السؤال! 😊\n\n";

      // Find matching response
      let found = false;
      for (const [key, value] of Object.entries(assistantResponses)) {
        if (messageText.includes(key)) {
          responseText = value;
          found = true;
          break;
        }
      }

      if (!found) {
        responseText = `يا الله! سؤال حلو! 🤔\n\nأنا هنا لأساعدك في كل شيء يتعلق بمتجرك والتسويق. إذا كان عندك أسئلة محددة عن:\n- زيادة المبيعات\n- استراتيجيات التسويق\n- إدارة السوشل ميديا\n- تحسين الأداء\n\nأنا جاهز أساعدك! 💪`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="border-border bg-card/50 backdrop-blur max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle>المساعد الذكي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">يجب تسجيل الدخول للتحدث مع المساعد الذكي</p>
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild>
              <a href={getLoginUrl()}>تسجيل الدخول</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gradient-gold">لمسه</div>
            <span className="text-sm font-medium text-muted-foreground">المساعد الذكي</span>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Main Chat Area */}
      <div className="flex-1 container py-6 flex flex-col gap-6">
        {messages.length === 1 && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">كيف أساعدك؟ 🤖</h1>
            <p className="text-muted-foreground">اختر من الأسئلة الشائعة أو اكتب سؤالك الخاص</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(question)}
                  className="p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-card/50 transition text-right"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.length > 1 && (
          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-md lg:max-w-2xl p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-accent/20 text-foreground rounded-bl-none"
                      : "bg-card/50 border border-border rounded-br-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString("ar-SA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-card/50 border border-border p-4 rounded-lg rounded-br-none">
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <div className="flex gap-2">
            <Input
              placeholder="اكتب سؤالك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="bg-accent hover:bg-accent/90"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            💡 المساعد الذكي متاح 24/7 لمساعدتك في جميع أسئلتك التسويقية
          </p>
        </div>
      </div>
    </div>
  );
}
