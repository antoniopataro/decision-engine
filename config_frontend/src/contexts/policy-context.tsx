import { createContext, useContext } from "react";

export type Decision = {
  criteria: "<" | "<=" | "==" | ">=" | ">";
  id?: string;
  value: number;
  variable: string;
};

export type Policy = {
  decisions: Decision[];
  id: string;
  output: boolean;
};

type Props = {
  loading: boolean;
  loadingUpdate: boolean;
  policy: Policy | null;
  updatePolicy: (data: Partial<Policy>) => Promise<Policy | void>;
};

export const PolicyContext = createContext({} as Props);

export const usePolicy = () => useContext(PolicyContext);
