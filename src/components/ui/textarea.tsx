import * as React from "react"

import { cn } from "@/lib/utils"

// export interface TextareaProps
//   extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex outline-none h-10 rounded-md font-medium p-3 w-full text-sm border border-gray-200 focus:!border-primary dark:border-opacity-10 bg-white dark:bg-grayDarker min-h-20 resize-none focusPrimary",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
