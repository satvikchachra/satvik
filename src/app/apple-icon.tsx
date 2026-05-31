import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
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
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  );
}
