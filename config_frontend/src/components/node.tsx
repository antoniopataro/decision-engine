import React, { PropsWithChildren } from "react";

import { Icon } from "@/components/icon";

import { cn } from "@/lib/cn";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onRemove?: () => void;
}

export const Node: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  onRemove,
  ...props
}) => {
  return (
    <div
      className={cn("group relative flex w-fit items-center", className)}
      {...props}
    >
      {children}
      {onRemove && (
        <div className="absolute left-full flex h-full items-center justify-center px-4 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <button onClick={onRemove} type="button">
            <Icon color="red" fill="white" use="Remove" />
          </button>
        </div>
      )}
      <span className="absolute left-0 right-0 top-[calc(100%+8px)] mx-auto w-fit group-last:hidden">
        <Icon use="ChevronDown" />
      </span>
    </div>
  );
};
