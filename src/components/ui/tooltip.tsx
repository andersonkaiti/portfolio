'use client'

import { Tooltip as TooltipPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { createContext, useContext, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface TooltipContextValue {
  onTouchTrigger: () => void
}

const TooltipContext = createContext<TooltipContextValue>({
  onTouchTrigger: () => {},
})

function TooltipProvider({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({ ...props }: ComponentProps<typeof TooltipPrimitive.Root>) {
  const [open, setOpen] = useState(false)
  const isTouchRef = useRef(false)

  function onTouchTrigger() {
    isTouchRef.current = true
    setOpen((prev) => !prev)
    setTimeout(() => {
      isTouchRef.current = false
    }, 0)
  }

  function handleOpenChange(value: boolean) {
    if (!value && isTouchRef.current) return
    setOpen(value)
  }

  return (
    <TooltipContext.Provider value={{ onTouchTrigger }}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        {...props}
        open={open}
        onOpenChange={handleOpenChange}
      />
    </TooltipContext.Provider>
  )
}

function TooltipTrigger({
  onPointerDown,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const { onTouchTrigger } = useContext(TooltipContext)

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') {
          e.preventDefault()
          onTouchTrigger()
        }
        onPointerDown?.(e)
      }}
      {...props}
    />
  )
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
