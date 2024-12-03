import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  customSize?: "default" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, customSize = "default", ...props }, ref) => {
    const sizeClasses = {
      default: "h-9 px-3 py-1 text-base",
      lg: "h-12 px-4 py-2 text-lg"
    };

    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-none border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          sizeClasses[customSize],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
