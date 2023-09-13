import React from "react";

import { Node } from "@/components/node";

import { render } from "@testing-library/react";

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

jest.mock("@/lib/cn", () => ({
  cn: jest.fn(),
}));

const defaultProps: React.ComponentProps<typeof Node> = {};

const makeSut = (props = defaultProps) => {
  return render(<Node {...props} />);
};

describe("Node", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should render with correct props", () => {
    const { container } = makeSut({
      ...defaultProps,
      onRemove: () => {},
    });

    expect(container.firstChild).toBeDefined();
  });
});
