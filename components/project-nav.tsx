"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"

interface ProjectNavProps {
  projectId: String
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function ProjectNav({ projectId, items, children }: ProjectNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <Sheet>
      <div className="flex gap-6 md:gap-10">
        <SheetTrigger asChild>
          <Button variant="ghost" className="hidden items-center space-x-2 md:flex">
            <Icons.logo />
          </Button>
        </SheetTrigger>
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : `/project/${projectId}${item.href}`}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}
        
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <Icons.logo />}
          <span className="font-bold">Menu</span>
        </button>
        {showMobileMenu && items && (
          <MobileNav items={items}>{children}</MobileNav>
        )}
      </div>
      <SheetContent className="flex flex-col" position="left" size="sm">
        <SheetHeader className="items-center space-x-2 flex flex-row">
          <Icons.logo />
          <span className="font-bold">
            {siteConfig.name}
          </span>
        </SheetHeader>
        <Separator/>
        <SheetDescription className="h-full py-8 justify-center">
          <Link href="#">Manage Catalog</Link>
        </SheetDescription>
        <SheetFooter className="h-36">
          <Button disabled className="w-full">
            Generate Template
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
