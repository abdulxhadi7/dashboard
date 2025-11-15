"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";

interface Personnel {
  id: number;
  name: string;
  role: string;
  email: string;
  status: "Active" | "On Leave" | "Inactive";
}

const personnelData: Personnel[] = [
  { id: 1, name: "Abdul Hadi", role: "Lead Designer", email: "abdulxhadi7@gmail.com", status: "Active" },
  { id: 2, name: "Arham Khan", role: "Full-stack Developer", email: "arham@example.com", status: "Active" },
  { id: 3, name: "Yasaa Siddique", role: "Developer", email: "yasaa@example.com", status: "On Leave" },
  { id: 4, name: "Hamza Umar Khan", role: "QA Engineer", email: "hamza@example.com", status: "Active" },
];

export default function KeyPersonnelPage() {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-lg font-semibold mb-4">Key Personnel</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {personnelData.map((person, index) => (
            <TableRow key={person.id}>
              <TableCell>
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                >
                  {person.name}
                </motion.div>
              </TableCell>

              <TableCell>
                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                >
                  {person.role}
                </motion.div>
              </TableCell>

              <TableCell>
                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                >
                  {person.email}
                </motion.div>
              </TableCell>

              <TableCell>
                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                >
                  <Badge
                    variant={
                      person.status === "Active"
                        ? "default"
                        : person.status === "On Leave"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {person.status}
                  </Badge>
                </motion.div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
