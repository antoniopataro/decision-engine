import { AvailableNodes } from "@/pages/home/pieces/available-nodes";

import { render } from "@testing-library/react";
import { useNodesLogic } from "../../logics/use-nodes-logic";

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

jest.mock("@/pages/home/logics/use-nodes-logic", () => ({
  useNodesLogic: jest.fn(() => ({
    lastNode: undefined,
    startNode: undefined,
  })),
}));

const useNodesLogicMock = useNodesLogic as jest.Mock<
  Partial<ReturnType<typeof useNodesLogic>>
>;

jest.mock("react-beautiful-dnd", () => ({
  ...jest.requireActual("react-beautiful-dnd"),
  Droppable: jest.fn(({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {},
    ),
  ),
  Draggable: jest.fn(({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {},
    ),
  ),
}));

const makeSut = () => {
  return render(<AvailableNodes />);
};

describe("AvailableNodes", () => {
  afterEach(() => {
    useNodesLogicMock.mockClear();
  });

  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should render with defined lastNode", () => {
    useNodesLogicMock.mockReturnValueOnce({
      lastNode: {
        type: "output",
      },
      startNode: undefined,
    } as any);

    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should render with defined startNode", () => {
    useNodesLogicMock.mockReturnValueOnce({
      lastNode: undefined,
      startNode: {
        type: "start",
      },
    } as any);

    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });
});
