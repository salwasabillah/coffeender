import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CoffeeShop, getCrowdLevel } from "../data/coffeeShops";

interface MapViewProps {
  shops: CoffeeShop[];
  selectedShop: CoffeeShop | null;
  onShopSelect: (shop: CoffeeShop) => void;
  favorites: number[];
}

const CENTER: [number, number] = [-7.4215, 109.239];
const ZOOM = 14;

function crowdDot(label: string) {
  if (label === "Sepi") return `<span style="color:#059669">●</span>`;
  if (label === "Sedang") return `<span style="color:#d97706">●</span>`;
  if (label === "Ramai") return `<span style="color:#ea580c">●</span>`;
  return `<span style="color:#dc2626">●</span>`;
}

function buildIcon(shop: CoffeeShop, selected: boolean, isFav: boolean) {
  const crowd = getCrowdLevel(shop);
  const size = selected ? 44 : 36;
  const bg = selected ? "#c2692a" : "#7c3d12";
  const border = selected ? "3px solid #fbbf24" : "2px solid rgba(255,255,255,0.8)";
  const shadow = selected
    ? "0 0 0 6px rgba(194,105,42,0.3), 0 4px 12px rgba(0,0,0,0.4)"
    : "0 2px 8px rgba(0,0,0,0.35)";
  const heart = isFav
    ? `<div style="position:absolute;top:-6px;right:-6px;width:16px;height:16px;background:#ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;border:1.5px solid white;">❤</div>`
    : "";
  return L.divIcon({
    className: "",
    iconSize: [size, size + 8],
    iconAnchor: [size / 2, size + 8],
    popupAnchor: [0, -(size + 8)],
    html: `
      <div style="position:relative;width:${size}px;">
        ${heart}
        <div style="
          width:${size}px;height:${size}px;
          background:${bg};
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          border:${border};
          box-shadow:${shadow};
          display:flex;align-items:center;justify-content:center;
          transition:all 0.2s;
        ">
          <span style="transform:rotate(45deg);font-size:${selected ? 18 : 14}px;">☕</span>
        </div>
        <div style="
          position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);
          width:6px;height:6px;background:${bg};border-radius:50%;opacity:0.5;
        "></div>
      </div>`,
  });
}

export function MapView({ shops, selectedShop, onShopSelect, favorites }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: CENTER,
      zoom: ZOOM,
      zoomControl: false,
    });

    // ESRI World Imagery — free satellite tiles
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN",
        maxZoom: 19,
      }
    ).addTo(map);

    // Labels overlay
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, opacity: 0.8 }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // sync markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // remove old markers not in current shops
    markersRef.current.forEach((marker, id) => {
      if (!shops.find((s) => s.id === id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    shops.forEach((shop) => {
      const isSelected = selectedShop?.id === shop.id;
      const isFav = favorites.includes(shop.id);
      const crowd = getCrowdLevel(shop);
      const existing = markersRef.current.get(shop.id);

      const icon = buildIcon(shop, isSelected, isFav);

      if (existing) {
        existing.setIcon(icon);
      } else {
        const marker = L.marker([shop.lat, shop.lng], { icon });

        const popupContent = `
          <div style="font-family:'Lato',sans-serif;min-width:220px;padding:4px;">
            <div style="font-weight:700;font-size:14px;color:#2c1a0e;margin-bottom:2px;">${shop.name}</div>
            <div style="font-size:11px;color:#7a5c3f;margin-bottom:6px;">${shop.address}</div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
              <span style="background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:999px;font-size:11px;font-weight:600;">
                ⭐ ${shop.rating}
              </span>
              <span style="background:${crowd.bg.replace("bg-", "").includes("emerald") ? "#d1fae5" : crowd.bg.replace("bg-", "").includes("amber") ? "#fef3c7" : crowd.bg.replace("bg-", "").includes("orange") ? "#ffedd5" : "#fee2e2"};color:${crowd.color.replace("text-", "")};padding:2px 7px;border-radius:999px;font-size:11px;">
                ${crowdDot(crowd.label)} ${crowd.label}
              </span>
            </div>
            <div style="font-size:11px;color:#7a5c3f;margin-bottom:2px;">🕐 ${shop.hours}</div>
            <div style="font-size:11px;color:#7a5c3f;margin-bottom:8px;">💰 ${shop.priceRange}</div>
            <a
              href="${shop.mapsUrl}"
              target="_blank"
              rel="noopener noreferrer"
              style="display:inline-flex;align-items:center;gap:5px;background:#4285F4;color:white;padding:5px 12px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              Buka di Google Maps
            </a>
          </div>`;

        marker.bindPopup(popupContent, {
          maxWidth: 280,
          className: "coffee-popup",
        });

        marker.on("click", () => {
          onShopSelect(shop);
        });

        marker.addTo(map);
        markersRef.current.set(shop.id, marker);
      }
    });
  }, [shops, selectedShop, favorites, onShopSelect]);

  // pan to selected shop
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedShop) return;
    map.flyTo([selectedShop.lat, selectedShop.lng], Math.max(map.getZoom(), 15), {
      duration: 0.8,
    });
    const marker = markersRef.current.get(selectedShop.id);
    if (marker) marker.openPopup();
  }, [selectedShop]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
      <div ref={containerRef} className="w-full h-full" />

      {/* satellite badge */}
      <div
        className="absolute top-3 left-3 z-[1000] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
        style={{
          background: "rgba(28,18,10,0.75)",
          color: "#fbbf24",
          backdropFilter: "blur(6px)",
          fontFamily: "'DM Mono',monospace",
          border: "1px solid rgba(251,191,36,0.25)",
        }}
      >
        🛰 Satelit · {shops.length} kedai
      </div>

      {/* legend */}
      <div
        className="absolute bottom-8 left-3 z-[1000] rounded-xl px-3 py-2 text-xs space-y-1"
        style={{
          background: "rgba(28,18,10,0.8)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          fontFamily: "'Lato',sans-serif",
        }}
      >
        <div className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> Sepi</div>
        <div className="flex items-center gap-1.5"><span className="text-amber-400">●</span> Sedang</div>
        <div className="flex items-center gap-1.5"><span className="text-orange-400">●</span> Ramai</div>
        <div className="flex items-center gap-1.5"><span className="text-red-400">●</span> Sangat Ramai</div>
      </div>

      <style>{`
        .coffee-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          border: 1px solid rgba(124,61,18,0.15);
          padding: 0;
        }
        .coffee-popup .leaflet-popup-content { margin: 12px 14px; }
        .coffee-popup .leaflet-popup-tip { background: white; }
        .leaflet-container { background: #1a1a2e; }
      `}</style>
    </div>
  );
}
