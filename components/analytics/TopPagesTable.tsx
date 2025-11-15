"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

interface PageData {
  page: string;
  views: number;
  bounceRate: number;
  avgSession: number;
}

interface TopPagesTableProps {
  data: PageData[];
}

export const TopPagesTable: React.FC<TopPagesTableProps> = ({ data }) => {
  const columns: ColumnDef<PageData>[] = [
    {
      header: "Page",
      accessorKey: "page",
    },
    {
      header: "Views",
      accessorKey: "views",
    },
    {
      header: "Bounce Rate (%)",
      accessorKey: "bounceRate",
    },
    {
      header: "Avg. Session (min)",
      accessorKey: "avgSession",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow">
      <h2 className="font-bold mb-2">Top Pages</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border-b border-gray-200 dark:border-zinc-700">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border-b border-gray-200 dark:border-zinc-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
