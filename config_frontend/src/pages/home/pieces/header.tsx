import React, { useCallback, useMemo } from "react";

import { Button } from "@/components/button";

import { DEFAULT_POLICY_ID } from "@/config/envs";

import { type Node, useNodes } from "@/contexts/nodes-context";
import { usePolicy } from "@/contexts/policy-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";

export const Header: React.FC = () => {
  const { clearNodes, revertNodes, unindentifiedNodes } = useNodes();
  const { loadingUpdate, policy, updatePolicy } = usePolicy();

  const { startNode } = useNodesLogic();

  const canUpdatePolicy = useMemo(() => {
    if (!policy) {
      return false;
    }

    if (
      JSON.stringify(
        unindentifiedNodes.filter((node) => node.type !== "start"),
      ) !== JSON.stringify(policy.nodes)
    ) {
      return true;
    }

    return false;
  }, [policy, unindentifiedNodes]);

  const handleUpdatePolicy = useCallback(async () => {
    await updatePolicy({
      nodes: unindentifiedNodes.filter(
        (node) => node.type !== "start",
      ) as Node[],
      id: DEFAULT_POLICY_ID,
    });
  }, [DEFAULT_POLICY_ID, unindentifiedNodes]);

  return (
    <header className="flex items-center justify-between px-16 py-8">
      <div className="flex flex-col">
        <h1 className="text-3xl text-black/75">Decision Engine</h1>
        <p className="text-sm text-black/75">
          Edit the diagram below. Hit deploy to make it available.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          disabled={!startNode}
          icon={{ color: "#808080", use: "Remove" }}
          onClick={clearNodes}
          variant="white"
        >
          Clear
        </Button>
        <Button
          disabled={!canUpdatePolicy}
          icon={{ color: "#808080", use: "Undo" }}
          onClick={revertNodes}
          variant="white"
        >
          Revert
        </Button>
        <Button
          disabled={!canUpdatePolicy}
          icon={
            loadingUpdate
              ? { color: "white", use: "Loading" }
              : { color: "white", use: "Upload" }
          }
          onClick={handleUpdatePolicy}
        >
          Deploy
        </Button>
      </div>
    </header>
  );
};
