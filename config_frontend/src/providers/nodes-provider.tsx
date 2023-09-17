import React, {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { type Node, NodesContext } from "@/contexts/nodes-context";
import { usePolicy } from "@/contexts/policy-context";

import _ from "lodash";

import { v4 as uuidv4 } from "uuid";

type NodesContextProps = React.ComponentProps<
  typeof NodesContext.Provider
>["value"];

const findNodeById = (nodes: Node[], id: string): Node | undefined => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }

    if (node.type === "condition") {
      if (node.then) {
        const result = findNodeById(node.then, id);

        if (result) {
          return result;
        }
      }

      if (node.otherwise) {
        const result = findNodeById(node.otherwise, id);
        if (result) {
          return result;
        }
      }
    }
  }

  return undefined;
};

const identifyNodes = (nodes: Node[], parent_ids?: string[]): Node[] => {
  return nodes.map((node) => {
    if (node.type === "condition") {
      if (!node.then) {
        throw new Error(
          "mapped through a condition node with undefined 'then'",
        );
      }

      const id = uuidv4();

      return {
        ...node,
        id,
        ...(node.otherwise && {
          otherwise: identifyNodes(node.otherwise, [
            ...(node.parent_ids ?? []),
            id,
          ]),
        }),
        ...(parent_ids && { parent_ids }),
        then: identifyNodes(node.then, [...(node.parent_ids ?? []), id]),
        type: "condition",
      };
    }

    if (node.type === "output") {
      return {
        ...node,
        id: uuidv4(),
        ...(parent_ids && { parent_ids }),
      };
    }

    return node;
  });
};

const removeNodeById = (nodes: Node[], id: string): Node[] => {
  return nodes.reduce((prev, curr) => {
    if (curr.id === id) {
      return prev;
    }

    if (curr.type === "condition") {
      const otherwise = curr.otherwise
        ? removeNodeById(curr.otherwise, id)
        : undefined;
      const then = curr.then ? removeNodeById(curr.then, id) : undefined;

      prev.push({ ...curr, then, otherwise });
      return prev;
    }

    prev.push(curr);
    return prev;
  }, [] as Node[]);
};

const unindentifyNodes = (nodes: Node[]): Omit<Node, "id">[] => {
  return nodes.map((node) => {
    if (node.type === "condition") {
      return {
        condition: node.condition,
        ...(node.otherwise && {
          otherwise: unindentifyNodes(node.otherwise),
        }),
        ...(node.then && {
          then: unindentifyNodes(node.then),
        }),
        type: "condition",
      };
    }

    if (node.type === "output") {
      return {
        output: node.output,
        type: "output",
      };
    }

    return node;
  });
};

const updateNodeById = (
  nodes: Node[],
  id: string,
  update: Partial<Node>,
): Node[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, ...update } as Node;
    }

    if (node.type === "condition") {
      const otherwise = node.otherwise
        ? updateNodeById(node.otherwise, id, update)
        : undefined;
      const then = node.then
        ? updateNodeById(node.then, id, update)
        : undefined;

      return {
        ...node,
        ...(otherwise && { otherwise }),
        ...(then && { then }),
      };
    }

    return node;
  });
};

