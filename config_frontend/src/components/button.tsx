import React, { type PropsWithChildren } from "react";

import { Icon } from "@/components/icon";

import { cn } from "@/lib/cn";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentProps<typeof Icon>;
  variant?: "green" | "white";
}

export const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  icon,
  variant,
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex h-fit w-fit items-center gap-3 rounded-lg border border-dashed border-black/25 px-4 py-3 text-sm font-semibold transition-all disabled:opacity-50",
        {
          "bg-green-500/75 text-white hover:bg-green-500":
            !variant || variant === "green",
          "bg-white text-black/75": variant === "white",
        },
        className,
      )}
      {...props}
    >
      {icon && <Icon {...icon} />}
      {children}
    </button>
  );
};
