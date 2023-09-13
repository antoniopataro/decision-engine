import React, { PropsWithChildren } from "react";

import { NodesProvider } from "@/providers/nodes-provider";
import { PolicyProvider } from "@/providers/policy-provider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PolicyProvider>
      <NodesProvider>{children}</NodesProvider>
    </PolicyProvider>
  );
};
