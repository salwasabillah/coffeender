import { useState } from "react";
import { X, Coffee, Eye, EyeOff } from "lucide-react";

export interface AppUser {
  id: string;
  name: string;
  email: string;
}

interface AuthModalProps {
  onClose: () => void;
  onAuth: (user: AppUser) => void;
}

export function AuthModal({ onClose, onAuth }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Nama wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    const key = `user_${email.toLowerCase()}`;

    if (mode === "register") {
      if (localStorage.getItem(key)) {
        setError("Email sudah terdaftar. Silakan login.");
        return;
      }
      const user: AppUser = { id: crypto.randomUUID(), name: name.trim(), email };
      localStorage.setItem(key, JSON.stringify({ ...user, password }));
      onAuth(user);
    } else {
      const raw = localStorage.getItem(key);
      if (!raw) { setError("Email tidak ditemukan."); return; }
      const stored = JSON.parse(raw);
      if (stored.password !== password) { setError("Password salah."); return; }
      onAuth({ id: stored.id, name: stored.name, email: stored.email });
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(28,18,10,0.65)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#fff9f2", border: "1px solid rgba(124,61,18,0.15)" }}
      >
        {/* header */}
        <div
          className="px-6 pt-6 pb-5 text-center"
          style={{ background: "linear-gradient(135deg,#3d2310 0%,#7c3d12 100%)" }}
        >
          <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto mb-3">
            <Coffee className="w-6 h-6 text-amber-300" />
          </div>
          <h2
            className="text-amber-50 text-xl font-semibold"
            style={{ fontFamily: "'Playfair Display',serif" }}
          >
            {mode === "login" ? "Masuk ke Akun" : "Daftar Akun Baru"}
          </h2>
          <p className="text-amber-300/60 text-xs mt-1">
            {mode === "login" ? "Akses favorit & ulasan Anda" : "Mulai jelajahi kedai kopi Purwokerto"}
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3" style={{ fontFamily: "'Lato',sans-serif" }}>
          {mode === "register" && (
            <div>
              <label className="text-xs font-medium text-amber-800/70 block mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400/40"
                style={{ background: "#f5e6d3", border: "1px solid rgba(124,61,18,0.15)", color: "#2c1a0e" }}
              />
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-amber-800/70 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400/40"
              style={{ background: "#f5e6d3", border: "1px solid rgba(124,61,18,0.15)", color: "#2c1a0e" }}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-amber-800/70 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 karakter"
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400/40"
                style={{ background: "#f5e6d3", border: "1px solid rgba(124,61,18,0.15)", color: "#2c1a0e" }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600/50 hover:text-amber-600 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-600 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-98 mt-1"
            style={{ background: "linear-gradient(135deg,#c2692a 0%,#7c3d12 100%)", color: "#fdf6ed" }}
          >
            {mode === "login" ? "Masuk" : "Daftar Sekarang"}
          </button>

          <p className="text-center text-xs text-amber-800/50 pt-1">
            {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-amber-700 font-semibold hover:underline"
            >
              {mode === "login" ? "Daftar" : "Masuk"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
