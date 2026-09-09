import React from 'react';

interface BrandLogoProps {
  brandId: string;
  className?: string;
  mono?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ brandId, className = 'w-8 h-8', mono = false }) => {
  switch (brandId.toLowerCase()) {
    case 'apple':
      return (
        <svg
          viewBox="0 0 170 170"
          fill="currentColor"
          className={`${className} ${mono ? 'text-current' : 'text-[#18181B]'}`}
          aria-label="Apple logo"
        >
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.77-11.72-14.18-6.42-9.98-11.53-20.97-15.34-32.96-3.8-12-5.71-23.2-5.71-33.6 0-14.02 3.65-25.59 10.95-34.7 7.3-9.12 16.48-13.79 27.53-14.02 5.07 0 10.63 1.34 16.69 4.02 6.05 2.68 10.01 4.08 11.87 4.2 1.32 0 5.4-1.39 12.24-4.18 6.84-2.79 12.44-4.01 16.79-3.66 12.68.79 22.82 5.37 30.43 13.74-11.04 6.72-16.43 16.03-16.16 27.93.28 9.38 3.99 17.27 11.13 23.66 7.14 6.39 15.65 10.15 25.53 11.27-2.6 7.78-5.7 15.14-9.31 22.09zM119.22 33.02c0-7.39 2.64-14.19 7.91-20.41 5.27-6.22 11.83-10.29 19.68-12.22-.1 1.05-.15 1.94-.15 2.67 0 7.31-2.74 14.28-8.23 20.91-5.48 6.63-12.01 10.43-19.59 11.39-.23-.74-.35-1.53-.35-2.34z" />
        </svg>
      );

    case 'samsung':
      return (
        <svg
          viewBox="0 0 200 60"
          fill="currentColor"
          className={`${className} ${mono ? 'text-current' : 'text-[#034EA2]'}`}
          aria-label="Samsung logo"
        >
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="36"
            letterSpacing="2"
            fill="currentColor"
          >
            SAMSUNG
          </text>
        </svg>
      );

    case 'oneplus':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          aria-label="OnePlus logo"
        >
          <rect x="5" y="5" width="90" height="90" rx="16" fill="#F5010C" />
          <path
            d="M52 28v44M38 42l14-14M62 48h-7"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M74 24v12M68 30h12"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'google-pixel':
    case 'google':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-label="Google Pixel logo"
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      );

    case 'xiaomi':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          aria-label="Xiaomi logo"
        >
          <rect width="100" height="100" rx="24" fill="#FF6700" />
          <path
            d="M26 32v36h11V50h11v18h11V32H26zm38 0v36h11V32H64z"
            fill="#FFFFFF"
          />
          <rect x="42" y="32" width="11" height="11" fill="#FFFFFF" />
        </svg>
      );

    case 'realme':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          aria-label="Realme logo"
        >
          <rect width="100" height="100" rx="22" fill="#FFC915" />
          <path
            d="M28 28h22c9 0 16 6 16 15s-7 15-16 15H40v14H28V28zm12 19h10c3.3 0 6-2.2 6-5s-2.7-5-6-5H40v10z"
            fill="#18181B"
          />
          <path
            d="M54 55l16 17H56L43 55h11z"
            fill="#18181B"
          />
        </svg>
      );

    case 'vivo':
      return (
        <svg
          viewBox="0 0 160 60"
          fill="currentColor"
          className={`${className} ${mono ? 'text-current' : 'text-[#415FFF]'}`}
          aria-label="Vivo logo"
        >
          <text
            x="50%"
            y="68%"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="42"
            letterSpacing="3"
            fill="currentColor"
          >
            vivo
          </text>
        </svg>
      );

    case 'oppo':
      return (
        <svg
          viewBox="0 0 160 60"
          fill="currentColor"
          className={`${className} ${mono ? 'text-current' : 'text-[#008A5E]'}`}
          aria-label="OPPO logo"
        >
          <text
            x="50%"
            y="68%"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="40"
            letterSpacing="4"
            fill="currentColor"
          >
            OPPO
          </text>
        </svg>
      );

    case 'motorola':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          aria-label="Motorola logo"
        >
          <circle cx="50" cy="50" r="46" fill="#001489" />
          <path
            d="M26 66l14-36 10 22 10-22 14 36h-8l-8-22-8 18-8-18-8 22H26z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'nothing':
      return (
        <svg
          viewBox="0 0 180 50"
          fill="currentColor"
          className={`${className} text-[#18181B]`}
          aria-label="Nothing logo"
        >
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            fontFamily="Courier New, monospace"
            fontWeight="bold"
            fontSize="26"
            letterSpacing="6"
            fill="currentColor"
          >
            (NOTHING)
          </text>
        </svg>
      );

    case 'nokia':
      return (
        <svg
          viewBox="0 0 160 50"
          fill="currentColor"
          className={`${className} ${mono ? 'text-current' : 'text-[#124191]'}`}
          aria-label="Nokia logo"
        >
          <text
            x="50%"
            y="68%"
            textAnchor="middle"
            fontFamily="Impact, sans-serif"
            fontSize="38"
            letterSpacing="3"
            fill="currentColor"
          >
            NOKIA
          </text>
        </svg>
      );

    case 'redmi':
      return (
        <svg
          viewBox="0 0 160 50"
          fill="currentColor"
          className={`${className} ${mono ? 'text-current' : 'text-[#E53935]'}`}
          aria-label="Redmi logo"
        >
          <text
            x="50%"
            y="68%"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="34"
            letterSpacing="2"
            fill="currentColor"
          >
            Redmi
          </text>
        </svg>
      );

    default:
      return (
        <div className={`rounded-xl bg-[#8B0000] text-white font-bold flex items-center justify-center font-mono ${className}`}>
          {brandId.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
