import type { LucideIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'

export interface ITechnology {
  name: string
  logo:
    | {
        dark: StaticImageData
        light: StaticImageData
      }
    | StaticImageData
}

export interface IStack {
  id: number
  category: string
  icon: LucideIcon
  technologies: ITechnology[]
}