export const NodesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { policy } = usePolicy();

  const [nodes, setNodes] = useState<Node[]>([]);

  const populateNodes = useCallback(() => {
    if (!policy) {
      return;
    }

    setNodes(() => [
      {
        id: uuidv4(),
        type: "start",
      },
      ...identifyNodes(policy.nodes),
    ]);
  }, [policy]);

  useEffect(() => {
    populateNodes();
  }, [policy]);

  const addNode: NodesContextProps["addNode"] = useCallback((props) => {
    const { type } = props;

    if (!type) {
      throw new Error("cannot add node with undefined 'type'");
    }

    const nodes = {
      condition: {
        condition: {
          criteria: "<",
          value: 0,
          variable: "",
        },
        then: [],
        id: uuidv4(),
        type: "condition",
      },
      output: {
        output: false,
        id: uuidv4(),
        type: "output",
      },
      start: {
        id: uuidv4(),
        type: "start",
      },
    };

    if (!(type in nodes)) {
      throw new Error("cannot add node with unrecognized 'type'");
    }

    const node = nodes[type as keyof typeof nodes] as Node;

    const { context, index, target_id } = props;

    if (!target_id || target_id === "policy") {
      if (!index && index !== 0) {
        setNodes((prev) => [...prev, node] as Node[]);

        return;
      }

      setNodes(
        (prev) =>
          [...prev.slice(0, index), node, ...prev.slice(index)] as Node[],
      );

      return;
    }

    setNodes((prev) => {
      if (!context) {
        throw new Error(
          "cannot update otherwise or then condition node with undefined 'context'",
        );
      }

      if (!target_id) {
        throw new Error(
          "cannot add node with defined target but undefined corresponding id",
        );
      }

      let id = target_id;

      if (context) {
        id = target_id.split("-").slice(0, -1).join("-");
      }

      const target = findNodeById(prev, id);

      if (!target || !target.id) {
        throw new Error("could not find target node or its corresponding id");
      }

      if (target.type !== "condition") {
        throw new Error(
          "cannot update targetNode with a type different than 'condition'",
        );
      }

      if (!index && index !== 0) {
        return updateNodeById(prev, target.id, {
          ...target,
          [context as "otherwise" | "then"]: [
            ...target[context as "otherwise" | "then"]!,
            node,
          ],
        });
      }

      return updateNodeById(prev, target.id, {
        ...target,
        [context as "otherwise" | "then"]: [
          ...target[context as "otherwise" | "then"]!.slice(0, index),
          node,
          ...target[context as "otherwise" | "then"]!.slice(index),
        ],
      });
    });
  }, []);

  const clearNodes: NodesContextProps["clearNodes"] = useCallback(() => {
    setNodes(() => []);
  }, []);

  const removeNode: NodesContextProps["removeNode"] = useCallback((props) => {
    const { id } = props;

    if (!id) {
      return;
    }

    setNodes((prev) => removeNodeById(prev, id));
  }, []);

  const replaceNode: NodesContextProps["replaceNode"] = useCallback((props) => {
    const { context, index, source_id, target_id } = props;

    setNodes((prev) => {
      const source = findNodeById(prev, source_id);

      if (!source || !source.id) {
        throw new Error("could not find source node or its corresponding id");
      }

      if (target_id === "policy") {
        const nodes = removeNodeById(prev, source.id!);

        return [
          ...nodes.slice(0, (index ?? 0) + 1),
          { ...source },
          ...nodes.slice((index ?? 0) + 1),
        ];
      }

      let id = target_id;

      if (context) {
        id = target_id.split("-").slice(0, -1).join("-");
      }

      const target = findNodeById(prev, id);

      if (!target || !target.id) {
        throw new Error("could not find target node or its corresponding id");
      }

      const nodes = removeNodeById(prev, source.id!);

      if (target.type !== "condition") {
        throw new Error(
          "cannot replace source in a target type different than 'condition'",
        );
      }

      if (!index && index !== 0) {
        return updateNodeById(nodes, target.id, {
          ...target,
          [context as "otherwise" | "then"]: [
            ...target[context as "otherwise" | "then"]!,
            {
              ...source,
              ...(source.type !== "start" && {
                parent_ids: [...(target.parent_ids ?? []), target.id],
              }),
            },
          ],
        });
      }

      return updateNodeById(nodes, target.id, {
        ...target,
        [context as "otherwise" | "then"]: [
          ...target[context as "otherwise" | "then"]!.slice(0, index),
          {
            ...source,
            ...(source.type !== "start" && {
              parent_ids: [...(target.parent_ids ?? []), target.id],
            }),
          },
          ...target[context as "otherwise" | "then"]!.slice(index),
        ],
      });
    });
  }, []);

  const revertNodes: NodesContextProps["revertNodes"] = useCallback(() => {
    populateNodes();
  }, [populateNodes]);

  const unindentifiedNodes = useMemo(() => unindentifyNodes(nodes), [nodes]);

  const updateNode: NodesContextProps["updateNode"] = useCallback((props) => {
    const { type } = props;

    if (!type) {
      throw new Error("missing 'type'");
    }

    if (type === "start") {
      throw new Error("cannot update the 'start' node");
    }

    const { id } = props;

    if (!id) {
      throw new Error("missing 'id'");
    }

    setNodes((prev) => updateNodeById(prev, id, props));
    return;
  }, []);

  return (
    <NodesContext.Provider
      value={{
        addNode,
        clearNodes,
        nodes,
        removeNode,
        replaceNode,
        revertNodes,
        setNodes,
        unindentifiedNodes,
        updateNode,
      }}
    >
      {children}
    </NodesContext.Provider>
  );
};
