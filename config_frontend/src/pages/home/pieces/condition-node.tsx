import React from "react";

import { Icon } from "@/components/icon";

import { useDnd } from "@/contexts/dnd-context";
import { useNodes, type Node } from "@/contexts/nodes-context";

import { Criteria } from "@/pages/home/pieces/criteria";
import { Nodes } from "@/pages/home/pieces/nodes";
import { Value } from "@/pages/home/pieces/value";
import { Variable } from "@/pages/home/pieces/variable";

import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

type Props = {
  dragHandleProps?: DraggableProvidedDragHandleProps;
  node: Node;
};

export const ConditionNode: React.FC<Props> = ({ dragHandleProps, node }) => {
  const { active } = useDnd();
  const { removeNode, updateNode } = useNodes();

  const { type } = node;

  if (type !== "condition") {
    return null;
  }

  const { condition } = node;

  const { criteria, value, variable } = condition;

  return (
    <div className="boder-black/25 peer flex w-full flex-col divide-y divide-dashed divide-black/25 rounded-lg border border-dashed border-black/25 bg-white text-sm text-black/75 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <Icon color="orange" use="Condition" />
          if
          <Variable
            onChange={(variable) => {
              updateNode({
                ...node,
                condition: { ...node.condition, variable },
              });
            }}
            variable={variable}
          />
          is
          <Criteria
            criteria={criteria}
            onChange={(criteria) => {
              updateNode({
                ...node,
                condition: { ...node.condition, criteria },
              });
            }}
          />
          towards
          <Value
            onChange={(value) => {
              updateNode({ ...node, condition: { ...node.condition, value } });
            }}
            value={value}
          />
          then:
        </div>
        <div className="flex items-center gap-2">
          <button
            data-testid="remove-node"
            onClick={() => removeNode({ ...node })}
            className="opacity-25 transition-opacity hover:opacity-100"
          >
            <Icon color="red" use="Remove" />
          </button>
          {dragHandleProps && (
            <span
              {...dragHandleProps}
              className="opacity-25 transition-opacity hover:opacity-100"
            >
              <Icon color="gray" fill="white" use="Grip" />
            </span>
          )}
        </div>
      </div>
      {node.then && (
        <div className="group px-8 py-4">
          <Nodes
            context="then"
            disabled={
              ((active &&
                "parent_ids" in node &&
                node["parent_ids"]!.includes(active.draggableId)) ||
                node.id === active?.draggableId) ??
              false
            }
            id={node.id!}
            nodes={node.then}
          />
        </div>
      )}
      {node.otherwise ? (
        <div className="flex flex-col divide-y divide-dashed divide-black/25">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3">
              <Icon color="orange" use="Condition" />
              <span>otherwise:</span>
            </div>
            <button
              data-testid="remove-node-otherwise"
              onClick={() => updateNode({ ...node, otherwise: undefined })}
              className="opacity-25 transition-opacity hover:opacity-100"
            >
              <Icon color="red" use="Remove" />
            </button>
          </div>
          <div className="group px-8 py-4">
            <Nodes
              context="otherwise"
              disabled={
                ((active &&
                  "parent_ids" in node &&
                  node["parent_ids"]!.includes(active.draggableId)) ||
                  node.id === active?.draggableId) ??
                false
              }
              id={node.id!}
              nodes={node.otherwise}
            />
          </div>
        </div>
      ) : (
        <button
          data-testid="otherwise"
          onClick={() => updateNode({ ...node, otherwise: [] })}
          className="px-3 py-1 text-start opacity-75 transition-opacity hover:opacity-100"
        >
          otherwise
        </button>
      )}
    </div>
  );
};
