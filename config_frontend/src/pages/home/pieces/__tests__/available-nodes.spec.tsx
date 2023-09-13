import { useNodes } from "@/contexts/nodes-context";

import { AvailableNodes } from "@/pages/home/pieces/available-nodes";

import { render } from "@testing-library/react";

jest.mock("@/contexts/nodes-context", () => ({
  useNodes: jest.fn(() => ({
    nodes: [
      {
        type: "END",
      },
      {
        type: "DECISION",
      },
      {
        type: "START",
      },
    ],
  })),
}));

const useNodesMock = useNodes as jest.Mock<
  Partial<ReturnType<typeof useNodes>>
>;

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

jest.mock("@/components/draggable", () => ({
  Draggable: jest.fn(({ children }) => <div>{children}</div>),
}));

const makeSut = () => {
  return render(<AvailableNodes />);
};

describe("AvailableNodes", () => {
  afterEach(() => {
    useNodesMock.mockClear();
  });

  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should render availableNodes when node of type END is not present", () => {
    useNodesMock.mockReturnValueOnce({
      nodes: [
        {
          type: "DECISION",
        },
        {
          type: "START",
        },
      ],
    } as any);

    makeSut();
  });

  it("should not render availableNodes when node of type START is not present", () => {
    useNodesMock.mockReturnValueOnce({
      nodes: [],
    } as any);

    makeSut();
  });
});
