import { createContext, useContext } from "react";

import type { Decision } from "@/contexts/policy-context";

export type Node = {
  id: string;
} & (
  | {
      output: boolean;
      type: "END";
    }
  | {
      type: "START";
    }
  | {
      decision: Decision;
      type: "DECISION";
    }
);

type Props = {
  addNode: (node: Partial<Node>) => void;
  clearNodes: () => void;
  nodes: Node[];
  removeNode: (node: Partial<Node>) => void;
  revertNodes: () => void;
  updateNode: (node: Partial<Node>) => void;
};

export const NodesContext = createContext({} as Props);

export const useNodes = () => useContext(NodesContext);
