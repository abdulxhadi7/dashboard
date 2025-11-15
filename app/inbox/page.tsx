"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  StarOff,
  Mail,
  MailOpen,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// -------------------------
// Dummy Messages
// -------------------------
const messagesList = [
  {
    id: 1,
    name: "Aarav Sharma",
    subject: "Project Update Required",
    message:
      "Hey, can you share the latest update on the campaign performance? We need to review before tomorrow.",
    time: "10:45 AM",
    unread: true,
    starred: false,
  },
  {
    id: 2,
    name: "Sarah Williams",
    subject: "Invoice Confirmation",
    message:
      "The invoice for this month's content strategy has been processed successfully.",
    time: "Yesterday",
    unread: false,
    starred: true,
  },
  {
    id: 3,
    name: "Michael Chen",
    subject: "Meeting Schedule",
    message:
      "Please check your availability for a meeting regarding the upcoming marketing rollout.",
    time: "Wed",
    unread: true,
    starred: false,
  },
  {
    id: 4,
    name: "Emily Davis",
    subject: "Creative Feedback",
    message:
      "I reviewed the latest design drafts. I have some suggestions for the hero section.",
    time: "Tue",
    unread: false,
    starred: false,
  },
  {
    id: 5,
    name: "David Miller",
    subject: "Analytics Report",
    message:
      "The audience engagement stats for Q4 look promising. Let’s finalize the report.",
    time: "Mon",
    unread: false,
    starred: true,
  },
];

export default function InboxPage() {
  const [messages, setMessages] = useState(messagesList);
  const [selected, setSelected] = useState(messagesList[0]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread" && !m.unread) return false;
    if (filter === "starred" && !m.starred) return false;
    if (
      search &&
      !m.name.toLowerCase().includes(search.toLowerCase()) &&
      !m.subject.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const toggleStar = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const markRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, unread: false } : msg
      )
    );
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT SECTION - MESSAGE LIST */}
      <Card className="rounded-2xl shadow-md md:col-span-1 h-[82vh] flex flex-col">
        <CardContent className="p-5 space-y-4 h-full flex flex-col">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              All
            </Button>

            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className="rounded-full"
            >
              Unread
            </Button>

            <Button
              variant={filter === "starred" ? "default" : "outline"}
              onClick={() => setFilter("starred")}
              className="rounded-full"
            >
              Starred
            </Button>
          </div>

          {/* Message List */}
          <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1">
            {filteredMessages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => {
                  setSelected(msg);
                  markRead(msg.id);
                }}
                className={`p-4 rounded-xl border cursor-pointer hover:bg-gray-50 transition flex justify-between items-start ${
                  selected?.id === msg.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="space-y-1">
                  <div className="font-semibold text-gray-800 flex items-center gap-2">
                    {msg.unread ? (
                      <Mail className="h-4 w-4 text-blue-500" />
                    ) : (
                      <MailOpen className="h-4 w-4 text-gray-500" />
                    )}
                    {msg.name}
                  </div>
                  <p className="text-sm text-gray-600">{msg.subject}</p>
                  <p className="text-xs text-gray-500 truncate w-52">
                    {msg.message}
                  </p>
                  <p className="text-xs text-gray-400">{msg.time}</p>
                </div>

                {/* Star Button */}
                <button onClick={() => toggleStar(msg.id)}>
                  {msg.starred ? (
                    <Star className="text-yellow-500 h-5 w-5" />
                  ) : (
                    <StarOff className="text-gray-400 h-5 w-5" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RIGHT SECTION - MESSAGE VIEWER */}
      <Card className="rounded-2xl shadow-md md:col-span-2 h-[82vh]">
        <CardContent className="p-6 space-y-4 h-full flex flex-col">

          {selected ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{selected.subject}</h2>

                <button onClick={() => toggleStar(selected.id)}>
                  {selected.starred ? (
                    <Star className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <StarOff className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="text-gray-600">
                <span className="font-medium text-gray-800">
                  From: {selected.name}
                </span>
                <br />
                <span className="text-sm">{selected.time}</span>
              </div>

              <div className="border-t pt-4 text-gray-700 leading-relaxed text-[15px]">
                {selected.message}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a message to read
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
