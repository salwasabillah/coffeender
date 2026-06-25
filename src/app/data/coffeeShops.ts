export interface UserReview {
  id: string;
  shopId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CoffeeShop {
  id: number;
  name: string;
  address: string;
  district: string;
  rating: number;
  reviews: number;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  budgetCategory: "hemat" | "standar" | "premium";
  hours: string;
  specialty: string[];
  lat: number;
  lng: number;
  image: string;
  phone: string;
  wifi: boolean;
  parking: boolean;
  outdoor: boolean;
  open24h: boolean;
  prayerRoom: boolean;
  meetingRoom: boolean;
  powerOutlets: boolean;
  popularityScore: number;
  mapsUrl: string;
}

export const coffeeShops: CoffeeShop[] = [
  // ── Purwokerto Utara ──────────────────────────────────────────────────────
  {
    id: 1,
    name: "Praketa",
    address: "Jl. H.R Boenyamin No.129, Bancarkembar, Purwokerto Utara, Banyumas",
    district: "Purwokerto Utara",
    rating: 4.7,
    reviews: 312,
    priceRange: "Rp 20.000 – Rp 50.000",
    priceMin: 20000,
    priceMax: 50000,
    budgetCategory: "standar",
    hours: "09:00 - 22:00",
    specialty: ["Espresso", "Manual Brew", "Kopi Single Origin"],
    lat: -7.4062,
    lng: 109.2295,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop&auto=format",
    phone: "0812-2800-0110",
    wifi: true,
    parking: true,
    outdoor: false,
    open24h: false,
    prayerRoom: true,
    meetingRoom: false,
    powerOutlets: true,
    popularityScore: 9,
    mapsUrl: "https://maps.app.goo.gl/QRCUEBqEXMtaQUc57",
  },
  {
    id: 2,
    name: "Singgah Coffee & Book",
    address: "Jl. Riyanto No.29, Sumampir, Purwokerto Utara, Banyumas",
    district: "Purwokerto Utara",
    rating: 4.6,
    reviews: 198,
    priceRange: "Rp 18.000 – Rp 40.000",
    priceMin: 18000,
    priceMax: 40000,
    budgetCategory: "standar",
    hours: "10:00 - 22:00",
    specialty: ["Cold Brew", "Latte Art", "Kopi Susu"],
    lat: -7.4021,
    lng: 109.2358,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop&auto=format",
    phone: "0856-4012-3456",
    wifi: true,
    parking: true,
    outdoor: true,
    open24h: false,
    prayerRoom: false,
    meetingRoom: false,
    powerOutlets: true,
    popularityScore: 8,
    mapsUrl: "https://maps.app.goo.gl/27vAxMCw6yqoAFKH9",
  },
  {
    id: 3,
    name: "Awor Coffee Purwokerto",
    address: "Ruko Permata Hijau Raya No.6 Blok A, Bancarkembar, Purwokerto Utara, Banyumas",
    district: "Purwokerto Utara",
    rating: 4.8,
    reviews: 267,
    priceRange: "Rp 22.000 – Rp 55.000",
    priceMin: 22000,
    priceMax: 55000,
    budgetCategory: "standar",
    hours: "09:00 - 22:30",
    specialty: ["Pour Over", "Flat White", "Signature Blend"],
    lat: -7.3978,
    lng: 109.2389,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop&auto=format",
    phone: "0821-3344-5566",
    wifi: true,
    parking: true,
    outdoor: false,
    open24h: false,
    prayerRoom: true,
    meetingRoom: true,
    powerOutlets: true,
    popularityScore: 9,
    mapsUrl: "https://maps.app.goo.gl/NPzPajiyQwJbEisg6",
  },

  // ── Purwokerto Timur ──────────────────────────────────────────────────────
  {
    id: 4,
    name: "Society Coffee House",
    address: "Jl. Prof. Dr. Suharso No.9B, Arcawinangun, Purwokerto Timur, Banyumas",
    district: "Purwokerto Timur",
    rating: 4.8,
    reviews: 445,
    priceRange: "Rp 25.000 – Rp 60.000",
    priceMin: 25000,
    priceMax: 60000,
    budgetCategory: "premium",
    hours: "09:00 - 23:00",
    specialty: ["V60", "Cappuccino", "Iced Brown Sugar"],
    lat: -7.4256,
    lng: 109.2462,
    image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=600&h=400&fit=crop&auto=format",
    phone: "0813-2800-9900",
    wifi: true,
    parking: true,
    outdoor: true,
    open24h: false,
    prayerRoom: true,
    meetingRoom: true,
    powerOutlets: true,
    popularityScore: 10,
    mapsUrl: "https://maps.app.goo.gl/jDudn7yz54KrYu4k9",
  },
  {
    id: 5,
    name: "Den Huis Coffee & Roastery",
    address: "Gg. Volly, Mangunjaya, Purwokerto Lor, Purwokerto Timur, Banyumas",
    district: "Purwokerto Timur",
    rating: 4.9,
    reviews: 389,
    priceRange: "Rp 28.000 – Rp 65.000",
    priceMin: 28000,
    priceMax: 65000,
    budgetCategory: "premium",
    hours: "08:00 - 22:00",
    specialty: ["House Roast", "Batch Brew", "AeroPress"],
    lat: -7.4146,
    lng: 109.2508,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&auto=format",
    phone: "0878-5566-7788",
    wifi: true,
    parking: true,
    outdoor: false,
    open24h: false,
    prayerRoom: false,
    meetingRoom: true,
    powerOutlets: true,
    popularityScore: 10,
    mapsUrl: "https://maps.app.goo.gl/uvR1CyMyqi7Gz8KHA",
  },
  {
    id: 6,
    name: "AT NINE Coffee and Space",
    address: "Jl. Gelora Indah I, Mangunjaya, Purwokerto Timur, Banyumas",
    district: "Purwokerto Timur",
    rating: 4.7,
    reviews: 231,
    priceRange: "Rp 20.000 – Rp 50.000",
    priceMin: 20000,
    priceMax: 50000,
    budgetCategory: "standar",
    hours: "09:00 - 22:00",
    specialty: ["Americano", "Dalgona", "Kopi Gula Aren"],
    lat: -7.4152,
    lng: 109.2501,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop&auto=format",
    phone: "0822-1122-3344",
    wifi: true,
    parking: false,
    outdoor: true,
    open24h: false,
    prayerRoom: false,
    meetingRoom: false,
    powerOutlets: true,
    popularityScore: 8,
    mapsUrl: "https://maps.app.goo.gl/VRRzMcCnibhqT1U58",
  },

  // ── Purwokerto Barat ──────────────────────────────────────────────────────
  {
    id: 7,
    name: "Lungguh Coffee & Eatery",
    address: "Jl. RA Wiryaatmaja No.27, Kedungwuluh, Purwokerto Barat, Banyumas",
    district: "Purwokerto Barat",
    rating: 4.6,
    reviews: 178,
    priceRange: "Rp 18.000 – Rp 45.000",
    priceMin: 18000,
    priceMax: 45000,
    budgetCategory: "standar",
    hours: "08:00 - 22:00",
    specialty: ["Robusta Lokal", "Cold Brew", "Kopi Susu"],
    lat: -7.4084,
    lng: 109.2228,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop&auto=format",
    phone: "0815-7788-9900",
    wifi: true,
    parking: true,
    outdoor: true,
    open24h: false,
    prayerRoom: true,
    meetingRoom: false,
    powerOutlets: true,
    popularityScore: 8,
    mapsUrl: "https://maps.app.goo.gl/WBVTF45xXhnJRXW67",
  },
  {
    id: 8,
    name: "Sky•7 Cafe",
    address: "Jl. Sokajati No.9, Bantarsoka, Purwokerto Barat, Banyumas",
    district: "Purwokerto Barat",
    rating: 4.5,
    reviews: 203,
    priceRange: "Rp 20.000 – Rp 55.000",
    priceMin: 20000,
    priceMax: 55000,
    budgetCategory: "standar",
    hours: "10:00 - 23:00",
    specialty: ["Matcha Latte", "Espresso Tonic", "Croffle"],
    lat: -7.4087,
    lng: 109.2168,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop&auto=format",
    phone: "0856-3322-1100",
    wifi: true,
    parking: true,
    outdoor: true,
    open24h: false,
    prayerRoom: false,
    meetingRoom: false,
    powerOutlets: true,
    popularityScore: 7,
    mapsUrl: "https://maps.app.goo.gl/dMmGdHknQr1b9NJaA",
  },
  {
    id: 9,
    name: "Goki Cafe",
    address: "Jl. Sokajati No.03, Bantarsoka, Purwokerto Barat, Banyumas",
    district: "Purwokerto Barat",
    rating: 4.4,
    reviews: 142,
    priceRange: "Rp 15.000 – Rp 40.000",
    priceMin: 15000,
    priceMax: 40000,
    budgetCategory: "standar",
    hours: "10:00 - 22:00",
    specialty: ["Kopi Aren", "Es Kopi Susu", "Waffle"],
    lat: -7.4105,
    lng: 109.2148,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&auto=format",
    phone: "0812-5544-6677",
    wifi: true,
    parking: false,
    outdoor: true,
    open24h: false,
    prayerRoom: false,
    meetingRoom: false,
    powerOutlets: false,
    popularityScore: 6,
    mapsUrl: "https://maps.app.goo.gl/ZvHXW18xEYu4HxQ97",
  },

  // ── Purwokerto Selatan ────────────────────────────────────────────────────
  {
    id: 10,
    name: "Diruma Coffee Living",
    address: "Jl. Sultan Agung No.255, Teluk, Purwokerto Selatan, Banyumas",
    district: "Purwokerto Selatan",
    rating: 4.8,
    reviews: 356,
    priceRange: "Rp 22.000 – Rp 55.000",
    priceMin: 22000,
    priceMax: 55000,
    budgetCategory: "standar",
    hours: "09:00 - 22:30",
    specialty: ["Cold Brew", "Single Origin", "Kopi Luwak"],
    lat: -7.4387,
    lng: 109.2270,
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=400&fit=crop&auto=format",
    phone: "0877-6655-4433",
    wifi: true,
    parking: true,
    outdoor: true,
    open24h: false,
    prayerRoom: true,
    meetingRoom: true,
    powerOutlets: true,
    popularityScore: 9,
    mapsUrl: "https://maps.app.goo.gl/8Txtjs3NaApcYfKo8",
  },
  {
    id: 11,
    name: "NAMA Coffee & Eatery",
    address: "Jl. Gerilya Timur No.35, Teluk, Purwokerto Selatan, Banyumas",
    district: "Purwokerto Selatan",
    rating: 4.7,
    reviews: 289,
    priceRange: "Rp 20.000 – Rp 50.000",
    priceMin: 20000,
    priceMax: 50000,
    budgetCategory: "standar",
    hours: "09:00 - 23:00",
    specialty: ["Pour Over", "Cappuccino", "Brown Sugar Latte"],
    lat: -7.4390,
    lng: 109.2281,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop&auto=format",
    phone: "0819-8877-6655",
    wifi: true,
    parking: true,
    outdoor: false,
    open24h: false,
    prayerRoom: true,
    meetingRoom: false,
    powerOutlets: true,
    popularityScore: 8,
    mapsUrl: "https://maps.app.goo.gl/ipv4Bb3tWTxEBjad7",
  },
  {
    id: 12,
    name: "JOY COFFEE & EATERY",
    address: "Jl. Pramuka No.253, Purwokerto Kidul, Purwokerto Selatan, Banyumas",
    district: "Purwokerto Selatan",
    rating: 4.6,
    reviews: 214,
    priceRange: "Rp 18.000 – Rp 45.000",
    priceMin: 18000,
    priceMax: 45000,
    budgetCategory: "standar",
    hours: "08:00 - 22:00",
    specialty: ["Espresso", "Kopi Susu Gula Aren", "Smoothie"],
    lat: -7.4369,
    lng: 109.2389,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop&auto=format",
    phone: "0821-9900-1122",
    wifi: true,
    parking: true,
    outdoor: true,
    open24h: false,
    prayerRoom: true,
    meetingRoom: false,
    powerOutlets: true,
    popularityScore: 7,
    mapsUrl: "https://maps.app.goo.gl/KyXL7vW1bsawVzhq5",
  },
];

export const districts = [
  "Semua Wilayah",
  "Purwokerto Utara",
  "Purwokerto Selatan",
  "Purwokerto Timur",
  "Purwokerto Barat",
];

export function getCrowdLevel(shop: CoffeeShop): {
  label: string;
  color: string;
  bg: string;
  bar: number;
} {
  const hour = new Date().getHours();
  let timeFactor: number;
  if (hour >= 7 && hour < 10) timeFactor = 0.5;
  else if (hour >= 10 && hour < 12) timeFactor = 0.7;
  else if (hour >= 12 && hour < 14) timeFactor = 1.0;
  else if (hour >= 14 && hour < 17) timeFactor = 0.65;
  else if (hour >= 17 && hour < 21) timeFactor = 0.9;
  else if (hour >= 21 && hour < 23) timeFactor = 0.75;
  else timeFactor = 0.2;

  const score = shop.popularityScore * timeFactor;

  if (score < 2.5) return { label: "Sepi", color: "text-emerald-700", bg: "bg-emerald-100", bar: 15 };
  if (score < 5)   return { label: "Sedang", color: "text-amber-700", bg: "bg-amber-100", bar: 40 };
  if (score < 7.5) return { label: "Ramai", color: "text-orange-700", bg: "bg-orange-100", bar: 70 };
  return              { label: "Sangat Ramai", color: "text-red-700", bg: "bg-red-100", bar: 95 };
}
