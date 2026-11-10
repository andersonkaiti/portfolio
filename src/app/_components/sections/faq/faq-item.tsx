'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: string
}

const EASE = [0.32, 0.72, 0, 1] as const

export function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="border-b border-dash/35 py-[22px]"
      >
        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold">
          {question}
          <motion.span
            aria-hidden="true"
            className="text-xl text-primary"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            +
          </motion.span>
        </CollapsibleTrigger>
        <AnimatePresence initial={false}>
          {open && (
            <CollapsibleContent forceMount asChild>
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.35, ease: EASE },
                  opacity: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                <motion.p
                  className="pt-3 text-body"
                  initial={{ y: -8 }}
                  animate={{ y: 0 }}
                  exit={{ y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {answer}
                </motion.p>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    </MotionConfig>
  )
}
