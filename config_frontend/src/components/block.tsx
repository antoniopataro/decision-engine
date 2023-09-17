import React, { type PropsWithChildren } from "react";

import { Icon } from "@/components/icon";

import { cn } from "@/lib/cn";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ComponentProps<typeof Icon>;
}

export const Block: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  icon,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-3 rounded-lg border border-dashed border-black/25 px-4 py-3 text-sm font-semibold text-black/75 transition-colors",
        className,
      )}
      {...props}
    >
      {icon && <Icon {...icon} />}
      {children}
    </div>
  );
};
