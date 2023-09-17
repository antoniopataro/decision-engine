import React, { cloneElement } from "react";

import {
  ChevronDown,
  Diamond,
  Flag,
  GripVertical,
  Loader,
  MinusCircle,
  Play,
  Undo,
  UploadCloud,
} from "lucide-react";

const Icons = {
  ChevronDown: <ChevronDown />,
  Condition: <Diamond />,
  Grip: <GripVertical />,
  Loading: <Loader />,
  Output: <Flag />,
  Remove: <MinusCircle />,
  Start: <Play />,
  Undo: <Undo />,
  Upload: <UploadCloud />,
} as const;

export type IconTypes = keyof typeof Icons;

type Props = {
  color?: string;
  fill?: string;
  size?: number;
  use: IconTypes;
};

export const Icon: React.FC<Props> = ({
  color = "#808080",
  fill,
  size = 16,
  use,
}) => {
  return cloneElement(Icons[use], {
    ...(color && { color }),
    ...(fill && { fill }),
    size,
  });
};
