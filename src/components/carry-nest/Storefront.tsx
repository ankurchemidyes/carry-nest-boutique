import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BagPreview3D } from "@/components/carry-nest/BagPreview3D";
import { CatalogImage } from "@/components/carry-nest/CatalogImage";
import { useCart } from "@/components/carry-nest/cart";
import { categories, formatINR, products, type Product } from "@/lib/catalog";

const heroColors = [
  { name: "Burgundy", value: "#641f31" },
  { name: "Espresso", value: "#3b2924" },
  { name: "Rose", value: "#bd8790" },
];

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Carry Nest home">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/70 font-display text-sm font-semibold text-burgundy transition-transform group-hover:rotate-6">
        CN
      </span>
      {!compact && (
        <span className="font-display text-[1.45rem] leading-none tracking-[-0.02em] text-burgundy">
          Carry Nest
        </span>
      )}
    </Link>
  );
}

export function StorefrontHeader({ onAccount }: { onAccount: () => void }) {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-burgundy/10 bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex h-[4.75rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-9">
            <button type="button" className="icon-button lg:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
              <Menu size={19} />
            </button>
            <BrandMark />
            <nav className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.16em] text-foreground/70 lg:flex" aria-label="Main navigation">
              <a href="#collection" className="transition-colors hover:text-burgundy">Shop</a>
              <a href="#story" className="transition-colors hover:text-burgundy">The story</a>
              <a href="#care" className="transition-colors hover:text-burgundy">Care notes</a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="icon-button" aria-label="Account" onClick={onAccount}><CircleUserRound size={19} /></button>
            <button type="button" className="icon-button relative" aria-label={`Shopping bag, ${count} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={19} />
              {count > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[9px] text-ivory">{count}</span>}
            </button>
          </div>
        </div>
      </header>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[min(86vw,22rem)] bg-ivory p-7">
          <SheetHeader><SheetTitle className="font-display text-2xl text-burgundy">Carry Nest</SheetTitle><SheetDescription className="text-foreground/60">Carry what you love.</SheetDescription></SheetHeader>
          <nav className="mt-10 grid gap-5 font-display text-2xl text-burgundy" aria-label="Mobile navigation">
            <a href="#collection" onClick={() => setMobileOpen(false)}>Shop the collection</a>
            <a href="#story" onClick={() => setMobileOpen(false)}>The story</a>
            <a href="#care" onClick={() => setMobileOpen(false)}>Care notes</a>
          </nav>
        </SheetContent>
      </Sheet>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}

function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col bg-ivory px-6 pb-6 pt-10 sm:max-w-[28rem]">
        <SheetHeader className="border-b border-burgundy/10 pb-5 text-left"><SheetTitle className="font-display text-3xl text-burgundy">Your bag</SheetTitle><SheetDescription className="text-foreground/60">A quiet place for your considered pieces.</SheetDescription></SheetHeader>
        <div className="flex-1 overflow-auto py-5">
          {items.length === 0 ? (
            <div className="flex min-h-[18rem] flex-col items-center justify-center text-center"><ShoppingBag className="mb-5 text-gold" size={30} strokeWidth={1.2} /><p className="font-display text-2xl text-burgundy">Your bag is waiting.</p><p className="mt-2 max-w-[15rem] text-sm leading-6 text-foreground/60">Explore the collection and choose something made for your everyday.</p></div>
          ) : items.map((item) => (
            <div key={`${item.product.slug}-${item.color}`} className="flex gap-4 border-b border-burgundy/10 py-4 first:pt-0">
              <CatalogImage product={item.product} className="h-24 w-20 shrink-0" />
              <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><p className="font-display text-lg text-burgundy">{item.product.name}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-foreground/50">{item.color}</p></div><button type="button" className="text-foreground/45 transition-colors hover:text-burgundy" aria-label={`Remove ${item.product.name}`} onClick={() => removeItem(item.product.slug, item.color)}><X size={16} /></button></div><div className="mt-4 flex items-center justify-between"><div className="flex items-center border border-burgundy/15"><button type="button" className="p-2 text-burgundy" onClick={() => updateQuantity(item.product.slug, item.color, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={13} /></button><span className="min-w-7 text-center text-xs">{item.quantity}</span><button type="button" className="p-2 text-burgundy" onClick={() => updateQuantity(item.product.slug, item.color, item.quantity + 1)} aria-label="Increase quantity"><Plus size={13} /></button></div><span className="text-sm font-medium text-burgundy">{formatINR(item.product.price * item.quantity)}</span></div></div>
            </div>
          ))}
        </div>
        <div className="border-t border-burgundy/10 pt-5"><div className="flex items-center justify-between text-sm"><span className="text-foreground/60">Subtotal</span><span className="font-display text-2xl text-burgundy">{formatINR(subtotal)}</span></div><p className="mt-2 text-xs leading-5 text-foreground/50">Sample pricing only. Taxes and delivery are not calculated.</p><Button className="mt-5 h-12 w-full rounded-none bg-burgundy text-ivory hover:bg-burgundy/90" disabled>Checkout unavailable</Button></div>
      </SheetContent>
    </Sheet>
  );
}

function AccountDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => { if (active) setUserEmail(data.user?.email ?? null); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUserEmail(session?.user?.email ?? null));
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  async function signInWithGoogle() {
    setLoading(true); setError(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setError(result.error.message);
    setLoading(false);
  }

  async function signOut() {
    setLoading(true); setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError.message);
    setLoading(false);
  }

  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="border-burgundy/10 bg-ivory sm:max-w-md"><DialogHeader><DialogTitle className="font-display text-3xl text-burgundy">Your Carry Nest</DialogTitle><DialogDescription className="text-foreground/60">Save your details for a smoother future shopping experience.</DialogDescription></DialogHeader>{userEmail ? <div className="mt-4"><p className="text-sm text-foreground/70">Signed in as <span className="font-medium text-burgundy">{userEmail}</span></p><Button variant="outline" className="mt-6 w-full rounded-none border-burgundy/20 text-burgundy" onClick={() => void signOut()} disabled={loading}>Sign out</Button></div> : <div className="mt-4"><Button className="h-12 w-full rounded-none bg-burgundy text-ivory hover:bg-burgundy/90" onClick={() => void signInWithGoogle()} disabled={loading}>{loading ? "Opening Google…" : "Continue with Google"}</Button><div className="mt-5 grid gap-2 text-sm"><div className="flex items-center justify-between border border-burgundy/10 px-4 py-3 text-foreground/45"><span>Continue with GitHub</span><span className="text-[10px] uppercase tracking-[0.15em]">Unavailable</span></div><div className="flex items-center justify-between border border-burgundy/10 px-4 py-3 text-foreground/45"><span>Continue with Discord</span><span className="text-[10px] uppercase tracking-[0.15em]">Unavailable</span></div></div></div>}{error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}</DialogContent></Dialog>;
}

function ProductCard({ product, onQuickView }: { product: Product; onQuickView: (product: Product) => void }) {
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0]?.name ?? "Burgundy");
  return <article className="group"><Link to="/product/$slug" params={{ slug: product.slug }} className="block"><div className="relative overflow-hidden bg-blush/20"><CatalogImage product={product} className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.03]" /><span className="absolute left-3 top-3 bg-ivory/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.17em] text-burgundy">Sample concept</span><button type="button" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 text-burgundy opacity-0 transition-opacity hover:bg-ivory group-hover:opacity-100" aria-label={`Save ${product.name}`} onClick={(event) => event.preventDefault()}><Heart size={15} /></button></div></Link><div className="pt-4"><div className="flex items-start justify-between gap-4"><div><Link to="/product/$slug" params={{ slug: product.slug }} className="font-display text-[1.35rem] text-burgundy hover:underline">{product.name}</Link><p className="mt-1 text-sm text-foreground/55">{product.category}</p></div><span className="text-sm font-medium text-burgundy">{formatINR(product.price)}</span></div><p className="mt-3 line-clamp-2 text-sm leading-6 text-foreground/60">{product.tagline}</p><div className="mt-4 flex items-center gap-2"><div className="flex gap-1.5" aria-label="Available colors">{product.colors.map((option) => <button type="button" key={option.name} className={`color-swatch ${color === option.name ? "ring-2 ring-burgundy ring-offset-2 ring-offset-ivory" : ""}`} style={{ backgroundColor: option.value }} aria-label={`Choose ${option.name}`} onClick={() => setColor(option.name)} />)}</div><div className="ml-auto flex gap-2"><button type="button" className="text-xs font-medium uppercase tracking-[0.12em] text-burgundy underline-offset-4 hover:underline" onClick={() => onQuickView(product)}>Quick view</button><button type="button" className="text-xs font-medium uppercase tracking-[0.12em] text-burgundy underline-offset-4 hover:underline" onClick={() => addItem(product, color)}>Add to bag</button></div></div></div></article>;
}

function QuickView({ product, open, onOpenChange }: { product: Product | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { addItem } = useCart();
  const [color, setColor] = useState(product?.colors[0]?.name ?? "");
  useEffect(() => { setColor(product?.colors[0]?.name ?? ""); }, [product]);
  if (!product) return null;
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[92vh] overflow-auto border-burgundy/10 bg-ivory sm:max-w-3xl"><div className="grid gap-7 sm:grid-cols-2"><CatalogImage product={product} className="aspect-[4/5]" /><div className="flex flex-col justify-center"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">{product.category} · sample concept</p><DialogTitle className="mt-3 font-display text-4xl leading-none text-burgundy">{product.name}</DialogTitle><p className="mt-4 text-2xl text-burgundy">{formatINR(product.price)}</p><DialogDescription className="mt-5 text-sm leading-7 text-foreground/65">{product.description}</DialogDescription><div className="mt-7"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50">Color · {color}</p><div className="mt-3 flex gap-3">{product.colors.map((option) => <button type="button" key={option.name} className={`color-swatch h-8 w-8 ${color === option.name ? "ring-2 ring-burgundy ring-offset-2 ring-offset-ivory" : ""}`} style={{ backgroundColor: option.value }} aria-label={`Choose ${option.name}`} onClick={() => setColor(option.name)} />)}</div></div><Button className="mt-8 h-12 rounded-none bg-burgundy text-ivory hover:bg-burgundy/90" onClick={() => { addItem(product, color); onOpenChange(false); }}>Add to bag <ShoppingBag size={16} /></Button><Link to="/product/$slug" params={{ slug: product.slug }} className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-burgundy underline-offset-4 hover:underline">View full details</Link></div></div></DialogContent></Dialog>;
}

export function Storefront() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All pieces");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [heroColor, setHeroColor] = useState(heroColors[0]?.value ?? "#641f31");
  const [paused, setPaused] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const filteredProducts = useMemo(() => products.filter((product) => (selectedCategory === "All pieces" || product.category === selectedCategory) && `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : 0), [search, selectedCategory, sort]);

  return <div className="min-h-screen bg-ivory text-foreground"><StorefrontHeader onAccount={() => setAccountOpen(true)} /><main><section className="border-b border-burgundy/10 bg-blush/25"><div className="mx-auto grid max-w-[1440px] items-stretch lg:grid-cols-[0.82fr_1.18fr]"><div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><p className="eyebrow">Carry Nest · Spring study 01</p><h1 className="mt-6 max-w-xl font-display text-[clamp(3.5rem,7vw,7.2rem)] leading-[0.9] tracking-[-0.055em] text-burgundy">A place for everything you love.</h1><p className="mt-7 max-w-md text-base leading-7 text-foreground/65">Thoughtful silhouettes, tactile finishes, and a little room for the everyday rituals that make a life yours.</p><div className="mt-9 flex flex-wrap items-center gap-3"><a href="#collection" className="inline-flex h-12 items-center gap-3 bg-burgundy px-6 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-burgundy/90">Shop the collection <ArrowRight size={16} /></a><a href="#concept" className="inline-flex h-12 items-center gap-3 border border-burgundy/20 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-burgundy transition-colors hover:bg-ivory">Explore in 3D <Sparkles size={15} /></a></div><p className="mt-8 max-w-sm text-xs leading-5 text-foreground/45">Sample collection for brand direction · prices and product details are placeholders until real inventory is supplied.</p></div><div id="concept" className="min-h-[520px] border-t border-burgundy/10 lg:border-l lg:border-t-0"><div className="flex items-center justify-between border-b border-burgundy/10 px-6 py-4 sm:px-10"><div><p className="eyebrow">The Muse · concept model</p><p className="mt-1 text-sm text-foreground/55">A tactile study in form and finish</p></div><div className="flex gap-2">{heroColors.map((option) => <button type="button" key={option.name} className={`color-swatch h-7 w-7 ${heroColor === option.value ? "ring-2 ring-burgundy ring-offset-2 ring-offset-blush/25" : ""}`} style={{ backgroundColor: option.value }} aria-label={`Show ${option.name} concept`} onClick={() => setHeroColor(option.value)} />)}</div></div><div className="h-[calc(100%-73px)]"><BagPreview3D color={heroColor} paused={paused} onPauseChange={setPaused} /></div></div></div></section><section id="collection" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="flex flex-col justify-between gap-7 border-b border-burgundy/10 pb-8 lg:flex-row lg:items-end"><div><p className="eyebrow">The collection</p><h2 className="mt-4 font-display text-5xl tracking-[-0.04em] text-burgundy sm:text-6xl">Designed to be lived with.</h2></div><div className="flex max-w-md items-start gap-3 text-sm leading-6 text-foreground/55"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />Every piece here is a sample concept—an invitation to refine the collection with your real inventory, materials, and specifications.</div></div><div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><div className="flex gap-2 overflow-x-auto pb-2">{categories.map((category) => <button type="button" key={category} className={`whitespace-nowrap border px-4 py-2 text-xs font-semibold uppercase tracking-[0.13em] transition-colors ${selectedCategory === category ? "border-burgundy bg-burgundy text-ivory" : "border-burgundy/15 text-burgundy hover:border-burgundy/40"}`} onClick={() => setSelectedCategory(category)}>{category}</button>)}</div><div className="flex flex-wrap gap-3"><label className="relative flex min-w-[15rem] items-center border-b border-burgundy/20"><Search size={16} className="mr-2 text-foreground/45" /><span className="sr-only">Search collection</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-foreground/40" /></label><label className="relative flex items-center border-b border-burgundy/20"><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 appearance-none bg-transparent pr-7 text-xs font-semibold uppercase tracking-[0.12em] text-burgundy outline-none"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={14} className="pointer-events-none absolute right-0 text-burgundy" /></label></div></div>{filteredProducts.length ? <div className="mt-10 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">{filteredProducts.map((product) => <ProductCard key={product.slug} product={product} onQuickView={setQuickView} />)}</div> : <div className="py-24 text-center"><p className="font-display text-3xl text-burgundy">Nothing found in this edit.</p><p className="mt-2 text-sm text-foreground/55">Try another search or return to all pieces.</p></div>}</section><section id="story" className="border-y border-burgundy/10 bg-burgundy px-5 py-20 text-ivory sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="eyebrow text-ivory/60">A slower kind of luxury</p><h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl">Objects with a little more feeling.</h2></div><div className="max-w-md"><p className="text-base leading-8 text-ivory/75">Carry Nest is a study in everyday elegance: considered proportions, warm materials, and the space to make something your own.</p><p className="mt-5 text-sm leading-7 text-ivory/55">This first release is a visual direction, not a claim of available stock. Real product details, pricing, and care notes should replace the sample fields before launch.</p></div></div></section><section id="care" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="grid gap-8 md:grid-cols-3"><div className="border-t border-burgundy/20 pt-5"><p className="eyebrow">01 · Material</p><h3 className="mt-4 font-display text-3xl text-burgundy">Made for touch.</h3><p className="mt-3 text-sm leading-7 text-foreground/60">Texture, stitching, and hardware are part of the design conversation from the very first sketch.</p></div><div className="border-t border-burgundy/20 pt-5"><p className="eyebrow">02 · Rhythm</p><h3 className="mt-4 font-display text-3xl text-burgundy">For the way days move.</h3><p className="mt-3 text-sm leading-7 text-foreground/60">A collection should feel as natural at a morning desk as it does just before the lights go down.</p></div><div className="border-t border-burgundy/20 pt-5"><p className="eyebrow">03 · Care</p><h3 className="mt-4 font-display text-3xl text-burgundy">Details, honestly held.</h3><p className="mt-3 text-sm leading-7 text-foreground/60">Material and care information remains clearly marked as coming soon until the final specifications are confirmed.</p></div></div></section></main><footer className="border-t border-burgundy/10 px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 text-xs text-foreground/50 sm:flex-row sm:items-center"><BrandMark compact /><p>Carry what you love. © 2026 Carry Nest.</p><p>Sample storefront · checkout unavailable</p></div></footer><AccountDialog open={accountOpen} onOpenChange={setAccountOpen} /><QuickView product={quickView} open={Boolean(quickView)} onOpenChange={(open) => { if (!open) setQuickView(null); }} /></div>;
}

