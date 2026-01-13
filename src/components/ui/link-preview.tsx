'use client'
import { cn } from '@lib/utils'
import { Content, Root, Trigger } from '@radix-ui/react-hover-card'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { encode } from 'qss'
import React from 'react'

type LinkPreviewProps = {
  children: React.ReactNode
  url: string
  className?: string
  width?: number
  height?: number
  quality?: number
  asChild?: boolean
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
)

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = '',
  asChild = false,
}: LinkPreviewProps) => {
  const src: string = isStatic
    ? imageSrc
    : (() => {
        const params = encode({
          url,
          screenshot: true,
          meta: false,
          embed: 'screenshot.url',
          colorScheme: 'dark',
          'viewport.isMobile': true,
          'viewport.deviceScaleFactor': 1,
          'viewport.width': width * 3,
          'viewport.height': height * 3,
        })
        return `https://api.microlink.io/?${params}`
      })()

  const [isOpen, setOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)

  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const targetRect = target.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
    x.set(offsetFromCenter)
  }

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <Image
            alt=""
            draggable={false}
            height={height}
            priority
            quality={quality}
            src={src || '/placeholder.svg'}
            style={{ pointerEvents: 'none' }}
            width={width}
          />
        </div>
      ) : null}

      <Root closeDelay={100} onOpenChange={setOpen} openDelay={50}>
        <Trigger asChild={asChild}>
          {asChild ? (
            children
          ) : (
            <Link
              className={cn('text-black dark:text-white', className)}
              href={url}
              onMouseMove={handleMouseMove}
              tabIndex={0}
            >
              {children}
            </Link>
          )}
        </Trigger>

        <Content
          align="center"
          className="origin-(--radix-hover-card-content-transform-origin)"
          side="top"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                className="rounded-xl shadow-xl"
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  x: translateX,
                }}
              >
                <Link
                  aria-label="Preview link"
                  className="block rounded-xl border-2 border-primary bg-white p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800"
                  href={url}
                  style={{ fontSize: 0 }}
                  tabIndex={-1}
                >
                  <Image
                    alt="Website preview"
                    className="rounded-lg"
                    draggable={false}
                    height={height}
                    loading="lazy"
                    quality={quality}
                    src={src || '/placeholder.svg'}
                    width={width}
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </Content>
      </Root>
    </>
  )
}
