import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Satvik Chachra - Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default function Image() {
  return new ImageResponse(
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
      <svg
        width="150"
        height="150"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: '40px' }}
      >
        <g transform="translate(7.5, 7.5) scale(0.85)">
          <polygon points="50,50 50,5 38,34" fill="#ffffff" />
          <polygon points="50,50 50,5 62,34" fill="#ebebeb" />
          <polygon points="50,50 93,36 62,34" fill="#f5f5f5" />
          <polygon points="50,50 93,36 69,56" fill="#b3b3b3" />
          <polygon points="50,50 76,86 69,56" fill="#d6d6d6" />
          <polygon points="50,50 76,86 50,70" fill="#7a7a7a" />
          <polygon points="50,50 24,86 50,70" fill="#616161" />
          <polygon points="50,50 24,86 31,56" fill="#e0e0e0" />
          <polygon points="50,50 7,36 31,56" fill="#9e9e9e" />
          <polygon points="50,50 7,36 38,34" fill="#fcfcfc" />
        </g>
      </svg>
      <div style={{ fontSize: 64, fontWeight: 'bold', letterSpacing: '-0.05em' }}>
        Satvik Chachra
      </div>
      <div style={{ fontSize: 32, color: '#888', marginTop: '20px' }}>
        AI Native Full-Stack Engineer
      </div>
    </div>,
    {
      ...size,
    },
  );
}
