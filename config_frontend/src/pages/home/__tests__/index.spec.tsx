import { useNodes } from "@/contexts/nodes-context";

import { Home } from "@/pages/home";
import { DndProvider } from "@/providers/dnd-provider";

import { render } from "@testing-library/react";

jest.mock("@/contexts/nodes-context", () => ({
  useNodes: jest.fn(() => ({
    addNode: jest.fn(),
    nodes: [],
    replaceNode: jest.fn(),
    setNodes: jest.fn(),
  })),
}));

const useNodesMock = useNodes as jest.Mock<
  Partial<ReturnType<typeof useNodes>>
>;

jest.mock("@/pages/home/pieces/available-nodes", () => ({
  AvailableNodes: jest.fn(() => <div />),
}));

jest.mock("@/pages/home/pieces/header", () => ({
  Header: jest.fn(() => <div />),
}));

jest.mock("@/pages/home/pieces/policy", () => ({
  Policy: jest.fn(() => <div />),
}));

jest.mock("@/providers/dnd-provider", () => ({
  DndProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

const DndProviderMock = DndProvider as jest.MockedFunction<typeof DndProvider>;

const makeSut = () => {
  return render(<Home />);
};

describe("Home", () => {
  afterEach(() => {
    DndProviderMock.mockClear();
    useNodesMock.mockClear();
  });

  it("should render", () => {
    DndProviderMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.({} as any, undefined as any);

      return <div>{children}</div>;
    });

    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should call addNode when handleDragEnd is called and draggableId is condition", () => {
    const addNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      addNode: addNodeMock,
    });

    DndProviderMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.(
        {
          destination: {
            droppableId: "-then",
          },
          draggableId: "condition",
          source: {
            droppableId: "",
          },
        } as any,
        undefined as any,
      );

      return <div>{children}</div>;
    });

    makeSut();

    expect(addNodeMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: "condition" }),
    );
  });

  it("should call addNode when handleDragEnd is called and draggableId is condition with different props", () => {
    const addNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      addNode: addNodeMock,
    });

    DndProviderMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.(
        {
          destination: {
            droppableId: "policy",
          },
          draggableId: "condition",
          source: {
            droppableId: "",
          },
        } as any,
        undefined as any,
      );

      return <div>{children}</div>;
    });

    makeSut();

    expect(addNodeMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: "condition" }),
    );
  });

  it("should call replaceNode when handleDragEnd is called and droppableId from destination is different from droppableId from source", () => {
    const replaceNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      replaceNode: replaceNodeMock,
    });

    DndProviderMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.(
        {
          destination: {
            droppableId: "-then",
          },
          draggableId: "",
          source: {
            droppableId: "-",
          },
        } as any,
        undefined as any,
      );

      return <div>{children}</div>;
    });

    makeSut();

    expect(replaceNodeMock).toHaveBeenCalledWith(
      expect.objectContaining({ context: "then" }),
    );
  });

  it("should call setNodes when handleDragEnd is called and droppableId from destination is equal to droppableId from source", () => {
    const setNodesMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      nodes: [],
      setNodes: setNodesMock,
    });

    DndProviderMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.(
        {
          destination: {
            droppableId: "",
          },
          draggableId: "",
          source: {
            droppableId: "",
          },
        } as any,
        undefined as any,
      );

      return <div>{children}</div>;
    });

    makeSut();

    expect(setNodesMock).toHaveBeenCalled();
  });
});