export function ProductDetailView({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [heroColor, setHeroColor] = useState(heroColors.find((option) => option.name === color)?.value ?? heroColors[0]?.value ?? "#641f31");
  const [accountOpen, setAccountOpen] = useState(false);
  const colorOption = product.colors.find((option) => option.name === color);
  return <div className="min-h-screen bg-ivory text-foreground"><StorefrontHeader onAccount={() => setAccountOpen(true)} /><main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16"><Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-burgundy"><ChevronLeft size={15} /> Back to collection</Link><div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20"><div className="grid gap-4 sm:grid-cols-[0.22fr_0.78fr]"><div className="hidden gap-4 sm:grid sm:content-start"><CatalogImage product={product} className="aspect-[4/5]" /><CatalogImage product={{ ...product, imagePosition: product.imagePosition === "top-left" ? "bottom-left" : "top-left" }} className="aspect-[4/5] opacity-70" /></div><CatalogImage product={product} className="aspect-[4/5] w-full" /></div><div className="flex flex-col justify-center"><p className="eyebrow">{product.category} · sample concept</p><h1 className="mt-5 font-display text-6xl leading-[0.9] tracking-[-0.05em] text-burgundy sm:text-7xl">{product.name}</h1><p className="mt-6 font-display text-2xl text-burgundy">{formatINR(product.price)}</p><p className="mt-6 max-w-lg text-base leading-8 text-foreground/65">{product.description}</p><div className="mt-9 border-y border-burgundy/10 py-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50">Color · {color}</p><div className="mt-4 flex gap-3">{product.colors.map((option) => <button type="button" key={option.name} className={`color-swatch h-9 w-9 ${color === option.name ? "ring-2 ring-burgundy ring-offset-2 ring-offset-ivory" : ""}`} style={{ backgroundColor: option.value }} aria-label={`Choose ${option.name}`} onClick={() => { setColor(option.name); setHeroColor(heroColors.find((entry) => entry.name === option.name)?.value ?? option.value); }} />)}</div></div><div className="mt-6 flex gap-3"><div className="flex h-12 items-center border border-burgundy/20"><button type="button" className="px-4 text-burgundy" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><span className="min-w-8 text-center text-sm">{quantity}</span><button type="button" className="px-4 text-burgundy" onClick={() => setQuantity((current) => current + 1)} aria-label="Increase quantity"><Plus size={15} /></button></div><Button className="h-12 flex-1 rounded-none bg-burgundy text-ivory hover:bg-burgundy/90" onClick={() => { for (let index = 0; index < quantity; index += 1) addItem(product, color); }}>Add to bag <ShoppingBag size={16} /></Button></div><div className="mt-8 grid gap-3 text-sm text-foreground/65"><p><span className="font-medium text-burgundy">Description</span> · {product.tagline}</p><p><span className="font-medium text-burgundy">Dimensions</span> · {product.dimensions ?? "Details coming soon"}</p><p><span className="font-medium text-burgundy">Materials</span> · {product.materials ?? "Details coming soon"}</p><p><span className="font-medium text-burgundy">Care</span> · {product.care ?? "Details coming soon"}</p></div></div></div><section className="mt-20 border-t border-burgundy/10 pt-12"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">See the shape</p><h2 className="mt-3 font-display text-4xl text-burgundy">Explore this concept in 3D.</h2></div><p className="max-w-md text-sm leading-6 text-foreground/55">A real-time concept preview for silhouette and color direction. It is not an exact replica of an existing product.</p></div><div className="mt-8 h-[520px] max-w-3xl"><BagPreview3D color={colorOption?.value ?? heroColor} /></div></section></main><AccountDialog open={accountOpen} onOpenChange={setAccountOpen} /></div>;
}