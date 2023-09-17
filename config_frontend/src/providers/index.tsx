import React, { type PropsWithChildren } from "react";

import { NodesProvider } from "@/providers/nodes-provider";
import { PolicyProvider } from "@/providers/policy-provider";

import { Toaster } from "react-hot-toast";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <PolicyProvider>
        <NodesProvider>{children}</NodesProvider>
      </PolicyProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          error: {
            className:
              "flex items-center text-sm px-4 py-2 shadow-none border-dashed border-black/25 border",
          },
        }}
      />
    </>
  );
};
