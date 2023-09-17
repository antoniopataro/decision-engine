import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type Condition = {
  criteria: "<" | "<=" | "==" | ">=" | ">";
  value: number;
  variable: string;
};

export type Node = {
  id?: string;
} & (
  | {
      condition: Condition;
      otherwise?: Node[];
      parent_ids?: string[];
      then?: Node[];
      type: "condition";
    }
  | {
      output: boolean;
      parent_ids?: string[];
      type: "output";
    }
  | {
      type: "start";
    }
);

type Props = {
  addNode: (props: {
    context?: "otherwise" | "then";
    index?: number;
    target_id?: string;
    type: Node["type"];
  }) => Node | void;
  clearNodes: () => void;
  nodes: Node[];
  removeNode: (props: Partial<Node>) => void;
  replaceNode: (props: {
    context: "otherwise" | "then";
    index?: number;
    source_id: string;
    target_id: string;
  }) => void;
  revertNodes: () => void;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  unindentifiedNodes: Omit<Node, "id">[];
  updateNode: (props: Partial<Node>) => void;
};

export const NodesContext = createContext({} as Props);

export const useNodes = () => useContext(NodesContext);
