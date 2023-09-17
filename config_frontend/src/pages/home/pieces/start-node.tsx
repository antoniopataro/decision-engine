import React from "react";

import { Block } from "@/components/block";

import { type Node } from "@/contexts/nodes-context";

import { white } from "tailwindcss/colors";

export const StartNode: React.FC<{ node: Node }> = ({ node }) => {
  const { type } = node;

  if (type !== "start") {
    return null;
  }

  return (
    <Block
      icon={{ color: white[500], use: "Start" }}
      className="peer bg-white text-black/75 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <span>Start</span>
        <p className="font-normal text-black/75">
          The policy execution starts here.
        </p>
      </div>
    </Block>
  );
};
