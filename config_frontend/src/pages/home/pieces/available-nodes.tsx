import React, { useMemo } from "react";

import { Icon, IconTypes } from "@/components/icon";
import { Draggable } from "@/components/draggable";

import { Node } from "@/contexts/nodes-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";

export const AvailableNodes: React.FC = () => {
  const { decisionNodes, endNode, startNode } = useNodesLogic();

  const availableNodeTypes = useMemo(
    () =>
      [
        ...(!endNode && startNode
          ? [
              {
                icon: "Decision",
                label: "Decision",
                type: "DECISION",
              },
            ]
          : []),
        ...(!endNode && decisionNodes.length > 0 && startNode
          ? [
              {
                icon: "End",
                label: "End",
                type: "END",
              },
            ]
          : []),
        ...(!startNode
          ? [
              {
                icon: "Start",
                label: "Start",
                type: "START",
              },
            ]
          : []),
      ] as {
        icon?: IconTypes;
        label: string;
        type: Node["type"];
      }[],
    [decisionNodes, endNode, startNode],
  );

  return (
    <div className="flex h-full w-full flex-col gap-16 bg-white px-8 py-16">
      <div className="flex flex-col">
        <h2 className="text-black/75">Available Nodes</h2>
        <p className="text-sm text-black/50">
          This is a draggable list of available nodes based on your policy's
          current state.
        </p>
      </div>
      <ul className="flex flex-col items-center gap-4">
        {availableNodeTypes.length !== 0 ? (
          availableNodeTypes.map((availableNodeType) => (
            <Draggable key={availableNodeType.type} id={availableNodeType.type}>
              <li className="boder-black/25 flex w-fit items-center justify-center gap-3 rounded-lg border border-dashed border-black/25 bg-white px-4 py-3 text-sm text-black/75">
                {availableNodeType.icon && (
                  <Icon color="#808080" use={availableNodeType.icon} />
                )}
                {availableNodeType.label}
              </li>
            </Draggable>
          ))
        ) : (
          <p className="text-sm text-black/50">
            If you see no nodes, maybe your diagram is complete. Try removing
            the "end" node to add more "decision" nodes.
            <br />
            <br />
            If you want to change the course of logic, toggle the end node by
            clicking on it.
          </p>
        )}
      </ul>
    </div>
  );
};
