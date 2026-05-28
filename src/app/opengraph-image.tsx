import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'Satvik Chachra - Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '40px' }}>
          <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" fill="white" />
        </svg>
        <div style={{ fontSize: 64, fontWeight: 'bold', letterSpacing: '-0.05em' }}>
          Satvik Chachra
        </div>
        <div style={{ fontSize: 32, color: '#888', marginTop: '20px' }}>
          Software Engineer
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
