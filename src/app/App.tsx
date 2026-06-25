import { useState, useMemo, useEffect } from "react";
import { Coffee, MapIcon, List, ArrowRight, Star, MapPin, Wifi, Clock, X, Heart, LogOut, UserCircle } from "lucide-react";
import { coffeeShops, districts, CoffeeShop, UserReview } from "./data/coffeeShops";
import { CoffeeShopCard } from "./components/CoffeeShopCard";
import { MapView } from "./components/MapView";
import { FilterBar } from "./components/FilterBar";
import { AuthModal, AppUser } from "./components/AuthModal";
import { ReviewModal } from "./components/ReviewModal";

// ─── localStorage helpers ─────────────────────────────────────────────────────
function loadUser(): AppUser | null {
  try { return JSON.parse(localStorage.getItem("pwt_user") || "null"); } catch { return null; }
}
function saveUser(u: AppUser | null) {
  localStorage.setItem("pwt_user", JSON.stringify(u));
}
function loadFavorites(): number[] {
  try { return JSON.parse(localStorage.getItem("pwt_favorites") || "[]"); } catch { return []; }
}
function saveFavorites(ids: number[]) {
  localStorage.setItem("pwt_favorites", JSON.stringify(ids));
}
function loadReviews(): UserReview[] {
  try { return JSON.parse(localStorage.getItem("pwt_reviews") || "[]"); } catch { return []; }
}
function saveReviews(reviews: UserReview[]) {
  localStorage.setItem("pwt_reviews", JSON.stringify(reviews));
}

