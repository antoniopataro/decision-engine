import React from "react";

import { Droppable } from "@/components/droppable";

import { render } from "@testing-library/react";

jest.mock("@dnd-kit/core", () => ({
  ...jest.requireActual("@dnd-kit/core"),
  useDroppable: jest.fn(() => ({})),
}));

const defaultProps: React.ComponentProps<typeof Droppable> = {
  id: "",
};

const makeSut = (props = defaultProps) => {
  return render(<Droppable {...props} />);
};

describe("Droppable", () => {
  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });
});
