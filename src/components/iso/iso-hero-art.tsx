import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { LayersFigure } from './layers-figure'
import { LAYER_ANCHORS } from './layers-geometry'

interface IsoHeroArtProps {
  label: string
  layers: [string, string, string]
}

export function IsoHeroArt({ label, layers }: IsoHeroArtProps) {
  return (
    <div className="mx-auto max-w-[420px] pr-20 sm:pr-0 lg:ml-auto lg:mr-0">
      <div className="relative">
        <LayersFigure label={label} />
        <ul
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 m-0 list-none p-0 text-[10px] text-muted-foreground sm:text-[12px]',
            jetBrainsMono.className,
          )}
        >
          {layers.map((text, index) => (
            <li
              key={text}
              className="absolute flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap pl-2"
              style={LAYER_ANCHORS[index]}
            >
              <span className="size-1 rounded-full bg-primary" />
              <span className="h-px w-3 border-t border-dashed border-dash" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
