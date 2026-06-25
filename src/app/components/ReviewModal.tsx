import { useState } from "react";
import { X, Star, MessageSquare } from "lucide-react";
import { CoffeeShop, UserReview } from "../data/coffeeShops";
import { AppUser } from "./AuthModal";

interface ReviewModalProps {
  shop: CoffeeShop;
  user: AppUser | null;
  reviews: UserReview[];
  onClose: () => void;
  onSubmit: (review: Omit<UserReview, "id" | "date">) => void;
  onLoginRequest: () => void;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            className="w-7 h-7"
            style={{
              color: n <= (hovered || value) ? "#f59e0b" : "#d1d5db",
              fill: n <= (hovered || value) ? "#f59e0b" : "none",
              transition: "all 0.1s",
            }}
          />
        </button>
      ))}
    </div>
  );
}

const ratingLabels = ["", "Kurang", "Cukup", "Baik", "Sangat Baik", "Luar Biasa!"];

export function ReviewModal({ shop, user, reviews, onClose, onSubmit, onLoginRequest }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { onLoginRequest(); return; }
    if (rating === 0) { setError("Pilih rating terlebih dahulu."); return; }
    if (comment.trim().length < 10) { setError("Ulasan minimal 10 karakter."); return; }
    onSubmit({ shopId: shop.id, userId: user.id, userName: user.name, rating, comment: comment.trim() });
    setSubmitted(true);
  }

  const userAlreadyReviewed = user && reviews.some((r) => r.userId === user.id);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(28,18,10,0.65)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        style={{ background: "#fff9f2", border: "1px solid rgba(124,61,18,0.15)", fontFamily: "'Lato',sans-serif" }}
      >
        {/* header */}
        <div
          className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#3d2310 0%,#7c3d12 100%)" }}
        >
          <div>
            <p className="text-amber-300/60 text-xs">Ulasan untuk</p>
            <h3
              className="text-amber-50 font-semibold"
              style={{ fontFamily: "'Playfair Display',serif" }}
            >
              {shop.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* write review */}
          <div className="px-5 py-4 border-b border-amber-100">
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-amber-800 font-semibold">Ulasan berhasil dikirim!</p>
                <p className="text-amber-600/60 text-sm mt-1">Terima kasih atas ulasan Anda.</p>
              </div>
            ) : userAlreadyReviewed ? (
              <div className="text-center py-4 text-amber-700/60 text-sm">
                Anda sudah memberikan ulasan untuk kedai ini.
              </div>
            ) : !user ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-amber-800/70 text-sm">Masuk untuk memberikan ulasan</p>
                <button
                  onClick={onLoginRequest}
                  className="px-5 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: "#7c3d12", color: "#fdf6ed" }}
                >
                  Masuk / Daftar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-xs font-medium text-amber-800/60">Beri rating Anda</p>
                <div className="flex items-center gap-3">
                  <StarPicker value={rating} onChange={setRating} />
                  {rating > 0 && (
                    <span className="text-sm font-medium text-amber-700">{ratingLabels[rating]}</span>
                  )}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda di sini..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-amber-400/40"
                  style={{ background: "#f5e6d3", border: "1px solid rgba(124,61,18,0.15)", color: "#2c1a0e" }}
                />
                {error && <p className="text-red-600 text-xs">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg,#c2692a,#7c3d12)", color: "#fdf6ed" }}
                >
                  Kirim Ulasan
                </button>
              </form>
            )}
          </div>

          {/* existing reviews */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">
                {reviews.length} Ulasan Komunitas
              </span>
            </div>

            {reviews.length === 0 ? (
              <p className="text-amber-600/50 text-sm text-center py-4">
                Belum ada ulasan. Jadilah yang pertama!
              </p>
            ) : (
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-xl p-3 space-y-1.5"
                    style={{ background: "#f5e6d3", border: "1px solid rgba(124,61,18,0.1)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: "#7c3d12" }}
                        >
                          {r.userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-amber-900">{r.userName}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3"
                            style={{ color: i < r.rating ? "#f59e0b" : "#d1d5db", fill: i < r.rating ? "#f59e0b" : "none" }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-amber-800/80 leading-relaxed">{r.comment}</p>
                    <p
                      className="text-xs text-amber-600/40"
                      style={{ fontFamily: "'DM Mono',monospace" }}
                    >
                      {new Date(r.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
