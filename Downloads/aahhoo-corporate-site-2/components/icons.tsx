import React from 'react';

const iconStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  flexShrink: 0,
  color: '#176B87',
};

const inlineIconStyle: React.CSSProperties = {
    ...iconStyle,
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '0.5rem',
    width: '20px',
    height: '20px',
}

export const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export const WebIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

export const AddressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export const FaxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2M7 9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M7 17v-2.5a2.5 2.5 0 0 1 2.5-2.5h5A2.5 2.5 0 0 1 17 14.5V17"></path><path d="M17 9V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"></path><rect x="7" y="12" width="10" height="5" rx="1"></rect><line x1="12" y1="3" x2="12" y2="5"></line><line x1="9" y1="14" x2="9" y2="15"></line>
    </svg>
);

export const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{...iconStyle, color: '#25D366'}} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.82l-1.35 4.92 5.04-1.32c1.39.73 2.96 1.16 4.6 1.16h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.26h-.01c-1.48 0-2.93-.38-4.2-1.09l-.3-.18-3.12.82.83-3.04-.2-.31c-.8-1.32-1.22-2.84-1.22-4.48 0-4.59 3.73-8.32 8.32-8.32 4.59 0 8.32 3.73 8.32 8.32 0 4.59-3.73 8.32-8.32 8.32zm4.53-6.23c-.25-.12-1.47-.72-1.7-.8s-.39-.12-.56.12c-.17.25-.64.8-.79.97s-.3.19-.56.06c-.25-.12-1.07-.39-2.04-1.26s-1.47-1.9-1.64-2.22c-.17-.32-.02-.49.11-.62s.25-.3.37-.44.17-.25.25-.41.12-.3-.02-.56s-.56-1.34-.76-1.84c-.2-.5-.41-.43-.56-.44-.14-.01-.3 0-.46 0s-.39.06-.6.3c-.2.25-.79.78-.79 1.88s.81 2.18.93 2.34c.12.17 1.58 2.4 3.82 3.36.56.24.99.38 1.34.49.56.17 1.07.15 1.47.09.45-.06 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18s-.26-.18-.51-.3z"></path>
    </svg>
);

export const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

export const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
);

export const StreamIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
    </svg>
);

export const ArticleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

export const ReelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>
    </svg>
);

export const ReelAdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
);

export const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
);

export const AudioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3Z"></path><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3Z"></path>
    </svg>
);

export const PodcastIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
);

export const YouTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{...iconStyle, color: '#FF0000'}} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.82.43c-.86.23-1.52.9-1.76 1.76C2 8.76 2 12 2 12s0 3.24.43 4.81c.23.86.9 1.52 1.76 1.76C5.75 19 12 19 12 19s6.25 0 7.82-.43c.86-.23 1.52.9 1.76-1.76C22 15.24 22 12 22 12s0-3.24-.42-4.81zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"></path>
    </svg>
);

export const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{...iconStyle, color: '#000000'}} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
);

export const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{...iconStyle, color: '#1877F2'}} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1.5.5-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"></path>
    </svg>
);

export const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{...iconStyle, color: '#000000'}} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.66-1.26-5.9-3.18-1.23-1.91-1.36-4.39-.02-6.51.98-1.58 2.6-2.7 4.3-3.01.62-.11 1.25-.14 1.88-.18 1.16-.08 2.31-.16 3.47-.24V12h-2.91v-4.03c.24-.13.47-.27.7-.4.57-.31 1.11-.68 1.62-1.07C13.84 5.53 13.5 2.76 12.525.02z"></path>
    </svg>
);

export const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={inlineIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

export const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={inlineIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);