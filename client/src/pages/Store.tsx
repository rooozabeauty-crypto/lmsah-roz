import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ShoppingCart, Heart, Star, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "عطر فاخر ذهبي",
    category: "عطور",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 245,
    inStock: true,
    badge: "خصم 25%",
  },
  {
    id: "2",
    name: "حقيبة يد جلدية بنية",
    category: "حقائب",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    badge: "جديد",
  },
  {
    id: "3",
    name: "ساعة ذهبية فاخرة",
    category: "ساعات",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1523170335684-f042070fe1c7?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 342,
    inStock: true,
    badge: "الأكثر طلباً",
  },
  {
    id: "4",
    name: "نظارة شمسية عصرية",
    category: "نظارات",
    price: 399,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 156,
    inStock: true,
  },
  {
    id: "5",
    name: "حذاء رياضي أنيق",
    category: "أحذية",
    price: 449,
    originalPrice: 649,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 267,
    inStock: true,
    badge: "خصم 30%",
  },
  {
    id: "6",
    name: "محفظة جلدية سوداء",
    category: "محافظ",
    price: 199,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 123,
    inStock: true,
  },
  {
    id: "7",
    name: "عطر بنفسجي فاخر",
    category: "عطور",
    price: 349,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 198,
    inStock: true,
    badge: "خصم 30%",
  },
  {
    id: "8",
    name: "سوار ذهبي أنيق",
    category: "مجوهرات",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 287,
    inStock: true,
    badge: "جديد",
  },
];

export default function Store() {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = ["all", "عطور", "حقائب", "ساعات", "نظارات", "أحذية", "محافظ", "مجوهرات"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.includes(searchQuery) || product.category.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gradient-gold">لمسه</div>
            <span className="text-sm font-medium text-muted-foreground">STORE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-accent transition">الرئيسية</Link>
            <Link href="/studio" className="text-sm font-medium hover:text-accent transition">الاستوديو</Link>
            <a href="/#pricing" className="text-sm font-medium hover:text-accent transition">الأسعار</a>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted rounded-lg transition">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="container py-4 space-y-3">
              <Link href="/" className="block text-sm font-medium hover:text-accent">الرئيسية</Link>
              <Link href="/studio" className="block text-sm font-medium hover:text-accent">الاستوديو</Link>
              <a href="/#pricing" className="block text-sm font-medium hover:text-accent">الأسعار</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden border-b border-border">
        <div className="absolute inset-0 gradient-purple-dark opacity-20" />
        <div className="container relative z-10">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              متجر <span className="text-gradient-gold">لمسة</span> الفاخر
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              منتجات فاخرة واحترافية مختارة بعناية لعملائنا الكرام
            </p>
          </div>
        </div>
      </section>

      {/* Main Store Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <Card className="border-border bg-card/50 backdrop-blur sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter size={18} />
                    التصفية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البحث</label>
                    <div className="relative">
                      <Search size={16} className="absolute right-3 top-3 text-muted-foreground" />
                      <Input
                        placeholder="ابحث عن منتج..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-8"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الفئات</label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-right px-3 py-2 rounded-lg border transition text-sm ${
                            selectedCategory === category
                              ? "border-accent bg-accent/20 text-accent font-medium"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          {category === "all" ? "جميع المنتجات" : category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نطاق السعر</label>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>من 100 ر.س إلى 1500 ر.س</div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-3/4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Results Count */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    عرض {filteredProducts.length} من {products.length} منتج
                  </p>
                  <select className="px-3 py-2 rounded-lg border border-border bg-card text-sm">
                    <option>الأحدث</option>
                    <option>الأكثر مبيعاً</option>
                    <option>السعر: من الأقل للأعلى</option>
                    <option>السعر: من الأعلى للأقل</option>
                  </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="border-border bg-card/50 backdrop-blur hover:border-accent/50 transition overflow-hidden group">
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-muted h-64">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                        {product.badge && (
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent text-background text-xs font-bold">
                            {product.badge}
                          </div>
                        )}
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-3 left-3 p-2 rounded-full bg-background/80 hover:bg-background transition"
                        >
                          <Heart
                            size={18}
                            className={favorites.has(product.id) ? "fill-accent text-accent" : "text-muted-foreground"}
                          />
                        </button>
                      </div>

                      <CardHeader className="pb-3">
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">{product.category}</div>
                          <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{product.price}</span>
                          <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                          <span className="text-xs text-accent font-semibold">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        </div>

                        {/* Stock Status */}
                        <div className="text-xs">
                          {product.inStock ? (
                            <span className="text-accent font-medium">متوفر في المخزون</span>
                          ) : (
                            <span className="text-destructive font-medium">غير متوفر حالياً</span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          size="sm"
                          className="w-full bg-accent hover:bg-accent/90"
                          onClick={addToCart}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart size={16} className="ml-2" />
                          أضف للسلة
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-muted-foreground">لم نجد منتجات تطابق بحثك</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="mt-4"
                    >
                      إعادة تعيين الفلاتر
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 border-t border-border bg-card/30">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            هل تريد متجراً مثل هذا لعملك؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            منصة لمسة توفر لك كل الأدوات التي تحتاجها لإدارة متجرك بكفاءة وزيادة مبيعاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <a href={getLoginUrl()}>ابدأ تجربتك المجانية</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">اعرف المزيد</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2024 لمسه Lamsah Store. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
