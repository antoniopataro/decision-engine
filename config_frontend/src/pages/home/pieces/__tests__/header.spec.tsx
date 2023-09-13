import React from "react";

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
  })),
}));

jest.mock("@/contexts/policy-context", () => ({
  usePolicy: jest.fn(() => ({
    loadingUpdate: false,
    policy: {
      decisions: [{}],
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
    decisionNodes: [
      {
        decision: {
          variable: "variable",
          value: 0,
        },
        type: "DECISION",
      },
    ],
    endNode: {
      output: true,
      type: "END",
    },
    startNode: {
      type: "START",
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

  it("should call canUpdatePolicy and return true if output from endNode is different from policy output", () => {
    useNodesLogicMock.mockReturnValueOnce({
      decisionNodes: [],
      endNode: {
        output: false,
        type: "END",
      },
    } as any);

    makeSut();

    expect(ButtonMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        disabled: false,
      }),
      {},
    );
  });
});
