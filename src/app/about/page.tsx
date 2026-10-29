import { getInfoPageMetadata, InfoPage } from '../_components/info-page'

export const instant = false

export function generateMetadata() {
  return getInfoPageMetadata('about')
}

export default function Page() {
  return <InfoPage pageKey="about" />
}
