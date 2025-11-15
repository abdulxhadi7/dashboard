import type { ColumnDef, Table, Row } from "@tanstack/react-table";
import { createDragColumn } from "./drag-column";
import React from "react";

export function createSelectColumn<T>(): ColumnDef<T> {
  return {
    id: "select",

    header: ({ table }: { table: Table<T> }) =>
      React.createElement("input", {
        type: "checkbox",
        checked: table.getIsAllPageRowsSelected(),
        onChange: table.getToggleAllPageRowsSelectedHandler(),
        "aria-label": "Select all rows",
      }),

    cell: ({ row }: { row: Row<T> }) =>
      React.createElement("input", {
        type: "checkbox",
        checked: row.getIsSelected(),
        onChange: row.getToggleSelectedHandler(),
        "aria-label": `Select row ${row.id}`,
      }),

    enableSorting: false,
    enableHiding: false,
  };
}

export function withDndColumn<T extends { id: string | number }>(
  columns: ColumnDef<T>[]
): ColumnDef<T>[] {
  return [createSelectColumn<T>(), createDragColumn<T>(), ...columns];
}
