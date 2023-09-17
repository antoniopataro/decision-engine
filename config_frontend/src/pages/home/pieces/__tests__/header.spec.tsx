import { Button } from "@/components/button";

import { usePolicy } from "@/contexts/policy-context";

import { useNodesLogic } from "@/pages/home/logics/use-nodes-logic";
import { Header } from "@/pages/home/pieces/header";

import { render } from "@testing-library/react";

jest.mock("@/components/button", () => ({
  Button: jest.fn(({ children }) => <div>{children}</div>),
}));

const ButtonMock = Button as jest.MockedFunction<typeof Button>;

jest.mock("@/config/envs", () => ({
  DEFAULT_POLICY_ID: "default",
}));

jest.mock("@/contexts/nodes-context", () => ({
  useNodes: jest.fn(() => ({
    clearNodes: jest.fn(),
    revertNodes: jest.fn(),
    unindentifiedNodes: [
      {
        type: "start",
      },
    ],
  })),
}));

jest.mock("@/contexts/policy-context", () => ({
  usePolicy: jest.fn(() => ({
    loadingUpdate: false,
    policy: {
      nodes: [],
      output: true,
    },
    updatePolicy: jest.fn(),
  })),
}));

const usePolicyMock = usePolicy as jest.Mock<
  Partial<ReturnType<typeof usePolicy>>
>;

jest.mock("@/pages/home/logics/use-nodes-logic", () => ({
  useNodesLogic: jest.fn(() => ({
    startNode: {
      type: "start",
    },
  })),
}));

const useNodesLogicMock = useNodesLogic as jest.Mock<
  Partial<ReturnType<typeof useNodesLogic>>
>;

const makeSut = () => {
  return render(<Header />);
};

describe("Header", () => {
  afterEach(() => {
    ButtonMock.mockClear();
    useNodesLogicMock.mockClear();
    usePolicyMock.mockClear();
  });

  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should render with undefined policy", () => {
    usePolicyMock.mockReturnValueOnce({
      policy: undefined,
    });

    makeSut();
  });

  it("should render with unindentifiedNodes different from nodes from policy", () => {
    usePolicyMock.mockReturnValueOnce({
      policy: [{}],
    } as any);

    makeSut();
  });

  it("should call updatePolicy when onClick from ButtonMock with Deploy as its children is called", () => {
    const updatePolicyMock = jest.fn();

    usePolicyMock.mockReturnValueOnce({
      updatePolicy: updatePolicyMock,
    });

    ButtonMock.mockImplementation(({ children, onClick }) => {
      if (children === "Deploy") {
        onClick?.({} as React.MouseEvent<HTMLButtonElement>);
      }

      return <div>{children}</div>;
    });

    makeSut();

    expect(updatePolicyMock).toHaveBeenCalled();
  });
});
