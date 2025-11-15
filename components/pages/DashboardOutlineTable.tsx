"use client";

import * as React from "react";
import { Plus, Funnel } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { withDndColumn } from "@/components/data-table/table-utils";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import type { ColumnDef } from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */
export type StatusType = "Not Started" | "In Progress" | "Completed" | "Blocked";

export type Section = {
  id: number;
  title: string;
  sectionType: string;
  status: StatusType;
  target: number;
  limit: number;
  reviewer: string | null;
};

/* -------------------------------------------------------------------------- */
/*                                 CONSTANTS                                  */
/* -------------------------------------------------------------------------- */
const reviewers = ["Abdul Hadi", "Arham khan", "Yasaa Siddique", "Hamza Umar Khan", "Zeeshan Khan"] as const;
const sectionTypes = ["Content", "Technical", "Strategy", "Design", "Compliance"] as const;
const statusList: StatusType[] = ["Not Started", "In Progress", "Completed", "Blocked"];

const statusConfig: Record<StatusType, string> = {
  "Not Started": "bg-gray-200 text-gray-700",
  "In Progress": "bg-blue-200 text-blue-700",
  Completed: "bg-green-200 text-green-700",
  Blocked: "bg-red-200 text-red-700",
};

const getRandom = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateSections = (count = 6): Section[] =>
  Array.from({ length: count }, (_, i) => ({
    id: Math.floor(Math.random() * 1_000_000) + i,
    title: `Section Header ${i + 1}`,
    sectionType: getRandom(sectionTypes),
    status: getRandom(statusList),
    target: Math.floor(Math.random() * 20) + 5,
    limit: Math.floor(Math.random() * 30) + 10,
    reviewer: getRandom(reviewers),
  }));

/* -------------------------------------------------------------------------- */
/*                               TABLE COLUMNS                                */
/* -------------------------------------------------------------------------- */
const createColumns = (updateRow: (id: number, patch: Partial<Section>) => void): ColumnDef<Section>[] => [
  {
    accessorKey: "title",
    header: "Header",
    cell: ({ row }) => (
      <Input
        defaultValue={row.original.title}
        className="h-8"
        onBlur={(e) => updateRow(row.original.id, { title: e.target.value })}
      />
    ),
  },
  {
    accessorKey: "sectionType",
    header: "Section Type",
    cell: ({ row }) => (
      <Select
        defaultValue={row.original.sectionType}
        onValueChange={(value) => updateRow(row.original.id, { sectionType: value })}
      >
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sectionTypes.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Select
        defaultValue={row.original.status}
        onValueChange={(value) => updateRow(row.original.id, { status: value as StatusType })}
      >
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusList.map((s) => (
            <SelectItem key={s} value={s}>
              <div className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusConfig[s]}`}>{s}</div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }) => (
      <Input
        type="number"
        defaultValue={row.original.target}
        className="h-8 w-20"
        onBlur={(e) => updateRow(row.original.id, { target: Number(e.target.value) })}
      />
    ),
  },
  {
    accessorKey: "limit",
    header: "Limit",
    cell: ({ row }) => (
      <Input
        type="number"
        defaultValue={row.original.limit}
        className="h-8 w-20"
        onBlur={(e) => updateRow(row.original.id, { limit: Number(e.target.value) })}
      />
    ),
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => (
      <Select
        defaultValue={row.original.reviewer ?? undefined}
        onValueChange={(value) => updateRow(row.original.id, { reviewer: value })}
      >
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="Select reviewer" />
        </SelectTrigger>
        <SelectContent>
          {reviewers.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */
export function DashboardOutlineTable() {
  const [data, setData] = React.useState<Section[]>(generateSections(6));
  const [filterOpen, setFilterOpen] = React.useState(false);

  const updateRow = (id: number, patch: Partial<Section>) => {
    setData((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const columns = withDndColumn(createColumns(updateRow));

  const table = useDataTableInstance<Section, unknown>({
    data,
    columns,
    getRowId: (row) => row.id.toString(),
  });

  const addSection = () => {
    const newSection: Section = {
      id: Math.floor(Math.random() * 1_000_000),
      title: `New Section ${data.length + 1}`,
      sectionType: sectionTypes[0],
      status: "Not Started",
      target: 10,
      limit: 20,
      reviewer: null,
    };
    setData([newSection, ...data]);
    // Scroll to top smoothly
    document.getElementById("dashboard-table")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4 w-full" id="dashboard-table">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Outline Overview</h2>
          <Badge variant="secondary">{data.length} sections</Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <Button variant="outline" size="sm" onClick={() => setFilterOpen(!filterOpen)}>
            <Funnel className="h-4 w-4" /> Filter
          </Button>

          {/* Add Section */}
          <Button variant="outline" size="sm" onClick={addSection}>
            <Plus className="h-4 w-4" /> Add Section
          </Button>
        </div>
      </div>

      {/* Filter Placeholder */}
      {filterOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border rounded p-4"
        >
          <p className="text-sm text-gray-500">Filter options will go here</p>
        </motion.div>
      )}

      {/* TABLE */}
      <div className="rounded-lg border overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={data.length} // trigger animation on add/remove
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DataTable dndEnabled table={table} columns={columns} onReorder={setData} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-end">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
