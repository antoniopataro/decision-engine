import { Icon } from "@/components/icon";

import { useNodes } from "@/contexts/nodes-context";
import { usePolicy } from "@/contexts/policy-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";
import { Policy } from "@/pages/home/pieces/policy";

import { render } from "@testing-library/react";

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

const IconMock = Icon as jest.MockedFunction<typeof Icon>;

jest.mock("@/contexts/nodes-context", () => ({
  useNodes: jest.fn(() => ({
    nodes: [],
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
    startNode: { type: "start" },
  })),
}));

const useNodesLogicMock = useNodesLogic as jest.Mock<
  Partial<ReturnType<typeof useNodesLogic>>
>;

jest.mock("@/pages/home/pieces/node", () => ({
  Node: jest.fn(() => <div />),
}));

jest.mock("@/pages/home/pieces/nodes", () => ({
  Nodes: jest.fn(() => <div />),
}));

const makeSut = () => {
  return render(<Policy />);
};

describe("Policy", () => {
  afterEach(() => {
    IconMock.mockClear();
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
});
