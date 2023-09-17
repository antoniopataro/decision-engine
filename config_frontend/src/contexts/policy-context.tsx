import { createContext, useContext } from "react";

import { type Node } from "@/contexts/nodes-context";

export type Policy = {
  nodes: Node[];
  id: string;
};

type Props = {
  loading: boolean;
  loadingUpdate: boolean;
  policy: Policy | null;
  updatePolicy: (data: Partial<Policy>) => Promise<Policy | void>;
};

export const PolicyContext = createContext({} as Props);

export const usePolicy = () => useContext(PolicyContext);
