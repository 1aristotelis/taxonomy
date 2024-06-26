"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { ProjectCreateDialog } from "./project-create-dialog"

interface ProjectCreateButtonProps extends ButtonProps {
  isLoading: boolean
}

export function ProjectCreateButton({
  isLoading,
  className,
  variant,
  ...props
}: ProjectCreateButtonProps) {

  return (
        <button
          className={cn(
            buttonVariants({ variant }),
            {
              "cursor-not-allowed opacity-60": isLoading,
            },
            className
          )}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
          New project
        </button>
  )
}
