import React from "react";

import { Block } from "@/components/block";
import { Icon } from "@/components/icon";
import { Node } from "@/components/node";

import { useNodes } from "@/contexts/nodes-context";
import { usePolicy } from "@/contexts/policy-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";
import { Policy } from "@/pages/home/pieces/policy";

import { render } from "@testing-library/react";

jest.mock("@/components/block", () => ({
  Block: jest.fn(({ children }) => <div>{children}</div>),
}));

const BlockMock = Block as jest.MockedFunction<typeof Block>;

jest.mock("@/components/droppable", () => ({
  Droppable: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

const IconMock = Icon as jest.MockedFunction<typeof Icon>;

jest.mock("@/components/node", () => ({
  Node: jest.fn(({ children }) => <div>{children}</div>),
}));

const NodeMock = Node as jest.MockedFunction<typeof Node>;

jest.mock("@/lib/cn", () => ({
  cn: jest.fn(),
}));

jest.mock("@/contexts/nodes-context", () => ({
  useNodes: jest.fn(() => ({
    nodes: [],
    removeNode: jest.fn(),
    updateNode: jest.fn(),
  })),
}));

const useNodesMock = useNodes as jest.Mock<
  Partial<ReturnType<typeof useNodes>>
>;

jest.mock("@/contexts/policy-context", () => ({
  usePolicy: jest.fn(() => ({
    loading: false,
    policy: {},
  })),
}));

const usePolicyMock = usePolicy as jest.Mock<
  Partial<ReturnType<typeof usePolicy>>
>;

jest.mock("@/pages/home/logics/use-nodes-logic", () => ({
  useNodesLogic: jest.fn(() => ({
    decisionNodes: [
      {
        id: "",
        type: "DECISION",
      },
    ],
    endNode: { output: true, type: "END" },
    startNode: { type: "START" },
  })),
}));

const useNodesLogicMock = useNodesLogic as jest.Mock<
  Partial<ReturnType<typeof useNodesLogic>>
>;

jest.mock("@/pages/home/pieces/decision-node", () => ({
  DecisionNode: jest.fn(() => <div />),
}));

const makeSut = () => {
  return render(<Policy />);
};

describe("Policy", () => {
  afterEach(() => {
    BlockMock.mockClear();
    IconMock.mockClear();
    NodeMock.mockClear();
    useNodesLogicMock.mockClear();
    useNodesMock.mockClear();
    usePolicyMock.mockClear();
  });

  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should render when loading is true", () => {
    usePolicyMock.mockReturnValueOnce({
      loading: true,
    });

    makeSut();

    expect(IconMock).toHaveBeenCalledWith(
      expect.objectContaining({
        use: "Loading",
      }),
      {},
    );
  });

  it("should render when policy is null", () => {
    usePolicyMock.mockReturnValueOnce({
      policy: null,
    });

    makeSut();
  });

  it("should call onRemove from NodeMock when startNode is the only defined node", () => {
    const removeNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      nodes: [{}],
      removeNode: removeNodeMock,
    } as any);

    NodeMock.mockImplementationOnce(({ children, onRemove }) => {
      onRemove?.();

      return <div>{children}</div>;
    });

    makeSut();

    expect(removeNodeMock).toHaveBeenCalled();
  });

  it("should call onRemove from NodeMock", () => {
    NodeMock.mockImplementation(({ children, onRemove }) => {
      onRemove?.();

      return <div>{children}</div>;
    });

    makeSut();
  });

  it("should call updateNode when onClick from end node BlockMock", () => {
    const outputMock = true;

    useNodesLogicMock.mockReturnValueOnce({
      decisionNodes: [],
      endNode: {
        output: outputMock,
        type: "END",
      },
    } as any);

    const updateNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      nodes: [],
      removeNode: jest.fn(),
      updateNode: updateNodeMock,
    });

    BlockMock.mockImplementation(({ icon, onClick }) => {
      if (icon && icon.use === "End") {
        onClick?.({} as React.MouseEvent<HTMLDivElement>);
      }

      return <div />;
    });

    makeSut();

    expect(updateNodeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        output: !outputMock,
      }),
    );
  });

  it("should render end node BlockMock with correct props", () => {
    useNodesLogicMock.mockReturnValueOnce({
      decisionNodes: [],
      endNode: {
        output: false,
        type: "END",
      },
    } as any);

    makeSut();

    expect(BlockMock).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: expect.objectContaining({ color: "#ef4444" }),
      }),
      {},
    );
  });
});
