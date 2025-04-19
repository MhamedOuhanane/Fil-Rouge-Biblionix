import React from 'react';
import { useMediaQuery } from 'react-responsive';

export const PhoneIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

// Basic representation of the email icon (envelope)
export const EmailIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// Basic representation of the headset icon
export const HeadsetIcon = ({ size = 24, color = 'currentColor', ...props }) => (
 <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 8h-1a4 4 0 1 0-8 0H7"></path>
    <path d="M5 12v4a7 7 0 0 0 7 7h0a7 7 0 0 0 7-7v-4"></path>
    <line x1="8" y1="12" x2="8" y2="16"></line>
    <line x1="16" y1="12" x2="16" y2="16"></line>
    <path d="M13 16a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1"></path>
  </svg>
);

// Sun Icon for Light Mode Toggle
export const SunIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

// Moon Icon for Dark Mode Toggle
export const MoonIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

// User/Reader Icon
export const ReaderIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="8" r="4"></circle>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
  </svg>
);

// Writer/Pen Icon
export const WriterIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
    <path d="M2 2l7.586 7.586"></path>
    <circle cx="11" cy="11" r="2"></circle>
  </svg>
);

// Logo Icon for Biblionix
export const BiblionixLogo = ({ ...props }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const size = isDesktop ? 70 : 90;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      {...props}
    >
      {/* Hexagone central */}
      <path
        d="M200 50 L330 125 L330 275 L200 350 L70 275 L70 125 Z"
        fill="transparent"
        stroke="#8B4513"
        strokeWidth="2"
      />
      {/* Livres stylisés */}
      <g transform="translate(120,140)">
        {/* Livre 1 */}
        <g transform="rotate(-15)">
          <rect x="0" y="0" width="40" height="140" fill="#8B4513" />
          <rect x="40" y="0" width="5" height="140" fill="#6B3010" />
          <rect x="5" y="20" width="30" height="5" fill="#fff" />
          <rect x="5" y="30" width="30" height="5" fill="#fff" />
        </g>
        {/* Livre 2 */}
        <g transform="translate(50,-10) rotate(-5)">
          <rect x="0" y="0" width="40" height="140" fill="#CD853F" />
          <rect x="40" y="0" width="5" height="140" fill="#A0652C" />
          <rect x="5" y="20" width="30" height="5" fill="#fff" />
          <rect x="5" y="30" width="30" height="5" fill="#fff" />
        </g>
        {/* Livre 3 */}
        <g transform="translate(100,-15) rotate(5)">
          <rect x="0" y="0" width="40" height="140" fill="#DEB887" />
          <rect x="40" y="0" width="5" height="140" fill="#C09D6C" />
          <rect x="5" y="20" width="30" height="5" fill="#fff" />
          <rect x="5" y="30" width="30" height="5" fill="#fff" />
        </g>
      </g>
      {/* Éléments de circuit */}
      <path
        d="M70 125 Q200 175 330 125"
        fill="none"
        stroke="#8B4513"
        strokeWidth="2"
      />
      <path
        d="M70 275 Q200 225 330 275"
        fill="none"
        stroke="#8B4513"
        strokeWidth="2"
      />
      {/* Points de connexion */}
      <circle cx="70" cy="125" r="6" fill="#8B4513" />
      <circle cx="330" cy="125" r="6" fill="#8B4513" />
      <circle cx="70" cy="275" r="6" fill="#8B4513" />
      <circle cx="330" cy="275" r="6" fill="#8B4513" />
      {/* Orbites de données */}
      <ellipse
        cx="200"
        cy="200"
        rx="160"
        ry="40"
        fill="none"
        stroke="#8B4513"
        strokeWidth="1"
        transform="rotate(-30 200 200)"
      />
      <ellipse
        cx="200"
        cy="200"
        rx="160"
        ry="40"
        fill="none"
        stroke="#8B4513"
        strokeWidth="1"
        transform="rotate(30 200 200)"
      />
    </svg>
  );
};

export const LocationIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const UserPlusIcon = ({size = 35, ...props }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  size = isMobile ? 28 : 35;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width={size}
      height={size}
      {...props}
    >
      <path 
        fill="#F9E6D7"
        d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
    </svg>
  );
};


export const BadgeIcon = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 384 512"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#6b4423"
      d="M256 48l0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-384c0-8.8-7.2-16-16-16l-64 0zM0 64C0 28.7 28.7 0 64 0L320 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 320l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L96 416c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"
    />
  </svg>
);

export const LogoutIcon = ({ ...props }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const size = isDesktop ? 18 : 20;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#6b4423"
        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
      />
    </svg>
  );
};
