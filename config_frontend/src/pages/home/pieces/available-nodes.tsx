import React, { useMemo } from "react";

import { Icon, type IconTypes } from "@/components/icon";

import { type Node } from "@/contexts/nodes-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";
import { Draggable, Droppable } from "react-beautiful-dnd";

export const AvailableNodes: React.FC = () => {
  const { lastNode, startNode } = useNodesLogic();

  const availableNodes: {
    icon?: IconTypes;
    label: string;
    type: Node["type"];
  }[] = useMemo(() => {
    if (lastNode && lastNode.type === "output") {
      return [];
    }

    if (!startNode) {
      return [
        {
          icon: "Start",
          label: "Start",
          type: "start",
        },
      ];
    }

    return [
      {
        icon: "Condition",
        label: "Condition",
        type: "condition",
      },
      {
        icon: "Output",
        label: "Output",
        type: "output",
      },
    ];
  }, [lastNode, startNode]);

  return (
    <div className="flex h-full w-full flex-col gap-16 bg-white px-8 py-16">
      <div className="flex flex-col">
        <h2 className="text-black/75">Available Nodes</h2>
        <p className="text-sm text-black/50">
          This is a draggable list of available nodes based on your policy's
          current state.
        </p>
      </div>
      <Droppable droppableId="availableNodes">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className="flex flex-col items-center gap-4"
          >
            {availableNodes.length !== 0 ? (
              availableNodes.map((availableNode, index) => (
                <Draggable
                  draggableId={availableNode.type}
                  index={index}
                  key={availableNode.type}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <li className="boder-black/25 flex w-fit items-center justify-center gap-3 rounded-lg border border-dashed border-black/25 bg-white px-4 py-3 text-sm text-black/75">
                        {availableNode.icon && (
                          <Icon color="#808080" use={availableNode.icon} />
                        )}
                        {availableNode.label}
                      </li>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <p className="text-sm text-black/50">
                If you see no nodes, maybe your diagram is complete. Try
                removing the "end" node to add more "decision" nodes.
                <br />
                <br />
                If you want to change the course of logic, toggle the end node
                by clicking on it.
              </p>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};
