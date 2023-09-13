import React from "react";

import { Icon } from "@/components/icon";

import { useNodes, type Node } from "@/contexts/nodes-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";

import { Criteria } from "@/pages/home/pieces/criteria";
import { Value } from "@/pages/home/pieces/value";
import { Variable } from "@/pages/home/pieces/variable";

export const DecisionNode: React.FC<{ node: Node }> = ({ node }) => {
  const { updateNode } = useNodes();

  const { endNode } = useNodesLogic();

  const { type } = node;

  if (type !== "DECISION") {
    return null;
  }

  const { decision } = node;

  const { criteria, value, variable } = decision;

  return (
    <li className="boder-black/25 flex w-fit items-center gap-3 rounded-lg border border-dashed border-black/25 bg-white px-4 py-3 text-sm text-black/75 backdrop-blur-sm">
      <Icon
        color={
          endNode && endNode.type === "END"
            ? endNode.output === true
              ? "red"
              : "green"
            : "red"
        }
        use="Decision"
      />
      decide{" "}
      {endNode && endNode.type === "END"
        ? (!endNode.output).toString()
        : "false"}{" "}
      if
      <Variable
        onChange={(variable) => {
          updateNode({ ...node, decision: { ...node.decision, variable } });
        }}
        variable={variable}
      />
      is
      <Criteria
        criteria={criteria}
        onChange={(criteria) => {
          updateNode({ ...node, decision: { ...node.decision, criteria } });
        }}
      />
      towards
      <Value
        onChange={(value) => {
          updateNode({ ...node, decision: { ...node.decision, value } });
        }}
        value={value}
      />
    </li>
  );
};
