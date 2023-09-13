import React from "react";

import { Draggable } from "@/components/draggable";

import { render } from "@testing-library/react";

jest.mock("@dnd-kit/core", () => ({
  ...jest.requireActual("@dnd-kit/core"),
  useDraggable: jest.fn(() => ({})),
}));

const defaultProps: React.ComponentProps<typeof Draggable> = {
  id: "",
};

const makeSut = (props = defaultProps) => {
  return render(<Draggable {...props} />);
};

describe("Draggable", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });
});