// ─── Welcome splash ───────────────────────────────────────────────────────────
function WelcomeSplash({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 700);
  };

  const totalShops = coffeeShops.length;
  const totalDistricts = districts.filter((d) => d !== "Semua Wilayah").length;
  const avgRating = coffeeShops.reduce((s, c) => s + c.rating, 0) / coffeeShops.length;
  const wifiCount = coffeeShops.filter((s) => s.wifi).length;

  return (
    <div
      className={`fixed inset-0 z-50 flex overflow-hidden transition-opacity duration-700 ${
        leaving ? "opacity-0" : visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {/* Left photo panel */}
      <div
        className="hidden lg:block relative w-[42%] flex-shrink-0 bg-amber-950"
        style={{
          transform: leaving ? "translateX(-60px)" : "translateX(0)",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1200&fit=crop&auto=format"
          alt="Barista menyeduh kopi arabika di Purwokerto"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/60 via-transparent to-amber-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent to-transparent" />
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
            <Coffee className="w-4 h-4 text-amber-950" />
          </div>
          <span className="text-amber-200 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
            Est. Purwokerto
          </span>
        </div>
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-amber-100/60 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
            Dari biji ke cangkir
          </p>
          <p className="text-amber-50 text-sm leading-relaxed">
            Jelajahi warisan kopi Jawa Tengah — dari racikan tradisional hingga specialty brew modern.
          </p>
        </div>
      </div>

      {/* Right content panel */}
      <div
        className="flex-1 relative flex flex-col justify-center px-10 lg:px-16 overflow-y-auto"
        style={{
          background: "linear-gradient(160deg, #2c1a0e 0%, #3d2310 40%, #1e120a 100%)",
          transform: leaving ? "translateX(60px)" : "translateX(0)",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="relative max-w-md w-full mx-auto lg:mx-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-amber-500" />
            <span className="text-amber-400 text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
              Selamat Datang
            </span>
          </div>

          <h1
            className="text-amber-50 leading-[1.1] mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 600 }}
          >
            Coffee Shop
            <br />
            <em className="text-amber-400">Purwokerto</em>
          </h1>

          <p className="text-amber-200/70 text-base leading-relaxed mb-10 max-w-sm">
            Rekomendas{" "}
            <span className="text-amber-300 font-semibold">{totalShops} coffee shop</span>{" "}
            terpilih Purwokerto.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { icon: Coffee, value: `${totalShops}`, label: "Coffee Shop" },
              { icon: MapPin, value: `${totalDistricts}`, label: "Kecamatan" },
              { icon: Star, value: avgRating.toFixed(1), label: "Rating Rata-rata" },
              { icon: Wifi, value: `${wifiCount}`, label: "Tersedia WiFi" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(194,105,42,0.2)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(194,105,42,0.25)" }}>
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-100 font-semibold leading-none" style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.1rem" }}>{value}</p>
                  <p className="text-amber-400/60 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 mb-10 rounded-lg px-4 py-3" style={{ background: "rgba(194,105,42,0.12)", border: "1px solid rgba(194,105,42,0.2)" }}>
            <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-amber-300/70 text-sm leading-snug">
              Data diperbarui secara berkala · Jam operasional dapat berubah.
            </p>
          </div>

          <button
            onClick={handleEnter}
            className="group flex items-center gap-3 rounded-full px-7 py-3.5 text-amber-950 font-semibold text-sm transition-all duration-300 hover:gap-5 hover:shadow-[0_0_30px_rgba(194,105,42,0.45)] focus:outline-none"
            style={{ background: "linear-gradient(135deg, #e8873a 0%, #c2692a 100%)" }}
          >
            Jelajahi Dashboard
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button onClick={handleEnter} className="mt-4 text-amber-500/40 text-xs hover:text-amber-500/70 transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
            lewati intro →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Semua Wilayah");
  const [showWifiOnly, setShowWifiOnly] = useState(false);
  const [showParkingOnly, setShowParkingOnly] = useState(false);
  const [showOutdoorOnly, setShowOutdoorOnly] = useState(false);
  const [showOpen24hOnly, setShowOpen24hOnly] = useState(false);
  const [showPrayerRoomOnly, setShowPrayerRoomOnly] = useState(false);
  const [showMeetingRoomOnly, setShowMeetingRoomOnly] = useState(false);
  const [showPowerOutletsOnly, setShowPowerOutletsOnly] = useState(false);
  const [budgetFilter, setBudgetFilter] = useState<CoffeeShop["budgetCategory"] | "semua">("semua");
  const [viewMode, setViewMode] = useState<"split" | "list" | "map">("split");
  const [activeTab, setActiveTab] = useState<"semua" | "favorit">("semua");

  // auth + social state
  const [user, setUser] = useState<AppUser | null>(loadUser);
  const [favorites, setFavorites] = useState<number[]>(loadFavorites);
  const [reviews, setReviews] = useState<UserReview[]>(loadReviews);

  // modal state
  const [showAuth, setShowAuth] = useState(false);
  const [reviewShop, setReviewShop] = useState<CoffeeShop | null>(null);

  // persist
  useEffect(() => { saveUser(user); }, [user]);
  useEffect(() => { saveFavorites(favorites); }, [favorites]);
  useEffect(() => { saveReviews(reviews); }, [reviews]);

  function handleAuth(u: AppUser) {
    setUser(u);
    setShowAuth(false);
  }

  function handleLogout() {
    setUser(null);
    setFavorites([]);
  }

  function toggleFavorite(e: React.MouseEvent, shopId: number) {
    e.stopPropagation();
    if (!user) { setShowAuth(true); return; }
    setFavorites((prev) =>
      prev.includes(shopId) ? prev.filter((id) => id !== shopId) : [...prev, shopId]
    );
  }

  function handleReviewClick(e: React.MouseEvent, shop: CoffeeShop) {
    e.stopPropagation();
    setReviewShop(shop);
  }

  function handleSubmitReview(data: Omit<UserReview, "id" | "date">) {
    const newReview: UserReview = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setReviews((prev) => [...prev, newReview]);
  }

  const filteredShops = useMemo(() => {
    let base = coffeeShops;
    if (activeTab === "favorit") base = base.filter((s) => favorites.includes(s.id));
    return base.filter((shop) => {
      const matchesSearch =
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.specialty.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDistrict = selectedDistrict === "Semua Wilayah" || shop.district === selectedDistrict;
      const matchesWifi = !showWifiOnly || shop.wifi;
      const matchesParking = !showParkingOnly || shop.parking;
      const matchesOutdoor = !showOutdoorOnly || shop.outdoor;
      const matchesOpen24h = !showOpen24hOnly || shop.open24h;
      const matchesPrayerRoom = !showPrayerRoomOnly || shop.prayerRoom;
      const matchesMeetingRoom = !showMeetingRoomOnly || shop.meetingRoom;
      const matchesPowerOutlets = !showPowerOutletsOnly || shop.powerOutlets;
      const matchesBudget = budgetFilter === "semua" || shop.budgetCategory === budgetFilter;
      return matchesSearch && matchesDistrict && matchesWifi && matchesParking && matchesOutdoor && matchesOpen24h && matchesPrayerRoom && matchesMeetingRoom && matchesPowerOutlets && matchesBudget;
    });
  }, [searchTerm, selectedDistrict, showWifiOnly, showParkingOnly, showOutdoorOnly, showOpen24hOnly, showPrayerRoomOnly, showMeetingRoomOnly, showPowerOutletsOnly, budgetFilter, activeTab, favorites]);

  const handleShopSelect = (shop: CoffeeShop) => {
    setSelectedShop(shop);
    const el = document.getElementById(`shop-${shop.id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg,#fdf6ed 0%,#f5e6d3 60%,#fdf0df 100%)", fontFamily: "'Lato',sans-serif" }}>
      {showWelcome && <WelcomeSplash onEnter={() => setShowWelcome(false)} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} />}
      {reviewShop && (
        <ReviewModal
          shop={reviewShop}
          user={user}
          reviews={reviews.filter((r) => r.shopId === reviewShop.id)}
          onClose={() => setReviewShop(null)}
          onSubmit={handleSubmitReview}
          onLoginRequest={() => { setReviewShop(null); setShowAuth(true); }}
        />
      )}

      {/* Header */}
      <header className="text-white shadow-lg sticky top-0 z-40" style={{ background: "linear-gradient(135deg,#3d2310 0%,#7c3d12 50%,#c2692a 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            {/* brand */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg flex-shrink-0" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <Coffee className="w-6 h-6 text-amber-300" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-semibold text-amber-50 leading-none truncate" style={{ fontFamily: "'Playfair Display',serif" }}>
                  Coffee Shop Purwokerto
                </h1>
                <p className="text-amber-300/60 text-xs mt-0.5 tracking-wide" style={{ fontFamily: "'DM Mono',monospace" }}>
                  Temukan kopi terbaik di kota Anda
                </p>
              </div>
            </div>

            {/* right controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* user / auth */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                    style={{ background: "rgba(255,255,255,0.1)", color: "#fde68a" }}
                  >
                    <UserCircle className="w-3.5 h-3.5" />
                    <span>{user.name.split(" ")[0]}</span>
                    {favorites.length > 0 && (
                      <span className="flex items-center gap-0.5 text-red-300">
                        <Heart className="w-3 h-3 fill-red-300" /> {favorites.length}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
                    style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                    title="Keluar"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.12)", color: "#fde68a", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <UserCircle className="w-3.5 h-3.5" />
                  Masuk
                </button>
              )}

              {/* welcome button */}
              <button
                onClick={() => setShowWelcome(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'DM Mono',monospace" }}
              >
                <X className="w-3 h-3 rotate-45" /> profil
              </button>

              {/* view toggle */}
              <div className="flex gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.12)" }}>
                {([["split", MapIcon, List], ["list", List, null], ["map", MapIcon, null]] as const).map(([mode, Icon1, Icon2]) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as typeof viewMode)}
                    className={`px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1 ${
                      viewMode === mode ? "bg-white text-amber-800 shadow" : "text-amber-100 hover:bg-white/20"
                    }`}
                  >
                    <Icon1 className="w-3.5 h-3.5" />
                    {Icon2 && <Icon2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDistrict={selectedDistrict}
          onDistrictChange={setSelectedDistrict}
          districts={districts}
          showWifiOnly={showWifiOnly}
          onWifiToggle={() => setShowWifiOnly(!showWifiOnly)}
          showParkingOnly={showParkingOnly}
          onParkingToggle={() => setShowParkingOnly(!showParkingOnly)}
          showOutdoorOnly={showOutdoorOnly}
          onOutdoorToggle={() => setShowOutdoorOnly(!showOutdoorOnly)}
          showOpen24hOnly={showOpen24hOnly}
          onOpen24hToggle={() => setShowOpen24hOnly(!showOpen24hOnly)}
          showPrayerRoomOnly={showPrayerRoomOnly}
          onPrayerRoomToggle={() => setShowPrayerRoomOnly(!showPrayerRoomOnly)}
          showMeetingRoomOnly={showMeetingRoomOnly}
          onMeetingRoomToggle={() => setShowMeetingRoomOnly(!showMeetingRoomOnly)}
          showPowerOutletsOnly={showPowerOutletsOnly}
          onPowerOutletsToggle={() => setShowPowerOutletsOnly(!showPowerOutletsOnly)}
          budgetFilter={budgetFilter}
          onBudgetChange={setBudgetFilter}
        />

        {/* Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 rounded-xl p-1" style={{ background: "rgba(124,61,18,0.08)" }}>
            {[
              { id: "semua" as const, label: `Semua (${coffeeShops.length})` },
              { id: "favorit" as const, label: `Favorit (${favorites.length})` },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: activeTab === id ? "#7c3d12" : "transparent",
                  color: activeTab === id ? "#fdf6ed" : "#7a5c3f",
                }}
              >
                {id === "favorit" && <span className="mr-1">❤️</span>}
                {label}
              </button>
            ))}
          </div>

          <p className="text-amber-700/50 text-xs" style={{ fontFamily: "'DM Mono',monospace" }}>
            {filteredShops.length} kedai ditemukan
            {selectedShop && <span> · <span className="text-amber-700">{selectedShop.name}</span></span>}
          </p>
        </div>

        {/* Content */}
        <div className={`grid gap-5 ${viewMode === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
          {(viewMode === "split" || viewMode === "map") && (
            <div className={viewMode === "map" ? "h-[600px]" : "h-[600px] lg:sticky lg:top-20"}>
              <MapView
                shops={filteredShops}
                selectedShop={selectedShop}
                onShopSelect={handleShopSelect}
                favorites={favorites}
              />
            </div>
          )}

          {(viewMode === "split" || viewMode === "list") && (
            <div className={`grid gap-4 ${viewMode === "list" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredShops.length > 0 ? (
                filteredShops.map((shop) => (
                  <div key={shop.id} id={`shop-${shop.id}`}>
                    <CoffeeShopCard
                      shop={shop}
                      isSelected={selectedShop?.id === shop.id}
                      onClick={() => handleShopSelect(shop)}
                      isFavorite={favorites.includes(shop.id)}
                      onToggleFavorite={(e) => toggleFavorite(e, shop.id)}
                      userReviews={reviews.filter((r) => r.shopId === shop.id)}
                      onReviewClick={(e) => handleReviewClick(e, shop)}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <Coffee className="w-12 h-12 text-amber-200 mx-auto mb-3" />
                  <p className="text-amber-700/60 text-base" style={{ fontFamily: "'Playfair Display',serif" }}>
                    {activeTab === "favorit" ? "Belum ada favorit tersimpan" : "Tidak ada kedai yang sesuai filter"}
                  </p>
                  <p className="text-amber-500/40 text-sm mt-1">
                    {activeTab === "favorit" ? "Klik ikon ❤ pada kartu untuk menyimpan favorit" : "Coba ubah kriteria pencarian atau filter"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "#2c1a0e" }} className="text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Coffee className="w-5 h-5 text-amber-400" />
            <p className="font-semibold text-amber-100" style={{ fontFamily: "'Playfair Display',serif" }}>
              Coffee Shop Purwokerto
            </p>
          </div>
          <p className="text-amber-400/50 text-sm">Panduan lengkap coffee shop terbaik di Purwokerto</p>
          <p className="text-amber-600/30 text-xs mt-4" style={{ fontFamily: "'DM Mono',monospace" }}>
            © 2026 Coffee Shop Purwokerto · Dibuat untuk pecinta kopi Nusantara
          </p>
        </div>
      </footer>
    </div>
  );
}
