import { JetBrains_Mono } from 'next/font/google'
import { ImageResponse } from 'next/og'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const alt = 'Anderson Kaiti — Full-Stack Web Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#09090b',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: jetBrainsMono.style.fontFamily,
        padding: '0 80px',
      }}
    >
      <p
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-2px',
        }}
      >
        Anderson Kaiti
      </p>
      <p
        style={{
          fontSize: 32,
          color: '#a1a1aa',
          margin: '16px 0 0',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Full-Stack Web Developer
      </p>
      <p
        style={{
          fontSize: 20,
          color: '#52525b',
          margin: '32px 0 0',
          letterSpacing: '0.05em',
        }}
      >
        andersonkaiti.com
      </p>
    </div>,
  )
}
