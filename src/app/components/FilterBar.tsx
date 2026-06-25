import { Search, Wifi, Car, TreePine, Wallet, Clock, BookOpen, Zap } from "lucide-react";
import { CoffeeShop } from "../data/coffeeShops";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDistrict: string;
  onDistrictChange: (value: string) => void;
  districts: string[];
  // existing amenities
  showWifiOnly: boolean;
  onWifiToggle: () => void;
  showParkingOnly: boolean;
  onParkingToggle: () => void;
  showOutdoorOnly: boolean;
  onOutdoorToggle: () => void;
  // new amenities
  showOpen24hOnly: boolean;
  onOpen24hToggle: () => void;
  showPrayerRoomOnly: boolean;
  onPrayerRoomToggle: () => void;
  showMeetingRoomOnly: boolean;
  onMeetingRoomToggle: () => void;
  showPowerOutletsOnly: boolean;
  onPowerOutletsToggle: () => void;
  // budget
  budgetFilter: CoffeeShop["budgetCategory"] | "semua";
  onBudgetChange: (value: CoffeeShop["budgetCategory"] | "semua") => void;
}

const budgets: { label: string; value: CoffeeShop["budgetCategory"] | "semua"; icon: string }[] = [
  { label: "Semua", value: "semua", icon: "💰" },
  { label: "Hemat", value: "hemat", icon: "🟢" },
  { label: "Standar", value: "standar", icon: "🟡" },
  { label: "Premium", value: "premium", icon: "🔴" },
];

function ToggleButton({
  icon,
  label,
  active,
  onToggle,
  activeColor,
  activeBg,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
  activeColor: string;
  activeBg: string;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap"
      style={{
        background: active ? activeBg : "rgba(245,230,211,0.7)",
        color: active ? activeColor : "#7a5c3f",
        border: `1px solid ${active ? activeColor + "50" : "rgba(124,61,18,0.12)"}`,
        boxShadow: active ? `0 0 0 2px ${activeColor}18` : "none",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedDistrict,
  onDistrictChange,
  districts,
  showWifiOnly,
  onWifiToggle,
  showParkingOnly,
  onParkingToggle,
  showOutdoorOnly,
  onOutdoorToggle,
  showOpen24hOnly,
  onOpen24hToggle,
  showPrayerRoomOnly,
  onPrayerRoomToggle,
  showMeetingRoomOnly,
  onMeetingRoomToggle,
  showPowerOutletsOnly,
  onPowerOutletsToggle,
  budgetFilter,
  onBudgetChange,
}: FilterBarProps) {
  return (
    <div
      className="rounded-2xl p-4 mb-5 space-y-3"
      style={{
        background: "rgba(255,249,242,0.95)",
        border: "1px solid rgba(124,61,18,0.12)",
        boxShadow: "0 2px 16px rgba(124,61,18,0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Row 1: search + district */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
          <input
            type="text"
            placeholder="Cari nama, alamat, atau menu..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-amber-400/40"
            style={{
              background: "#f5e6d3",
              border: "1px solid rgba(124,61,18,0.15)",
              color: "#2c1a0e",
              fontFamily: "'Lato',sans-serif",
            }}
          />
        </div>
        <select
          value={selectedDistrict}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer focus:ring-2 focus:ring-amber-400/40"
          style={{
            background: "#f5e6d3",
            border: "1px solid rgba(124,61,18,0.15)",
            color: "#2c1a0e",
            fontFamily: "'Lato',sans-serif",
          }}
        >
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Row 2: fasilitas umum */}
      <div>
        <p className="text-xs text-amber-700/50 mb-2" style={{ fontFamily: "'DM Mono',monospace" }}>Fasilitas</p>
        <div className="flex flex-wrap gap-2">
          <ToggleButton icon={<Wifi className="w-3.5 h-3.5" />} label="WiFi" active={showWifiOnly} onToggle={onWifiToggle} activeColor="#1d4ed8" activeBg="#dbeafe" />
          <ToggleButton icon={<Car className="w-3.5 h-3.5" />} label="Parkir" active={showParkingOnly} onToggle={onParkingToggle} activeColor="#15803d" activeBg="#dcfce7" />
          <ToggleButton icon={<TreePine className="w-3.5 h-3.5" />} label="Outdoor" active={showOutdoorOnly} onToggle={onOutdoorToggle} activeColor="#065f46" activeBg="#d1fae5" />
          <ToggleButton icon={<Clock className="w-3.5 h-3.5" />} label="Buka 24 Jam" active={showOpen24hOnly} onToggle={onOpen24hToggle} activeColor="#7c3aed" activeBg="#ede9fe" />
          <ToggleButton
            icon={<span className="text-sm leading-none">🕌</span>}
            label="Mushola"
            active={showPrayerRoomOnly}
            onToggle={onPrayerRoomToggle}
            activeColor="#b45309"
            activeBg="#fef3c7"
          />
          <ToggleButton icon={<BookOpen className="w-3.5 h-3.5" />} label="Meeting Room" active={showMeetingRoomOnly} onToggle={onMeetingRoomToggle} activeColor="#0369a1" activeBg="#e0f2fe" />
          <ToggleButton icon={<Zap className="w-3.5 h-3.5" />} label="Banyak Colokan" active={showPowerOutletsOnly} onToggle={onPowerOutletsToggle} activeColor="#ca8a04" activeBg="#fefce8" />
        </div>
      </div>

      {/* Row 3: budget */}
      <div>
        <p className="text-xs text-amber-700/50 mb-2" style={{ fontFamily: "'DM Mono',monospace" }}>Budget</p>
        <div className="flex flex-wrap gap-2">
          <Wallet className="w-3.5 h-3.5 text-amber-600/50 self-center" />
          {budgets.map(({ label, value, icon }) => (
            <button
              key={value}
              onClick={() => onBudgetChange(value)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: budgetFilter === value ? "#7c3d12" : "rgba(245,230,211,0.7)",
                color: budgetFilter === value ? "#fdf6ed" : "#7a5c3f",
                border: `1px solid ${budgetFilter === value ? "#7c3d12" : "rgba(124,61,18,0.12)"}`,
              }}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
