import React, { useCallback } from "react";

import { useNodes } from "@/contexts/nodes-context";

import { AvailableNodes } from "@/pages/home/pieces/available-nodes";
import { Header } from "@/pages/home/pieces/header";
import { Policy } from "@/pages/home/pieces/policy";

import { DndProvider } from "@/providers/dnd-provider";

import { type DropResult } from "react-beautiful-dnd";

export const Home: React.FC = () => {
  const { addNode, nodes, replaceNode, setNodes } = useNodes();

  const handleDragEnd = useCallback(
    ({ destination, draggableId, source }: DropResult) => {
      if (!destination || destination.droppableId === "availableNodes") {
        return;
      }

      const context = destination.droppableId.split("-").pop() as
        | "otherwise"
        | "then";

      if (["condition", "output", "start"].includes(draggableId)) {
        addNode({
          ...(["otherwise", "then"].includes(context) && { context }),
          index: destination.droppableId === 'policy' ? destination.index + 1 : destination.index,
          target_id: destination.droppableId,
          type: draggableId as "condition" | "output" | "start",
        });

        return;
      }

      if (destination.droppableId !== source.droppableId) {
        const context = destination.droppableId.split("-").pop() as
          | "otherwise"
          | "then";

        replaceNode({
          context,
          index: destination.index,
          source_id: draggableId,
          target_id: destination.droppableId,
        });

        return;
      }

      const items = Array.from(nodes);
      const [reordered] = items.splice(source.index + 1, 1);
      items.splice(destination.index + 1, 0, reordered);

      setNodes(() => items);
    },
    [nodes],
  );

  return (
    <div className="flex h-screen w-full flex-col divide-y divide-dashed divide-black/25 overflow-hidden">
      <Header />
      <DndProvider onDragEnd={handleDragEnd}>
        <main className="flex h-full divide-x divide-dashed divide-black/25">
          <div className="h-full w-3/4">
            <Policy />
          </div>
          <div className="h-full w-1/4">
            <AvailableNodes />
          </div>
        </main>
      </DndProvider>
    </div>
  );
};
