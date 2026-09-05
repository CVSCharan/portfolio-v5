import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CVS Charan — Full-Stack Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b', // zinc-950, very close to black
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 80,
            fontSize: 24,
            color: '#71717a', // zinc-500
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          2024 · India
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              color: '#ffffff',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            I build things<br />
            <span style={{ color: '#3b82f6' }}>that think.</span> {/* blue-500 */}
          </div>
          
          <div
            style={{
              fontSize: 32,
              color: '#a1a1aa', // zinc-400
              marginTop: 40,
            }}
          >
            CVS Charan <span style={{ opacity: 0.5, margin: '0 16px' }}>×</span> Full-Stack Engineer <span style={{ opacity: 0.5, margin: '0 16px' }}>×</span> AI/LLM
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
