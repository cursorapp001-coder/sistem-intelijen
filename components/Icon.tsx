import React from 'react';

interface IconProps {
  type: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ type, className = 'w-6 h-6' }) => {
  const icons: { [key: string]: React.ReactNode } = {
    arrowLeft: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    ),
    menu: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    home: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    gavel: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010.42 9.42L9 10.84l-1.42-1.42a1 1 0 00-1.414 0L4.752 10.84 2.62 8.708a1 1 0 00-1.414 0l-1.28 1.28a1 1 0 000 1.414l8.486 8.486a1 1 0 001.414 0l1.28-1.28a1 1 0 000-1.414l-2.132-2.132zM19.939 5.621l-1.28-1.28a1 1 0 00-1.414 0l-2.132 2.132-1.42-1.42a1 1 0 00-1.414 0L12 6.586l-1.42-1.42a1 1 0 00-1.414 0l-1.28 1.28a1 1 0 000 1.414l2.132 2.132 1.42 1.42a1 1 0 001.414 0l1.28-1.28a1 1 0 000-1.414l-2.132-2.132 1.42-1.42a1 1 0 001.414 0l1.28 1.28a1 1 0 001.414 0zM12 21.168l-8.486-8.486" />
      </svg>
    ),
    graduationCap: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6m-6-8.25v2.887a2.25 2.25 0 002.25 2.25h8.5A2.25 2.25 0 0018 14.637V11.75" />
      </svg>
    ),
    archive: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    book: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    chat: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    briefcase: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-1.414 0l-2.414-2.414A1 1 0 009.586 13H4" />
      </svg>
    ),
    scales: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945C21.405 11 22 10.405 22 9.75V9A2.25 2.25 0 0019.75 6.75h-1.568A2.25 2.25 0 0016 4.5h-8A2.25 2.25 0 005.818 6.75H4.25A2.25 2.25 0 002 9v.75c0 .655.595 1.25 1.055 1.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5v15m0 0c-1.5 0-2.75-.836-3.5-2.25m3.5 2.25c1.5 0 2.75-.836 3.5-2.25" />
      </svg>
    ),
    info: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    shieldCheck: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4" />
      </svg>
    ),
    search: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    externalLink: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    location: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-4V3l5.553 2.776a1 1 0 01.447.894v10.764a1 1 0 01-1.447.894L15 17m-6 3l6-3m-6-10l6-3" />
      </svg>
    ),
    pin: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657l-4.243 4.243a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    clock: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    social: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    checkpoint: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21.5l-6-3.375V6.875l6-3.375 6 3.375v11.25l-6 3.375z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 21.5l6-3.375V6.875l-6-3.375" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 15.5 2 2 4-4" />
        </svg>
    ),
    msisdn: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M12 4v7m0 0l3-3m-3 3l-3-3" />
        </svg>
    ),
    idCard: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h-4m0 0H9m2 0h2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-6 3h4" />
            <circle cx="17" cy="14" r="1" />
        </svg>
    ),
    imei: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9h4m-4 3h4m-4 3h4" />
        </svg>
    ),
    wiretap: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m14 0a7 7 0 11-14 0m14 0v2a7 7 0 01-14 0v-2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h2m7-7v2m0 10v2m0-4h.01" />
        </svg>
    ),
    apps: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ),
    cellTower: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.5V5.5m0 0l-4 4m4-4l4 4m-4-4V3" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.75 11a14.14 14.14 0 0114.5 0" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.5 14.5a8.8 8.8 0 0111 0" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 18a4.4 4.4 0 017.5 0" />
        </svg>
    ),
    whatsapp: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
           <path d="M12.04 2.12c-5.46 0-9.88 4.42-9.88 9.88 0 1.74.45 3.38 1.25 4.81L2.01 22l5.3-1.39a9.83 9.83 0 004.73 1.22h.01c5.46 0 9.88-4.42 9.88-9.88 0-5.46-4.42-9.88-9.88-9.88zm0 18.02h-.01a8.14 8.14 0 01-4.14-1.15l-.3-.18-3.07.8.82-3.01-.2-.31a8.1 8.1 0 01-1.25-4.32c0-4.51 3.66-8.17 8.18-8.17s8.18 3.66 8.18 8.17-3.67 8.17-8.18 8.17zm4.45-6.01c-.25-.12-1.46-.72-1.69-.8s-.39-.12-.56.12-.64.8-.78.96-.28.19-.52.06c-1.11-.56-1.95-1.11-2.65-1.95s-.8-1.55-.96-1.8c-.16-.25-.02-.38.11-.5.11-.11.25-.28.37-.42s.16-.2.25-.33.04-.25-.02-.37c-.06-.12-.56-1.35-.76-1.85-.2-.49-.4-.42-.55-.42h-.48c-.16 0-.42.06-.64.3.0 0-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.71 2.61 4.14 3.63.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-.0.14-1.18z"/>
        </svg>
    ),
    zap: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    database: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7a8 8 0 0116 0" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v4c0 2.21 3.582 4 8 4s8-1.79 8-4v-4" />
        </svg>
    ),
    logout: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    ),
  };
  return icons[type] || null;
};

