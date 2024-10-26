import * as React from "react";

import { cn } from "@/lib/utils";

// export interface InputProps
//   extends  React.InputHTMLAttributes<HTMLInputElement>{}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex outline-none h-10 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary dark:border-opacity-10 bg-white dark:bg-grayDarker",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
