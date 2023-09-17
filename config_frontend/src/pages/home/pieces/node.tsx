import React from "react";

import { Icon } from "@/components/icon";

import { type Node as NodeProps } from "@/contexts/nodes-context";

import { ConditionNode } from "@/pages/home/pieces/condition-node";
import { OutputNode } from "@/pages/home/pieces/output-node";
import { StartNode } from "@/pages/home/pieces/start-node";

import { cn } from "@/lib/cn";

import { type DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  dragHandleProps?: DraggableProvidedDragHandleProps;
  node: NodeProps;
}

export const Node: React.FC<Props> = ({
  className,
  dragHandleProps,
  node,
  ...props
}) => {
  return (
    <div
      className={cn("relative my-4 flex w-full items-center", className)}
      {...props}
    >
      {node.type === "condition" && (
        <ConditionNode dragHandleProps={dragHandleProps} node={node} />
      )}
      {node.type === "output" && (
        <OutputNode dragHandleProps={dragHandleProps} node={node} />
      )}
      {node.type === "start" && <StartNode node={node} />}
      <span className="absolute left-4 top-[calc(100%+8px)] w-fit group-last:hidden">
        <Icon use="ChevronDown" />
      </span>
    </div>
  );
};
