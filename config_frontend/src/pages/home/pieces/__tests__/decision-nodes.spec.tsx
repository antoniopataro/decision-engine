import { Icon } from "@/components/icon";

import { useNodes } from "@/contexts/nodes-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";
import { Criteria } from "@/pages/home/pieces/criteria";
import { DecisionNode } from "@/pages/home/pieces/decision-node";
import { Variable } from "@/pages/home/pieces/variable";
import { Value } from "@/pages/home/pieces/value";

import { render } from "@testing-library/react";

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

const IconMock = Icon as jest.MockedFunction<typeof Icon>;

jest.mock("@/contexts/nodes-context", () => ({
  useNodes: jest.fn(() => ({
    updateNode: jest.fn(),
  })),
}));

const useNodesMock = useNodes as jest.Mock<
  Partial<ReturnType<typeof useNodes>>
>;

jest.mock("@/pages/home/logics/use-nodes-logic", () => ({
  useNodesLogic: jest.fn(() => ({
    endNode: {
      output: true,
      type: "END",
    },
  })),
}));

const useNodesLogicMock = useNodesLogic as jest.Mock<
  Partial<ReturnType<typeof useNodesLogic>>
>;

jest.mock("@/pages/home/pieces/criteria", () => ({
  Criteria: jest.fn(() => <div />),
}));

const CriteriaMock = Criteria as jest.MockedFunction<typeof Criteria>;

jest.mock("@/pages/home/pieces/value", () => ({
  Value: jest.fn(() => <div />),
}));

const ValueMock = Value as jest.MockedFunction<typeof Value>;

jest.mock("@/pages/home/pieces/variable", () => ({
  Variable: jest.fn(() => <div />),
}));

const VariableMock = Variable as jest.MockedFunction<typeof Variable>;

const defaultProps: React.ComponentProps<typeof DecisionNode> = {
  node: {
    decision: {
      criteria: "<",
      value: 0,
      variable: "",
    },
    id: "",
    type: "DECISION",
  },
};

const makeSut = (props = defaultProps) => {
  return render(<DecisionNode {...props} />);
};

describe("DecisionNode", () => {
  afterEach(() => {
    CriteriaMock.mockClear();
    IconMock.mockClear();
    ValueMock.mockClear();
    VariableMock.mockClear();
    useNodesLogicMock.mockClear();
    useNodesMock.mockClear();
  });

  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should not render when node type is not DECISION", () => {
    const { container } = makeSut({
      node: {
        type: "",
      },
    } as any);

    expect(container.firstChild).toBeNull();
  });

  it("should render Icon with correct props when endNode is not defined", () => {
    useNodesLogicMock.mockReturnValueOnce({});

    makeSut();

    expect(IconMock).toHaveBeenCalledWith(
      expect.objectContaining({
        color: "red",
      }),
      {},
    );
  });

  it("should render Icon with correct props when endNode defined with false output", () => {
    useNodesLogicMock.mockReturnValueOnce({
      endNode: {
        output: false,
        type: "END",
      },
    } as any);

    makeSut();

    expect(IconMock).toHaveBeenCalledWith(
      expect.objectContaining({
        color: "green",
      }),
      {},
    );
  });

  it("should call updateNode when onChange from CriteriaMock is called", () => {
    const updateNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      updateNode: updateNodeMock,
    });

    const criteriaMock = "<";

    CriteriaMock.mockImplementationOnce(({ onChange }) => {
      onChange(criteriaMock);

      return <div />;
    });

    makeSut();

    expect(updateNodeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        decision: expect.objectContaining({
          criteria: criteriaMock,
        }),
      }),
    );
  });

  it("should call updateNode when onChange from ValueMock is called", () => {
    const updateNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      updateNode: updateNodeMock,
    });

    const valueMock = 0;

    ValueMock.mockImplementationOnce(({ onChange }) => {
      onChange(valueMock);

      return <div />;
    });

    makeSut();

    expect(updateNodeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        decision: expect.objectContaining({
          value: valueMock,
        }),
      }),
    );
  });

  it("should call updateNode when onChange from VariableMock is called", () => {
    const updateNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      updateNode: updateNodeMock,
    });

    const variableMock = "variableMock";

    VariableMock.mockImplementationOnce(({ onChange }) => {
      onChange(variableMock);

      return <div />;
    });

    makeSut();

    expect(updateNodeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        decision: expect.objectContaining({
          variable: variableMock,
        }),
      }),
    );
  });
});
