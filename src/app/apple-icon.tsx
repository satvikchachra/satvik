import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" fill="white" />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
