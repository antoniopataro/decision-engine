import React, { useCallback } from "react";

import { useNodes } from "@/contexts/nodes-context";

import { AvailableNodes } from "@/pages/home/pieces/available-nodes";
import { Header } from "@/pages/home/pieces/header";
import { Policy } from "@/pages/home/pieces/policy";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

export const Home: React.FC = () => {
  const { addNode } = useNodes();

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      if (
        e.collisions?.[0]?.id !== "POLICY" &&
        (e.delta.x !== 0 || e.delta.y !== 0)
      ) {
        return;
      }

      if (e.active.id === "DECISION") {
        addNode({ type: "DECISION" });
        return;
      }

      if (e.active.id === "END") {
        addNode({ type: "END" });
        return;
      }

      if (e.active.id === "START") {
        addNode({ type: "START" });
        return;
      }
    },
    [addNode],
  );

  return (
    <div className="flex h-screen w-full flex-col divide-y divide-dashed divide-black/25 overflow-hidden">
      <Header />
      <DndContext onDragEnd={handleDragEnd}>
        <main className="flex h-full divide-x divide-dashed divide-black/25">
          <div className="h-full w-3/4">
            <Policy />
          </div>
          <div className="h-full w-1/4">
            <AvailableNodes />
          </div>
        </main>
      </DndContext>
    </div>
  );
};
