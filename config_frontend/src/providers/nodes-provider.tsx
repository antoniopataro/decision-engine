import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Node, NodesContext } from "@/contexts/nodes-context";
import { usePolicy } from "@/contexts/policy-context";

import { v4 as uuidv4 } from "uuid";

type NodesContextProps = React.ComponentProps<
  typeof NodesContext.Provider
>["value"];

export const NodesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { policy } = usePolicy();

  const [nodes, setNodes] = useState<Node[]>([]);

  const populateNodes = useCallback(() => {
    if (!policy) {
      return;
    }

    setNodes(() => [
      {
        id: "START",
        type: "START",
      },
      ...policy.decisions.map(
        (decision) =>
          ({
            id: decision.id!,
            decision,
            type: "DECISION",
          }) satisfies Node,
      ),
      {
        id: "END",
        output: policy.output,
        type: "END",
      },
    ]);
  }, [policy]);

  useEffect(() => {
    populateNodes();
  }, [policy]);

  const addNode: NodesContextProps["addNode"] = useCallback((props) => {
    const { type } = props;

    if (!type) {
      return;
    }

    if (type === "DECISION") {
      setNodes((prev) => {
        const node = {
          decision: props.decision ?? {
            criteria: "==",
            value: 0,
            variable: "",
          },
          id: uuidv4(),
          type: "DECISION",
        } as Node;

        return [...prev, node];
      });

      return;
    }

    if (type === "END") {
      setNodes((prev) => {
        const node = {
          id: "END",
          output: true,
          type: "END",
        } as Node;

        return [...prev, node];
      });

      return;
    }

    if (type === "START") {
      setNodes(() => {
        const node = {
          id: "START",
          type: "START",
        } as Node;

        return [node];
      });

      return;
    }
  }, []);

  const clearNodes: NodesContextProps["clearNodes"] = useCallback(() => {
    setNodes(() => []);
  }, []);

  const removeNode: NodesContextProps["removeNode"] = useCallback((props) => {
    const { id } = props;

    if (!id) {
      return;
    }

    setNodes((prev) => prev.filter((node) => node.id !== id));
  }, []);

  const revertNodes: NodesContextProps["revertNodes"] = useCallback(() => {
    populateNodes();
  }, [populateNodes]);

  const updateNode: NodesContextProps["updateNode"] = useCallback((props) => {
    const { type } = props;

    if (!type || type === "START") {
      return;
    }

    if (type === "DECISION") {
      setNodes((prev) =>
        prev.map((node) =>
          node.type === "DECISION" && node.id === props.id
            ? {
                ...node,
                ...props,
              }
            : node,
        ),
      );
    }

    if (type === "END") {
      setNodes((prev) =>
        prev.map((node) =>
          node.type === "END" && node.id === props.id
            ? {
                ...node,
                ...props,
              }
            : node,
        ),
      );
    }
  }, []);

  return (
    <NodesContext.Provider
      value={{
        addNode,
        clearNodes,
        nodes,
        removeNode,
        revertNodes,
        updateNode,
      }}
    >
      {children}
    </NodesContext.Provider>
  );
};
