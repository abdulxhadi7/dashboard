"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";

interface FiltersProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
      {/* Start Date */}
      <div className="relative w-full sm:w-48">
        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
          Start Date
        </label>
        <button
          onClick={() => setOpenStart((prev) => !prev)}
          className="flex items-center justify-between w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 bg-white dark:bg-zinc-800"
        >
          <span>{startDate.toLocaleDateString()}</span>
          <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
        <AnimatePresence>
          {openStart && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 mt-1"
            >
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                  if (date) setStartDate(date);
                  setOpenStart(false);
                }}
                inline
                showMonthDropdown
                showYearDropdown
                dropdownMode="scroll"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* End Date */}
      <div className="relative w-full sm:w-48">
        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
          End Date
        </label>
        <button
          onClick={() => setOpenEnd((prev) => !prev)}
          className="flex items-center justify-between w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 bg-white dark:bg-zinc-800"
        >
          <span>{endDate.toLocaleDateString()}</span>
          <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
        <AnimatePresence>
          {openEnd && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 mt-1"
            >
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => {
                  if (date) setEndDate(date);
                  setOpenEnd(false);
                }}
                inline
                showMonthDropdown
                showYearDropdown
                dropdownMode="scroll"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
