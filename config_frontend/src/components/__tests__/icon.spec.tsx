import React from "react";

import { Icon } from "@/components/icon";

import { render } from "@testing-library/react";

const defaultProps: React.ComponentProps<typeof Icon> = {
  use: "ChevronDown",
};

const makeSut = (props = defaultProps) => {
  return render(<Icon {...props} />);
};

describe("Icon", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should render with correct props", () => {
    const { container } = makeSut({
      ...defaultProps,
      color: "color",
      fill: "fill",
    });

    expect(container.firstChild).toBeDefined();
  });
});
