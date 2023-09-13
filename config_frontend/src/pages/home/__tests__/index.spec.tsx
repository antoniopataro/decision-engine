import { useNodes } from "@/contexts/nodes-context";

import { Home } from "@/pages/home";

import { DndContext } from "@dnd-kit/core";

import { render } from "@testing-library/react";

jest.mock("@/contexts/nodes-context", () => ({
  useNodes: jest.fn(() => ({
    addNode: jest.fn(),
    nodes: [],
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

jest.mock("@dnd-kit/core", () => ({
  ...jest.requireActual("@dnd-kit/core"),
  DndContext: jest.fn(({ children }) => <div>{children}</div>),
}));

const DndContextMock = DndContext as jest.MockedFunction<typeof DndContext>;

const makeSut = () => {
  return render(<Home />);
};

describe("Home", () => {
  afterEach(() => {
    DndContextMock.mockClear();
    useNodesMock.mockClear();
  });

  it("should render", () => {
    DndContextMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.({
        collisions: [],
        delta: {
          x: 0,
          y: 1,
        },
      } as any);

      return <div>{children}</div>;
    });

    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should call addNode with DECISION type when handleDragEnd is called", () => {
    const addNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      addNode: addNodeMock,
      nodes: [],
    });

    DndContextMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.({
        active: {
          id: "DECISION",
        },
        collisions: [],
        delta: {
          x: 0,
          y: 0,
        },
      } as any);

      return <div>{children}</div>;
    });

    makeSut();

    expect(addNodeMock).toHaveBeenCalledWith({ type: "DECISION" });
  });

  it("should call addNode with END type when handleDragEnd is called", () => {
    const addNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      addNode: addNodeMock,
      nodes: [],
    });

    DndContextMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.({
        active: {
          id: "END",
        },
        collisions: [],
        delta: {
          x: 0,
          y: 0,
        },
      } as any);

      return <div>{children}</div>;
    });

    makeSut();

    expect(addNodeMock).toHaveBeenCalledWith({ type: "END" });
  });

  it("should call addNode with START type when handleDragEnd is called", () => {
    const addNodeMock = jest.fn();

    useNodesMock.mockReturnValueOnce({
      addNode: addNodeMock,
      nodes: [],
    });

    DndContextMock.mockImplementationOnce(({ children, onDragEnd }) => {
      onDragEnd?.({
        active: {
          id: "START",
        },
        collisions: [],
        delta: {
          x: 0,
          y: 0,
        },
      } as any);

      return <div>{children}</div>;
    });

    makeSut();

    expect(addNodeMock).toHaveBeenCalledWith({ type: "START" });
  });
});