interface PlatformIconProps {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'TikTok' | 'LinkedIn';
  className?: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className = 'w-6 h-6' }) => {
  const icons: { [key: string]: React.ReactNode } = {
    Facebook: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
        <path d="M22.675 0h-21.35C.589 0 0 .589 0 1.325v21.351C0 23.411.589 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.736 0 1.325-.589 1.325-1.325V1.325C24 .589 23.411 0 22.675 0z"/>
      </svg>
    ),
    Twitter: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.523 3.379 4.75 3.419a9.9 9.9 0 01-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.963 13.963 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
    ),
    Instagram: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.784.305-1.457.717-2.126 1.387C1.344 2.687.93 3.36.63 4.14c-.3.765-.5 1.635-.558 2.913-.058 1.28-.072 1.687-.072 4.947s.015 3.667.072 4.947c.06 1.277.26 2.148.558 2.913.305.784.717 1.457 1.387 2.126.67.67 1.343 1.08 2.126 1.387.765.3 1.635.5 2.913.558 1.28.058 1.687.072 4.947.072s3.667-.015 4.947-.072c1.277-.06 2.148-.26 2.913-.558.784-.305 1.457-.717 2.126-1.387.67-.67 1.08-1.343 1.387-2.126.3-.765.5-1.635.558-2.913.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.26-2.148-.558-2.913-.305-.784-.717-1.457-1.387-2.126C21.313 1.344 20.64.93 19.86.63c-.765-.3-1.635-.5-2.913-.558C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.25 1.805-.414 2.227-.218.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.23.413-1.27.057-1.649.07-4.85.07-3.203 0-3.585-.015-4.85-.07-1.17-.06-1.805-.25-2.227-.414-.562-.218-.96-.479-1.382-.899-.419-.419-.679-.824-.896-1.38-.164-.42-.36-1.065-.413-2.23C2.175 15.585 2.16 15.205 2.16 12s.015-3.585.07-4.85c.06-1.17.25-1.805.414-2.227.218-.562.479.96.899-1.382.419-.419.819-.679 1.38-.896.42-.164 1.065-.36 2.23-.413C8.415 2.175 8.795 2.16 12 2.16zm0 5.48c-2.52 0-4.56 2.04-4.56 4.56s2.04 4.56 4.56 4.56 4.56-2.04 4.56-4.56-2.04-4.56-4.56-4.56zm0 7.36c-1.545 0-2.8-1.255-2.8-2.8s1.255-2.8 2.8-2.8 2.8 1.255 2.8 2.8-1.255 2.8-2.8 2.8zm6.305-6.75c-.745 0-1.35.605-1.35 1.35s.605 1.35 1.35 1.35 1.35-.605 1.35-1.35-.605-1.35-1.35-1.35z"/>
        </svg>
    ),
    TikTok: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
           <path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.52.01 1.04.01 1.56.02 2.48.09 3.99 1.62 4.01 4.03.02 2.06 0 4.12 0 6.18s-.02 4.12 0 6.18c-.02 2.4-1.53 3.92-3.95 4-1.38.03-2.76.04-4.14.04s-2.76-.01-4.14-.04c-2.42-.08-3.93-1.6-3.95-4-.02-2.06 0-4.12 0-6.18s.02-4.12 0-6.18c.02-2.41 1.53-3.94 3.95-4.03C7.66.01 8.18 0 8.7 0c1.3.01 2.6.02 3.82.02zM16.1 5.92c-1.82 0-3.29 1.47-3.29 3.29v5.3c0 1.82 1.47 3.29 3.29 3.29s3.29-1.47 3.29-3.29V9.21c0-1.82-1.47-3.29-3.29-3.29z"/>
        </svg>
    ),
    LinkedIn: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
    ),
  };
  return icons[platform] || null;
};