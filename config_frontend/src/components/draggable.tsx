import React, { PropsWithChildren } from "react";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
};

export const Draggable: React.FC<PropsWithChildren<Props>> = ({
  children,
  id,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
