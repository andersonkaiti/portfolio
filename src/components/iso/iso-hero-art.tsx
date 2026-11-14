import { LayersFigure } from './layers-figure'

interface IsoHeroArtProps {
  label: string
  layers: [string, string, string]
}

export function IsoHeroArt({ label, layers }: IsoHeroArtProps) {
  return (
    <div className="mx-auto max-w-[420px] pr-20 sm:pr-0 lg:ml-auto lg:mr-0">
      <LayersFigure label={label} labels={layers} />
    </div>
  )
}
