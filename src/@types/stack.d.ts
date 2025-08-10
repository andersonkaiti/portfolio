import type { LucideIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'

export interface ITheme {
  dark: StaticImageData
  light: StaticImageData
}

export interface ITechnology {
  name: string
  logo: ITheme | StaticImageData
}

export interface IStack {
  id: number
  category: string
  icon: LucideIcon
  technologies: ITechnology[]
}
