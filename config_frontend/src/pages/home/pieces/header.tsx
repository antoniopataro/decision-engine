import React, { useCallback, useMemo } from "react";

import { Button } from "@/components/button";

import { DEFAULT_POLICY_ID } from "@/config/envs";

import { useNodes } from "@/contexts/nodes-context";
import { Decision, usePolicy } from "@/contexts/policy-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";

export const Header: React.FC = () => {
  const { clearNodes, revertNodes } = useNodes();
  const { loadingUpdate, policy, updatePolicy } = usePolicy();

  const { decisionNodes, endNode, startNode } = useNodesLogic();

  const areDecisionsDifferent = useMemo(
    () =>
      !policy
        ? false
        : JSON.stringify(
            decisionNodes
              .map((decisionNode) =>
                decisionNode.type === "DECISION"
                  ? decisionNode.decision
                  : undefined,
              )
              .filter((decision) => decision !== undefined) as Decision[],
          ) !== JSON.stringify(policy.decisions),
    [decisionNodes, policy],
  );

  const canUpdatePolicy = useMemo(() => {
    if (!endNode || !policy) {
      return false;
    }

    if (endNode.type === "END" && endNode.output !== policy.output) {
      return true;
    }

    return (
      areDecisionsDifferent &&
      decisionNodes.every((decisionNode) => {
        if (decisionNode.type !== "DECISION") {
          return false;
        }

        const { variable, value } = decisionNode.decision;

        return !!variable && (!!value || value === 0);
      })
    );
  }, [decisionNodes, endNode, policy]);

  const handleUpdatePolicy = useCallback(async () => {
    await updatePolicy({
      decisions: decisionNodes
        .map((decisionNode) =>
          decisionNode.type === "DECISION" ? decisionNode.decision : undefined,
        )
        .filter((decision) => decision !== undefined) as Decision[],
      id: DEFAULT_POLICY_ID,
      output: endNode && endNode.type === "END" ? endNode.output : true,
    });
  }, [decisionNodes, DEFAULT_POLICY_ID]);

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
          disabled={!areDecisionsDifferent}
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
