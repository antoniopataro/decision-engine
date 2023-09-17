import React, { createContext, useContext } from "react";

import { DragStart } from "react-beautiful-dnd";

type Props = {
  active: DragStart | null;
  overId: string | null;
  setOverId: React.Dispatch<React.SetStateAction<string | null>>
};

export const DndContext = createContext({} as Props);

export const useDnd = () => useContext(DndContext);
