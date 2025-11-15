"use client";

import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Row, Cell } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { TableRow, TableCell } from "@/components/ui/table";

interface DraggableRowProps<TData> {
  row: Row<TData>;
}

export function DraggableRow<TData>({ row }: DraggableRowProps<TData>) {
  const { setNodeRef, transform, transition } = useSortable({
    id: row.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef as React.Ref<HTMLTableRowElement>}
      style={style}
      data-state={row.getIsSelected() ? "selected" : undefined}
    >
      {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
