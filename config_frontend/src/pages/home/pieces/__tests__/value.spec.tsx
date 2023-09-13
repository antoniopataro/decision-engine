import React from "react";

import { fireEvent, render } from "@testing-library/react";

import { Value } from "@/pages/home/pieces/value";

const defaultProps: React.ComponentProps<typeof Value> = {
  value: 0,
  onChange: jest.fn(),
};

const makeSut = (props = defaultProps) => {
  return render(<Value {...props} />);
};

describe("Value", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should call onChange when onBlur from input is called", () => {
    const { getByDisplayValue } = makeSut();

    const valueMock = 0;

    fireEvent.blur(getByDisplayValue(defaultProps.value), {
      target: {
        value: valueMock,
      },
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(valueMock);
  });
});
