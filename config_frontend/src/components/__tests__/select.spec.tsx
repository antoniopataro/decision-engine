import React from "react";

import { Select } from "@/components/select";

import { fireEvent, render } from "@testing-library/react";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

jest.mock("@/hooks/use-on-click-outside", () => ({
  useOnClickOutside: jest.fn(),
}));

const useOnClickOutsideMock = useOnClickOutside as jest.MockedFunction<
  typeof useOnClickOutside
>;

const defaultProps: React.ComponentProps<typeof Select> = {
  options: [
    {
      label: "label",
      value: "value",
    },
  ],
  select: "select",
  setSelect: jest.fn(),
};

const makeSut = (props = defaultProps) => {
  return render(<Select {...props} />);
};

describe("Select", () => {
  afterEach(() => {
    useOnClickOutsideMock.mockClear();
  });

  it("should render", () => {
    const { container } = makeSut();

    expect(container.firstChild).toBeDefined();
  });

  it("should render when isOpen is true and should call setIsOpen with false when keydown event with Escape key is fired", () => {
    const setIsOpenMock = jest.fn();

    jest.spyOn(React, "useState").mockReturnValueOnce([true, setIsOpenMock]);

    const { container } = makeSut();

    fireEvent.keyDown(container, {
      key: "Escape",
    });

    fireEvent.keyDown(container, {
      key: "",
    });

    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });

  it("should call setSelect with the value of the selected option when option is selected", () => {
    jest.spyOn(React, "useState").mockReturnValueOnce([true, jest.fn()]);

    const { getByText } = makeSut();

    fireEvent.click(getByText(defaultProps.options[0].label));

    expect(defaultProps.setSelect).toHaveBeenCalledWith(
      defaultProps.options[0].value
    );
  });

  it("should call setIsOpen with the oposite of isOpen when select display is clicked", () => {
    const isOpenMock = false;
    const setIsOpenMock = jest.fn();

    jest
      .spyOn(React, "useState")
      .mockReturnValueOnce([isOpenMock, setIsOpenMock]);

    const { getByText } = makeSut();

    fireEvent.click(getByText(defaultProps.select));

    expect(setIsOpenMock).toHaveBeenCalledWith(!isOpenMock);
  });

  it("should call setIsOpen with the oposite of isOpen when select display receives keydown event", () => {
    const isOpenMock = false;
    const setIsOpenMock = jest.fn();

    jest
      .spyOn(React, "useState")
      .mockReturnValueOnce([isOpenMock, setIsOpenMock]);

    const { getByText } = makeSut();

    fireEvent.keyDown(getByText(defaultProps.select), {
      key: "Enter",
    });

    fireEvent.keyDown(getByText(defaultProps.select), {
      key: "",
    });

    expect(setIsOpenMock).toHaveBeenCalledWith(!isOpenMock);
  });

  it("should call the passed to useOnClickOutside", () => {
    const setIsOpenMock = jest.fn();

    jest.spyOn(React, "useState").mockReturnValueOnce([true, setIsOpenMock]);

    useOnClickOutsideMock.mockImplementationOnce((_, handler) => {
      handler();
    });

    makeSut();

    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});
