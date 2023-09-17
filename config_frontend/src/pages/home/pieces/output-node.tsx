import React from "react";

import { Block } from "@/components/block";
import { Icon } from "@/components/icon";

import { useNodes, type Node } from "@/contexts/nodes-context";

import { cn } from "@/lib/cn";

import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

import { green, red } from "tailwindcss/colors";

type Props = {
  dragHandleProps?: DraggableProvidedDragHandleProps;
  node: Node;
};

export const OutputNode: React.FC<Props> = ({ dragHandleProps, node }) => {
  const { removeNode, updateNode } = useNodes();

  const { type } = node;

  if (type !== "output") {
    return null;
  }

  const { output } = node;

  return (
    <Block
      icon={{
        color: output === true ? green[500] : red[500],
        use: "Output",
      }}
      onClick={() => updateNode({ ...node, output: !output })}
      className={cn("peer cursor-pointer backdrop-blur-sm", {
        "bg-green-500/25 text-green-500": output,
        "bg-red-500/25 text-red-500": !output,
      })}
    >
      <div className="flex items-center gap-3">
        <span>Output</span>
        <p
          className={cn("font-normal", {
            "text-green-500/75": output,
            "text-red-500/75": !output,
          })}
        >
          The policy decides {output.toString()} here.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => removeNode({ ...node })}
          className="opacity-25 transition-opacity hover:opacity-100"
        >
          <Icon color="red" use="Remove" />
        </button>
        {dragHandleProps && (
          <span {...dragHandleProps}
          className="opacity-25 transition-opacity hover:opacity-100"
          >
            <Icon color="gray" fill="white" use="Grip" />
          </span>
        )}
      </div>
    </Block>
  );
};
