import { useMemo } from "react";

import { useNodes } from "@/contexts/nodes-context";

export const useNodesLogic = () => {
  const { nodes } = useNodes();

  const lastNode = useMemo(
    () => (nodes.length > 0 ? nodes[nodes.length - 1] : null),
    [nodes],
  );

  const startNode = useMemo(
    () => nodes.find((node) => node.type === "start"),
    [nodes],
  );

  return {
    lastNode,
    startNode,
  };
};
