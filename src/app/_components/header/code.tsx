import { Code2 } from 'lucide-react'

export function Code() {
  return (
    <div className="relative px-6">
      <div className="overflow-hidden rounded-xl border bg-secondary/20 shadow-xs backdrop-blur-sm dark:border-[#313231] dark:shadow-emerald-500/50">
        <div className="flex items-center gap-2 border-[#313231] border-b bg-secondary/20 px-4 py-3">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>
          <div className="ml-4 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-[var(--code-value)]" />
            <span className="text-foreground text-sm">portfolio.tsx</span>
          </div>
        </div>

        <div className="p-6 font-mono text-sm">
          <div className="space-y-2">
            <div className="text-[var(--code-variable)]">
              <span className="text-[var(--code-declarator)]">const</span>{' '}
              developer = {'{'}
            </div>
            <div className="ml-4 space-y-1">
              <div>
                <span className="text-[var(--code-variable)]">name</span>:{' '}
                <span className="text-[var(--code-value)]">
                  'Cientista da Computação'
                </span>
                ,
              </div>
              <div>
                <span className="text-[var(--code-variable)]">role</span>:{' '}
                <span className="text-[var(--code-value)]">
                  'Full Stack Developer'
                </span>
                ,
              </div>
              <div>
                <span className="text-[var(--code-variable)]">skills</span>:{' '}
                <span className="text-[var(--code-variable)]">
                  [{' '}
                  <div className="pl-6">
                    <span className="text-[var(--code-value)]">'HTML5'</span>,
                    <span className="pl-1 text-[var(--code-value)]">
                      'CSS3'
                    </span>
                    ,
                    <span className="pl-1 text-[var(--code-value)]">
                      'JavaScript'
                    </span>
                    ,
                  </div>{' '}
                  <div className="pl-6">
                    <span className="text-[var(--code-value)]">
                      'TypeScript'
                    </span>
                    ,
                    <span className="pl-1 text-[var(--code-value)]">
                      'Node.js'
                    </span>
                    ,{' '}
                    <span className="pl-1 text-[var(--code-value)]">
                      'MySQL'
                    </span>
                    ,
                  </div>
                  <div className="pl-6">
                    <span className="text-[var(--code-value)]">'React.js'</span>
                    ,{' '}
                    <span className="pl-1 text-[var(--code-value)]">
                      'Next.js'
                    </span>
                    ,
                    <span className="pl-1 text-[var(--code-value)]">
                      'TailwindCSS'
                    </span>
                    ,
                  </div>
                  <div className="pl-6">
                    <span className="text-[var(--code-value)]">'Prisma'</span>,
                    <span className="pl-1 text-[var(--code-value)]">
                      'Firebase'
                    </span>
                    ,
                    <span className="pl-1 text-[var(--code-value)]">'Git'</span>
                    ,
                    <span className="pl-1 text-[var(--code-value)]">
                      'Docker'
                    </span>
                  </div>
                </span>
                ] ,
              </div>
              <div>
                <span className="text-[var(--code-variable)]">passion</span>:{' '}
                <span className="text-[var(--code-value)]">
                  'Innovation & Problem Solving'
                </span>
                ,
              </div>
              <div>
                <span className="text-[var(--code-variable)]">available</span>:{' '}
                <span className="text-[var(--code-value)]">true</span>
              </div>
            </div>
            <div className="text-[var(--code-variable)]">{'}'}</div>
          </div>

          <br />

          <div className="text-[var(--code-declarator)]">
            export default{' '}
            <span className="text-[var(--code-variable)]">developer</span>
          </div>
        </div>
      </div>
    </div>
  )
}
