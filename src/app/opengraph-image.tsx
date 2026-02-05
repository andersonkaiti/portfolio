import { JetBrains_Mono } from 'next/font/google'
import { ImageResponse } from 'next/og'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '400',
})

export const alt = 'Anderson Kaiti'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 200,
        background: 'black',
        width: '100%',
        height: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontFamily: jetBrainsMono.style.fontFamily,
      }}
    >
      AK
    </div>,
  )
}
