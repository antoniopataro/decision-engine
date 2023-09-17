import React from "react";

import { Icon } from "@/components/icon";

import { useNodes } from "@/contexts/nodes-context";
import { usePolicy } from "@/contexts/policy-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";
import { Node } from "@/pages/home/pieces/node";
import { Nodes } from "@/pages/home/pieces/nodes";
import { useDnd } from "@/contexts/dnd-context";

export const Policy: React.FC = () => {
  const { setOverId } = useDnd();
  const { nodes } = useNodes();
  const { loading, policy } = usePolicy();

  const { startNode } = useNodesLogic();

  if (loading) {
    return (
      <div className="grid h-full w-full place-items-center bg-gray-100 p-16 pb-48 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5">
        <span className="animate-spin">
          <Icon use="Loading" />
        </span>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="grid h-full w-full place-items-center bg-gray-100 p-16 pb-48 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5">
        <span className="text-sm text-black/50">Could not find policy.</span>
      </div>
    );
  }

  return (
    <div
      onMouseOver={(e) => {
        e.stopPropagation();
        setOverId("policy");
      }}
      onMouseLeave={() => setOverId(null)}
      className="flex h-[calc(100vh-120px)] w-full flex-col overflow-auto bg-gray-100 px-4 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5"
    >
      {startNode && <Node node={startNode} />}
      <div className="h-full">
        <Nodes id="policy" nodes={nodes} />
      </div>
    </div>
  );
};
