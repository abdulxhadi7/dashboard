"use client";

import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

interface GeoMapProps {
  data: Record<string, number>; // e.g., { US: 120, IN: 300 }
}

// Country code -> approximate lat/lng
const COUNTRY_POSITIONS: Record<string, LatLngExpression> = {
  US: [37.0902, -95.7129],
  IN: [20.5937, 78.9629],
  GB: [55.3781, -3.4360],
  FR: [46.2276, 2.2137],
  CN: [35.8617, 104.1954],
};

export const GeoMap: React.FC<GeoMapProps> = ({ data }) => {
  const countries = Object.keys(data);
  if (!countries.length) {
    return <p className="text-gray-500 dark:text-gray-400">No geographic traffic data</p>;
  }

  const maxValue = Math.max(...Object.values(data));

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow mt-4">
      <h2 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Traffic by Country</h2>

      <MapContainer
        center={[20, 0] as LatLngExpression}
        zoom={2}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "350px", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {countries.map((code) => {
          const pos = COUNTRY_POSITIONS[code];
          if (!pos) return null;

          const value = data[code];
          const radius = Math.min(30, Math.max(5, (value / maxValue) * 30));

          return (
            <CircleMarker
              key={code}
              center={pos}
              pathOptions={{ color: "#1e40af", fillColor: "#4f46e5", fillOpacity: 0.6 }}
              radius={radius}
            >
              <Tooltip direction="top" offset={[0, -radius]} opacity={1} className="font-semibold">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                  {`${code}: ${value} visits`}
                </motion.div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};
