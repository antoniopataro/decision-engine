import React from "react";

import { Button } from "@/components/button";

import { render } from "@testing-library/react";

jest.mock("@/components/icon", () => ({
  Icon: jest.fn(() => <div />),
}));

jest.mock("@/lib/cn", () => ({
  cn: jest.fn(),
}));

const defaultProps: React.ComponentProps<typeof Button> = {
  icon: {
    use: "ChevronDown",
  },
  variant: "green",
};

const makeSut = (props = defaultProps) => {
  return render(<Button {...props} />);
};

describe("Button", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });
});
