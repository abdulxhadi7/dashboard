"use client";

import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DragHandleProps {
  id: string | number;
}

function DragHandle({ id }: DragHandleProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Button
      ref={setNodeRef as React.Ref<HTMLButtonElement>} // ✅ FIX: properly typed
      style={style}
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:bg-transparent cursor-grab active:cursor-grabbing"
    >
      <GripVertical className="size-4" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

/**
 * Generic Drag Column for TanStack Table
 * TData: type of row data, must contain `id` field
 */
export function createDragColumn<TData extends { id: string | number }>(): ColumnDef<TData> {
  return {
    id: "drag",
    header: () => null,
    cell: ({ row }: { row: Row<TData> }) => <DragHandle id={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
    size: 20, // optional: makes column narrower
  };
}
