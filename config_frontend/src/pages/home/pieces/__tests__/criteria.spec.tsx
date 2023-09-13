import React from "react";

import { render } from "@testing-library/react";

import { Criteria } from "@/pages/home/pieces/criteria";

const defaultProps: React.ComponentProps<typeof Criteria> = {
  criteria: "<",
  onChange: jest.fn(),
};

const makeSut = (props = defaultProps) => {
  return render(<Criteria {...props} />);
};

describe("Criteria", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });
});
