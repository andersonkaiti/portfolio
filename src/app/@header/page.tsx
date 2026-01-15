import {
  AnimatedTooltip,
  AnimatedTooltipContent,
  AnimatedTooltipTrigger,
} from '@components/ui/animated-tooltip'
import Link from 'next/link'
import { links } from './socials'

export default function Header() {
  return (
    <header
      className="mx-2 my-10 flex flex-col gap-6 text-center sm:mx-8 sm:my-16 md:mx-20 md:my-24 lg:mx-24 lg:my-24 "
      id="presentation"
    >
      <div className="relative mx-auto w-fit">
        <div className="-top-4 -translate-x-1/2 absolute left-1/2 flex items-center gap-2 sm:gap-3">
          <div className="size-2 animate-pulse rounded-full bg-green-500 sm:size-3" />
          <span className="font-medium text-green-700 text-xs sm:text-sm dark:text-green-400">
            Available for work
          </span>
        </div>

        <h1 className="scroll-m-20 text-balance text-center font-base text-3xl xs:text-4xl tracking-tight sm:text-5xl md:text-7xl ">
          Hi, I'm Anderson Kaiti
        </h1>
      </div>

      <h2 className="font-semibold text-lg text-primary sm:text-xl md:text-2xl">
        Full-Stack Web Developer
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-balance font-base text-base leading-6 sm:mt-4 sm:text-lg sm:leading-7 md:text-xl md:leading-8 ">
        Computer Science graduate focused on web development, with experience in
        modern technologies like React, Next.js, Node.js, TypeScript,
        PostgreSQL, TailwindCSS, Docker and others.
      </p>

      <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-5 text-muted-foreground sm:mt-10 sm:gap-8 ">
        {links.map(({ id, ariaLabel, href, icon: Icon, tooltip }) => (
          <AnimatedTooltip key={id}>
            <AnimatedTooltipTrigger id={id}>
              <Link aria-label={ariaLabel} href={href} target="_blank">
                <Icon className="size-5 sm:size-6" />
              </Link>
            </AnimatedTooltipTrigger>
            <AnimatedTooltipContent id={id}>{tooltip}</AnimatedTooltipContent>
          </AnimatedTooltip>
        ))}
      </div>
    </header>
  )
}
