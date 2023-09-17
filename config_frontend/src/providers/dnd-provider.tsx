import React, { type PropsWithChildren, useCallback, useState } from "react";

import { DndContext } from "@/contexts/dnd-context";

import {
  DragDropContext,
  type DragStart,
  type OnDragEndResponder,
  type OnDragStartResponder,
} from "react-beautiful-dnd";

interface Props extends React.ComponentProps<typeof DragDropContext> {}

export const DndProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  onDragEnd,
  onDragStart,
  ...props
}) => {
  const [active, setActive] = useState<DragStart | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const handleDragEnd: OnDragEndResponder = useCallback(
    (...args) => {
      onDragEnd(...args);
      setActive(null);
    },
    [onDragEnd],
  );

  const handleDragStart: OnDragStartResponder = useCallback(
    (...args) => {
      setActive(args[0]);

      if (!onDragStart) {
        return;
      }

      onDragStart(...args);
    },
    [onDragStart],
  );

  return (
    <DndContext.Provider value={{ active, overId, setOverId }}>
      <DragDropContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        {...props}
      >
        {children}
      </DragDropContext>
    </DndContext.Provider>
  );
};
