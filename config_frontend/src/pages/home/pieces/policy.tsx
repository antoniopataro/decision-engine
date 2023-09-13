import React from "react";

import { Block } from "@/components/block";
import { Droppable } from "@/components/droppable";
import { Icon } from "@/components/icon";
import { Node } from "@/components/node";

import { useNodes } from "@/contexts/nodes-context";
import { usePolicy } from "@/contexts/policy-context";

import { cn } from "@/lib/cn";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";
import { DecisionNode } from "@/pages/home/pieces/decision-node";

import { green, red, white } from "tailwindcss/colors";

export const Policy: React.FC = () => {
  const { nodes, removeNode, updateNode } = useNodes();
  const { loading, policy } = usePolicy();

  const { decisionNodes, endNode, startNode } = useNodesLogic();

  if (loading) {
    return (
      <div className="grid h-full w-full place-items-center bg-gray-100 p-16 before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5">
        <span className="animate-spin">
          <Icon use="Loading" />
        </span>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="grid h-full w-full place-items-center bg-gray-100 p-16 before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5">
        <span className="text-sm text-black/50">Could not find policy.</span>
      </div>
    );
  }

  return (
    <Droppable id="POLICY">
      <div
        className={
          "relative flex h-full w-full flex-col items-center gap-8 overflow-auto bg-gray-100 p-16 pb-48 before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5"
        }
      >
        {startNode && (
          <Node
            onRemove={
              nodes.length === 1 ? () => removeNode(startNode) : undefined
            }
          >
            <Block
              icon={{ color: white[500], use: "Start" }}
              className="bg-white text-black/75 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span>Start</span>
                <p className="font-normal text-black/75">
                  The policy execution starts here.
                </p>
              </div>
            </Block>
          </Node>
        )}
        {decisionNodes.map(
          (decisionNode, index) =>
            decisionNode.type === "DECISION" && (
              <Node
                key={decisionNode.id}
                onRemove={() => removeNode(decisionNode)}
                style={{
                  zIndex: decisionNodes.length - index,
                }}
              >
                <DecisionNode node={decisionNode} />
              </Node>
            ),
        )}
        {endNode && endNode.type === "END" && (
          <Node onRemove={() => removeNode(endNode)}>
            <Block
              icon={{
                color: endNode.output === true ? green[500] : red[500],
                use: "End",
              }}
              onClick={() =>
                updateNode({ ...endNode, output: !endNode.output })
              }
              className={cn("cursor-pointer backdrop-blur-sm", {
                "bg-green-500/25 text-green-500": endNode.output,
                "bg-red-500/25 text-red-500": !endNode.output,
              })}
            >
              <div className="flex items-center gap-3">
                <span>End</span>
                <p
                  className={cn("font-normal", {
                    "text-green-500/75": endNode.output,
                    "text-red-500/75": !endNode.output,
                  })}
                >
                  The policy decides {endNode.output.toString()} here.
                </p>
              </div>
            </Block>
          </Node>
        )}
      </div>
    </Droppable>
  );
};
