import { useMemo } from "react";

import { useNodes } from "@/contexts/nodes-context";

export const useNodesLogic = () => {
  const { nodes } = useNodes();

  const decisionNodes = useMemo(
    () => nodes.filter((node) => node.type === "DECISION"),
    [nodes],
  );

  const endNode = useMemo(
    () => nodes.find((node) => node.type === "END"),
    [nodes],
  );

  const startNode = useMemo(
    () => nodes.find((node) => node.type === "START"),
    [nodes],
  );

  return {
    endNode,
    decisionNodes,
    startNode,
  };
};
