"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

const items = [
  { 
    title: "Total Revenue",
    description: "Track earnings and growth trends.",
    preview: "View revenue analytics",
    bg: "bg-gradient-to-tr from-sky-500 to-blue-800"
  },
  { 
    title: "New Customers",
    description: "Monitor recently joined users.",
    preview: "See customer growth",
    bg: "bg-gradient-to-tr from-green-500 to-emerald-700"
  },
  { 
    title: "Active Accounts",
    description: "Live user activity & engagement stats.",
    preview: "Explore active users",
    bg: "bg-gradient-to-tr from-yellow-500 to-yellow-800"
  },
  { 
    title: "Growth Rate",
    description: "Key performance and trend metrics.",
    preview: "View performance charts",
    bg: "bg-gradient-to-tr from-rose-500 to-red-800"
  },
];

export default function ImageAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div
      id="Image"
      className="w-full h-[320px] md:h-[360px] lg:h-[380px] xl:h-[400px] flex items-center"
    >
      <div className="flex w-full h-full gap-3 overflow-hidden">

        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <motion.div
              key={index}
              onClick={() => setActive(index)}
              layout
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
              className={`relative overflow-hidden rounded-xl cursor-pointer shadow-lg ${item.bg}
                
                /* ❤️ FIXED: natural responsive sizing */
                flex-shrink-0
                ${isActive ? "flex-[3]" : "flex-[1]"}
                opacity-100 hover:opacity-95
                
                transition-all duration-700
                h-full
              `}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />

              {/* Hover Preview (collapsed) */}
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 text-white/90"
                >
                  
                  <p className="text-xs md:text-sm font-medium">{item.preview}</p>
                </motion.div>
              )}

              {/* Active Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 w-full p-4 flex items-start gap-3"
                  >
                   

                    <div>
                      <h2 className="text-white text-base md:text-lg font-semibold">
                        {item.title}
                      </h2>
                      <p className="text-white/80 text-xs md:text-sm mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}
