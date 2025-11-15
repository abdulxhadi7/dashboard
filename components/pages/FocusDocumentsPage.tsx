"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";

interface Document {
  id: number;
  title: string;
  owner: string;
  type: "PDF" | "Word" | "Excel";
  date: string;
  status: "Draft" | "Reviewed" | "Final";
}

const documentsData: Document[] = [
  { id: 1, title: "Project Plan", owner: "Abdul", type: "Word", date: "2025-11-01", status: "Final" },
  { id: 2, title: "Budget Sheet", owner: "Arham", type: "Excel", date: "2025-11-03", status: "Reviewed" },
  { id: 3, title: "Design Mockup", owner: "Yasaa", type: "PDF", date: "2025-11-05", status: "Draft" },
  { id: 4, title: "Client Report", owner: "Hamza", type: "Word", date: "2025-11-06", status: "Final" },
];

export default function FocusDocumentsPage() {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-lg font-semibold mb-4">Focus Documents</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentsData.map((doc, index) => (
            <motion.tr
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4, ease: "easeOut" }}
            >
              <TableCell>{doc.title}</TableCell>
              <TableCell>{doc.owner}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    doc.status === "Final"
                      ? "default"
                      : doc.status === "Reviewed"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {doc.status}
                </Badge>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
