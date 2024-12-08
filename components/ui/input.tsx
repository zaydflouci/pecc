import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { size?: "sm" | "md" | "lg" }>(
  ({ className, type, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 text-sm",
      md: "h-9 text-base",
      lg: "h-12 text-md",
    }

    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-none border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size],
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
