import React, { PropsWithChildren } from "react";

import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
};

export const Droppable: React.FC<PropsWithChildren<Props>> = ({
  children,
  id,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="h-full">
      {children}
    </div>
  );
};
