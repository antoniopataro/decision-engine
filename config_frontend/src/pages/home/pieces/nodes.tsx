import React from "react";

import { type Node as NodeProps } from "@/contexts/nodes-context";

import { Node } from "@/pages/home/pieces/node";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDnd } from "@/contexts/dnd-context";

type Props = {
  context?: "otherwise" | "then";
  disabled?: boolean;
  id: string;
  nodes: NodeProps[];
};

export const Nodes: React.FC<Props> = ({ context, disabled, id, nodes }) => {
  const { overId, setOverId } = useDnd();

  return (
    <Droppable
      direction="vertical"
      droppableId={context ? `${id}-${context}` : id}
      isDropDisabled={disabled || id !== overId}
    >
      {(provided, snapshot) => (
        <ul
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="relative flex h-full w-full flex-col"
        >
          {nodes.length !== 0
            ? nodes
                .filter((node) => node.type !== "start")
                .map((node, index) => (
                  <Draggable draggableId={node.id!} key={node.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        onMouseOver={(e) => {
                          e.stopPropagation();
                          setOverId(node.id!);
                        }}
                        onMouseLeave={() => setOverId("policy")}
                        className="group z-50"
                      >
                        <Node
                          dragHandleProps={
                            provided.dragHandleProps ?? undefined
                          }
                          node={node}
                          style={{
                            zIndex: nodes.length - index,
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
            : id !== "policy" &&
              !snapshot.isDraggingOver && (
                <span className="text-sm text-black/50">Drop nodes here.</span>
              )}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
