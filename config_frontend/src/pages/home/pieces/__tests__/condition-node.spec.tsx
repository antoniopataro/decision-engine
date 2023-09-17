import { Icon } from "@/components/icon";

import { useNodes } from "@/contexts/nodes-context";

import { Criteria } from "@/pages/home/pieces/criteria";
import { ConditionNode } from "@/pages/home/pieces/condition-node";
import { Variable } from "@/pages/home/pieces/variable";
import { Value } from "@/pages/home/pieces/value";

import { fireEvent, render } from "@testing-library/react";

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

const IconMock = Icon as jest.MockedFunction<typeof Icon>;

jest.mock("@/contexts/dnd-context", () => ({
  useDnd: jest.fn(() => ({
    active: {
      draggableId: "",
    },
  })),
}));

jest.mock("@/contexts/nodes-context", () => ({
  useNodes: jest.fn(() => ({
    removeNode: jest.fn(),
    updateNode: jest.fn(),
  })),
}));

const useNodesMock = useNodes as jest.Mock<
  Partial<ReturnType<typeof useNodes>>
>;

jest.mock("@/pages/home/pieces/criteria", () => ({
  Criteria: jest.fn(() => <div />),
}));

const CriteriaMock = Criteria as jest.MockedFunction<typeof Criteria>;

jest.mock("@/pages/home/pieces/nodes", () => ({
  Nodes: jest.fn(() => <div />),
}));

jest.mock("@/pages/home/pieces/value", () => ({
  Value: jest.fn(() => <div />),
}));

const ValueMock = Value as jest.MockedFunction<typeof Value>;

jest.mock("@/pages/home/pieces/variable", () => ({
  Variable: jest.fn(() => <div />),
}));

const VariableMock = Variable as jest.MockedFunction<typeof Variable>;

const defaultProps: React.ComponentProps<typeof ConditionNode> = {
  dragHandleProps: {} as any,
  node: {
    condition: {
      criteria: "<",
      value: 0,
      variable: "",
    },
    otherwise: [],
    parent_ids: [],
    then: [],
    id: "",
    type: "condition",
  },
};

const makeSut = (props = defaultProps) => {
  return render(<ConditionNode {...props} />);
};

describe("ConditionNode", () => {
  afterEach(() => {
    CriteriaMock.mockClear();
    IconMock.mockClear();
    ValueMock.mockClear();
    VariableMock.mockClear();
    useNodesMock.mockClear();
  });

  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should not render when type from node is not condition", () => {
    const { container } = makeSut({
      ...defaultProps,
      node: {
        type: "",
      },
    } as any);

    expect(container.firstChild).toBe(null);
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
        condition: expect.objectContaining({
          variable: variableMock,
        }),
      }),
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
        condition: expect.objectContaining({
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
        condition: expect.objectContaining({
          value: valueMock,
        }),
      }),
    );
  });

  it("should call removeNode when remove button is clicked", () => {
    const removeNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      removeNode: removeNodeMock,
    });

    const { getByTestId } = makeSut();

    fireEvent.click(getByTestId("remove-node"));

    expect(removeNodeMock).toHaveBeenCalled();
  });

  it("should call updateNode when otherwise remove button is clicked", () => {
    const updateNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      updateNode: updateNodeMock,
    });

    const { getByTestId } = makeSut();

    fireEvent.click(getByTestId("remove-node-otherwise"));

    expect(updateNodeMock).toHaveBeenCalled();
  });

  it("should call updateNode when otherwise button is clicked", () => {
    const updateNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      updateNode: updateNodeMock,
    });

    const { getByTestId } = makeSut({
      ...defaultProps,
      node: {
        ...defaultProps.node,
        otherwise: undefined,
      },
    } as any);

    fireEvent.click(getByTestId("otherwise"));

    expect(updateNodeMock).toHaveBeenCalled();
  });
});
