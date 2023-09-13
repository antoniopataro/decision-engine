import React from "react";

import { fireEvent, render } from "@testing-library/react";

import { Variable } from "@/pages/home/pieces/variable";

const defaultProps: React.ComponentProps<typeof Variable> = {
  variable: "",
  onChange: jest.fn(),
};

const makeSut = (props = defaultProps) => {
  return render(<Variable {...props} />);
};

describe("Variable", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should call onChange when onBlur from input is called", () => {
    const { getByDisplayValue } = makeSut();

    const valueMock = "valueMock";

    fireEvent.blur(getByDisplayValue(defaultProps.variable), {
      target: {
        value: valueMock,
      },
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(valueMock);
  });
});
