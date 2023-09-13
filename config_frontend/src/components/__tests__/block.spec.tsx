import React from "react";

import { Block } from "@/components/block";

import { render } from "@testing-library/react";

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

jest.mock("@/lib/cn", () => ({
  cn: jest.fn(),
}));

const defaultProps: React.ComponentProps<typeof Block> = {
  icon: {
    use: "ChevronDown",
  },
};

const makeSut = (props = defaultProps) => {
  return render(<Block {...props} />);
};

describe("Block", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });
});
