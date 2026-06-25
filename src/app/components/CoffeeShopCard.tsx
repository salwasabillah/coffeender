import { MapPin, Star, Clock, Phone, Wifi, Car, TreePine, Heart, MessageSquare, Users, BookOpen, Zap } from "lucide-react";

import { CoffeeShop, UserReview, getCrowdLevel } from "../data/coffeeShops";

interface CoffeeShopCardProps {
  shop: CoffeeShop;
  isSelected: boolean;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  userReviews: UserReview[];
  onReviewClick: (e: React.MouseEvent) => void;
}

const budgetBadge = {
  hemat: { label: "Hemat", color: "text-emerald-700", bg: "bg-emerald-100" },
  standar: { label: "Standar", color: "text-amber-700", bg: "bg-amber-100" },
  premium: { label: "Premium", color: "text-rose-700", bg: "bg-rose-100" },
};

export function CoffeeShopCard({
  shop,
  isSelected,
  onClick,
  isFavorite,
  onToggleFavorite,
  userReviews,
  onReviewClick,
}: CoffeeShopCardProps) {
  const crowd = getCrowdLevel(shop);
  const budget = budgetBadge[shop.budgetCategory];
  const allReviews = shop.reviews + userReviews.length;
  const avgRating =
    userReviews.length > 0
      ? (shop.rating * shop.reviews + userReviews.reduce((s, r) => s + r.rating, 0)) / allReviews
      : shop.rating;

  return (
    <div
      onClick={onClick}
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "#fff9f2",
        border: isSelected
          ? "2px solid #c2692a"
          : "1px solid rgba(124,61,18,0.12)",
        boxShadow: isSelected
          ? "0 0 0 3px rgba(194,105,42,0.2), 0 8px 24px rgba(124,61,18,0.15)"
          : "0 2px 12px rgba(124,61,18,0.08)",
        fontFamily: "'Lato',sans-serif",
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-amber-100">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* favorite button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: isFavorite ? "#ef4444" : "rgba(255,255,255,0.85)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
          title={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
        >
          <Heart
            className="w-4 h-4"
            style={{ color: isFavorite ? "white" : "#9ca3af" }}
            fill={isFavorite ? "white" : "none"}
          />
        </button>

        {/* rating badge */}
        <div
          className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
          style={{ background: "rgba(28,18,10,0.75)", color: "#fbbf24", backdropFilter: "blur(4px)" }}
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          {avgRating.toFixed(1)}
        </div>

        {/* shop name bottom */}
        <div className="absolute bottom-3 left-3 right-10">
          <h3
            className="text-white font-semibold text-base leading-tight drop-shadow"
            style={{ fontFamily: "'Playfair Display',serif" }}
          >
            {shop.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5 space-y-2.5">
        {/* badges row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${budget.bg} ${budget.color}`}>
            {budget.label}
          </span>
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${crowd.bg} ${crowd.color}`}>
            <Users className="w-3 h-3" />
            {crowd.label}
          </span>
          {/* crowd bar */}
          <div className="flex-1 min-w-[40px] h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${crowd.bar}%`,
                background: crowd.bar > 70 ? "#ef4444" : crowd.bar > 40 ? "#f97316" : crowd.bar > 20 ? "#d97706" : "#10b981",
              }}
            />
          </div>
        </div>

        {/* info */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800/70 leading-snug">{shop.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="text-xs text-amber-800/70">{shop.hours}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="text-xs text-amber-800/70">{shop.phone}</span>
            </div>
          </div>
        </div>

        {/* price */}
        <div
          className="text-xs font-medium px-2.5 py-1.5 rounded-lg inline-block"
          style={{ background: "#f5e6d3", color: "#7c3d12", fontFamily: "'DM Mono',monospace" }}
        >
          {shop.priceRange}
        </div>

        {/* specialty tags */}
        <div className="flex flex-wrap gap-1">
          {shop.specialty.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-full text-xs"
              style={{ background: "rgba(124,61,18,0.08)", color: "#7c3d12" }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* amenities + review button */}
        <div className="flex items-start justify-between pt-1 border-t border-amber-100 gap-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {shop.wifi && (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <Wifi className="w-3.5 h-3.5" /> WiFi
              </div>
            )}
            {shop.parking && (
              <div className="flex items-center gap-1 text-xs text-green-700">
                <Car className="w-3.5 h-3.5" /> Parkir
              </div>
            )}
            {shop.outdoor && (
              <div className="flex items-center gap-1 text-xs text-emerald-700">
                <TreePine className="w-3.5 h-3.5" /> Outdoor
              </div>
            )}
            {shop.open24h && (
              <div className="flex items-center gap-1 text-xs text-violet-700">
                <Clock className="w-3.5 h-3.5" /> 24 Jam
              </div>
            )}
            {shop.prayerRoom && (
              <div className="flex items-center gap-1 text-xs text-amber-700">
                <span className="text-xs leading-none">🕌</span> Mushola
              </div>
            )}
            {shop.meetingRoom && (
              <div className="flex items-center gap-1 text-xs text-sky-700">
                <BookOpen className="w-3.5 h-3.5" /> Meeting
              </div>
            )}
            {shop.powerOutlets && (
              <div className="flex items-center gap-1 text-xs text-yellow-700">
                <Zap className="w-3.5 h-3.5" /> Colokan
              </div>
            )}
          </div>
          <button
            onClick={onReviewClick}
            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95"
            style={{ background: "#7c3d12", color: "#fdf6ed" }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {allReviews} Ulasan
          </button>
        </div>
      </div>
    </div>
  );
}
