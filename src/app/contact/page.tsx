import { getInfoPageMetadata, InfoPage } from '../_components/info-page'

export const instant = false

export function generateMetadata() {
  return getInfoPageMetadata('contact')
}

export default function Page() {
  return <InfoPage pageKey="contact" />
}
