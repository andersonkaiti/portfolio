import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import Image from 'next/image'

interface IStackProps {
  stack: {
    id: number
    category: string
    technologies: {
      name: string
      logo:
        | {
            dark: string
            light: string
          }
        | string
    }[]
  }
  index: number
}

export function Stack({ stack, index }: IStackProps) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 60}
      style={{ transitionDelay: `${index * 60}ms` }}
      suppressHydrationWarning
    >
      <div className="group grid grid-cols-1 gap-4 border-b border-border py-[22px] transition-colors duration-250 ease-[cubic-bezier(.25,0,.35,1)] hover:bg-foreground/5 dark:hover:bg-accent/40 md:grid-cols-[minmax(0,200px)_1fr] md:gap-8">
        <span
          className={cn(
            'pt-[5px] text-[11.5px] font-medium uppercase leading-relaxed tracking-[.16em] text-muted-foreground transition-colors duration-250 group-hover:text-foreground dark:group-hover:text-white',
            jetBrainsMono.className,
          )}
        >
          {stack.category}
        </span>

        <div className="flex flex-wrap items-center gap-y-3">
          {stack.technologies.map((tech, i) => (
            <div key={tech.name} className="flex items-center">
              <div className="flex cursor-default items-center gap-2 text-muted-foreground transition-colors duration-250 group-hover:text-foreground dark:group-hover:text-white">
                {typeof tech.logo === 'object' ? (
                  <>
                    <Image
                      alt={tech.name}
                      className="hidden size-5 dark:flex"
                      src={tech.logo.dark}
                      width={20}
                      height={20}
                    />
                    <Image
                      alt={tech.name}
                      className="flex size-5 dark:hidden"
                      src={tech.logo.light}
                      width={20}
                      height={20}
                    />
                  </>
                ) : (
                  <Image
                    alt={tech.name}
                    className="size-5"
                    src={tech.logo}
                    width={20}
                    height={20}
                  />
                )}
                <span
                  className={cn(
                    'text-[15.5px] font-medium',
                    jetBrainsMono.className,
                  )}
                >
                  {tech.name}
                </span>
              </div>

              {i < stack.technologies.length - 1 && (
                <span className="mx-4 text-muted-foreground/40 transition-colors duration-250 group-hover:text-foreground/30 dark:group-hover:text-white/30">
                  ·
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
