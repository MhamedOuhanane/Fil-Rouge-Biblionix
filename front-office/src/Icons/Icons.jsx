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
export const BiblionixLogo = ({ size, strokeColor = "#8B4513", fillColor = "transparent", ...props }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  
  if (isDesktop) {
    size = !size ? 70 : 90;
  }

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
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />

      {/* Livres stylisés */}
      <g transform="translate(120,140)">
        {/* Livre 1 */}
        <g transform="rotate(-15)">
          <rect x="0" y="0" width="40" height="140" fill={strokeColor} />
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
      <path d="M70 125 Q200 175 330 125" fill="none" stroke={strokeColor} strokeWidth="2" />
      <path d="M70 275 Q200 225 330 275" fill="none" stroke={strokeColor} strokeWidth="2" />

      {/* Points de connexion */}
      <circle cx="70" cy="125" r="6" fill={strokeColor} />
      <circle cx="330" cy="125" r="6" fill={strokeColor} />
      <circle cx="70" cy="275" r="6" fill={strokeColor} />
      <circle cx="330" cy="275" r="6" fill={strokeColor} />

      {/* Orbites de données */}
      <ellipse
        cx="200"
        cy="200"
        rx="160"
        ry="40"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        transform="rotate(-30 200 200)"
      />
      <ellipse
        cx="200"
        cy="200"
        rx="160"
        ry="40"
        fill="none"
        stroke={strokeColor}
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


export const BadgeIcon = ({ size = 20, color = 'currentColor',...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 384 512"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill={color}
      d="M256 48l0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-384c0-8.8-7.2-16-16-16l-64 0zM0 64C0 28.7 28.7 0 64 0L320 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 320l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L96 416c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"
    />
  </svg>
);

export const LogoutIcon = ({color = 'currentColor', ...props }) => {
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
        fill={color}
        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
      />
    </svg>
  );
};

export const ProfileIcon = ({size = 24, ...props }) => {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#6B4423"
        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 96a80 80 0 1 1 0 160 80 80 0 0 1 0-160zm0 368c-59.6 0-112.6-29.4-145.5-74.7 1.3-47.4 95-73.3 145.5-73.3s144.2 25.9 145.5 73.3C368.6 434.6 315.6 464 256 464z"
      />
    </svg>
  );
};


export const ContactIcon = ({size = 24, ...props }) => {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 570"
      xmlns="http://www.w3.org/2000/svg"
      fill="#6B4423"
      {...props}
    >
      <g transform="scale(1.4, -1.5) translate(0, -400)" stroke="none">
        <path d="M144 368c-19-10-42-29-54-44-19-16-31-38-43-50-14-15-20-31-17-55 3-29 7-34 31-37l28-3-2 60c-2 48 2 65 17 82 44 49 109 62 170 33 50-24 56-36 58-125 1-81 1-81-33-111-28-25-39-29-67-23-26 4-36 2-40-10-10-26 12-41 33-24 10 8 35 22 56 32 21 10 46 32 58 51 11 19 26 37 34 40 9 3 15 19 15 41 0 28-9 45-42 81-24 25-55 52-70 60-34 17-93 17-134 0z"/>
        <path d="M139 301c-81-81 18-219 120-167 17 9 38 30 47 47 52 102-86 201-167 120z"/>
      </g>
 
    </svg>
  );
};


export const UtilisateurIcon = ({size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={color}
        d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"
      />
    </svg>
  )
};

export const MessageIcon = ({size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={color}
        d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
      />
    </svg>
  )
};

export const PaymentIcon = ({size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={color}
        d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm64 320l-64 0 0-64c35.3 0 64 28.7 64 64zM64 192l0-64 64 0c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64l0 64-64 0zm64-192c-35.3 0-64-28.7-64-64l64 0 0 64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"  
      />
    </svg>
  )
};

export const CategoryIcon = ({size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 540 600"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={color}
        d="M448 480L64 480c-35.3 0-64-28.7-64-64L0 192l512 0 0 224c0 35.3-28.7 64-64 64zm64-320L0 160 0 96C0 60.7 28.7 32 64 32l128 0c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8l160 0c35.3 0 64 28.7 64 64z"
      />
    </svg>
  )
};

export const BookIcon = ({size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={color}
        d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
      />
    </svg>
  )
};

export const TagsIcon = ({size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={color}
        d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5L0 80C0 53.5 21.5 32 48 32l149.5 0c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"  
      />
    </svg>
  )
};

export const ArticleIcon = ({size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={color}
        d="M96 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L80 480c-44.2 0-80-35.8-80-80L0 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 272c0 8.8 7.2 16 16 16s16-7.2 16-16L96 96zm64 24l0 80c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24l0-80c0-13.3-10.7-24-24-24L184 96c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16z" 
      />
    </svg>
  )
};

export const TableBordIcon = ({size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path d="M4386 4870 c-63 -16 -153 -70 -197 -117 -22 -24 -55 -74 -72 -111
        -29 -61 -32 -76 -32 -163 0 -90 2 -99 37 -171 45 -91 103 -147 196 -191 61
        -29 76 -32 162 -32 86 0 101 3 162 32 93 44 151 100 196 191 35 72 37 81 37
        172 0 91 -2 100 -37 172 -68 136 -188 217 -336 224 -42 2 -94 -1 -116 -6z"/>
        <path d="M240 2880 l0 -1440 1120 0 c888 0 1121 3 1124 13 3 6 7 42 10 80 l7
        67 -91 0 -90 0 0 480 0 480 240 0 240 0 0 -176 0 -177 78 74 c99 95 187 158
        309 220 350 178 757 184 1118 15 l95 -45 0 727 0 728 -69 17 c-38 10 -95 34
        -127 53 l-58 35 -243 -243 c-196 -196 -243 -247 -238 -263 15 -49 17 -109 4
        -152 -17 -62 -96 -143 -155 -161 -94 -28 -169 -8 -239 63 -70 69 -92 153 -64
        235 12 32 11 33 -69 112 -79 80 -80 81 -112 69 -42 -14 -98 -14 -140 0 l-32
        12 -199 -199 c-160 -160 -199 -203 -194 -219 30 -100 11 -180 -59 -250 -102
        -101 -230 -101 -331 0 -101 101 -101 229 0 331 70 70 150 89 250 59 16 -5 59
        34 219 194 l199 199 -12 32 c-49 142 75 310 229 310 63 0 114 -23 165 -75 70
        -69 92 -153 64 -235 -12 -32 -11 -33 68 -112 l81 -80 37 12 c35 12 104 9 150
        -5 16 -5 67 41 263 238 l244 244 -26 38 c-15 21 -34 60 -44 87 l-17 48 -1852
        0 -1853 0 0 -1440z m320 1200 l0 -80 -80 0 -80 0 0 80 0 80 80 0 80 0 0 -80z
        m1280 0 l0 -80 -560 0 -560 0 0 80 0 80 560 0 560 0 0 -80z m-1280 -320 l0
        -80 -80 0 -80 0 0 80 0 80 80 0 80 0 0 -80z m1280 0 l0 -80 -560 0 -560 0 0
        80 0 80 560 0 560 0 0 -80z m-1280 -320 l0 -80 -80 0 -80 0 0 80 0 80 80 0 80
        0 0 -80z m1280 0 l0 -80 -560 0 -560 0 0 80 0 80 560 0 560 0 0 -80z m-1280
        -320 l0 -80 -80 0 -80 0 0 80 0 80 80 0 80 0 0 -80z m1280 0 l0 -80 -560 0
        -560 0 0 80 0 80 560 0 560 0 0 -80z m320 -880 l0 -640 -240 0 -240 0 0 640 0
        640 240 0 240 0 0 -640z m-1280 -240 l0 -400 -240 0 -240 0 0 400 0 400 240 0
        240 0 0 -400z m640 -80 l0 -320 -240 0 -240 0 0 320 0 320 240 0 240 0 0 -320z"/>
        <path d="M1840 2240 l0 -480 80 0 80 0 0 480 0 480 -80 0 -80 0 0 -480z"/>
        <path d="M560 2000 l0 -240 80 0 80 0 0 240 0 240 -80 0 -80 0 0 -240z"/>
        <path d="M1200 1920 l0 -160 80 0 80 0 0 160 0 160 -80 0 -80 0 0 -160z"/>
        <path d="M2905 3975 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 15 -16 36
        -25 55 -25 19 0 40 9 55 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -15 16 -36
        25 -55 25 -19 0 -40 -9 -55 -25z"/>
        <path d="M3385 3495 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 15 -16 36
        -25 55 -25 19 0 40 9 55 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -15 16 -36
        25 -55 25 -19 0 -40 -9 -55 -25z"/>
        <path d="M2185 3255 c-50 -49 -15 -135 55 -135 41 0 80 39 80 80 0 41 -39 80
        -80 80 -19 0 -40 -9 -55 -25z"/>
        <path d="M3588 2464 c-592 -86 -1020 -656 -937 -1250 12 -90 48 -219 81 -292
        l23 -51 130 75 c72 42 133 79 137 82 4 4 -3 36 -16 72 -123 338 12 729 320
        930 81 53 214 105 294 116 29 4 54 12 56 18 3 7 3 79 2 162 l-3 150 -87 -12z"/>
        <path d="M3842 2316 l3 -160 65 -12 c179 -34 339 -127 460 -269 184 -217 240
        -526 141 -784 -11 -30 -18 -57 -15 -60 3 -3 65 -41 137 -83 l132 -77 23 51
        c128 284 120 635 -22 923 -167 340 -492 577 -859 623 l-67 9 2 -161z"/>
        <path d="M2480 2080 l0 -320 34 0 c29 0 35 4 41 28 3 15 24 65 46 111 l39 84
        0 208 0 209 -80 0 -80 0 0 -320z"/>
        <path d="M3621 1985 c-110 -24 -226 -89 -311 -175 -250 -250 -252 -649 -5
        -895 122 -121 256 -183 419 -192 292 -16 560 170 649 452 31 99 31 271 0 370
        -101 318 -428 510 -752 440z m254 -160 c172 -45 305 -179 350 -352 65 -249
        -94 -511 -350 -578 -250 -65 -513 94 -580 350 -89 342 238 669 580 580z"/>
        <path d="M3685 1671 c-92 -24 -173 -90 -215 -176 -34 -69 -35 -198 -2 -265 34
        -71 75 -114 144 -151 58 -31 70 -34 148 -33 72 0 93 4 136 26 75 40 107 70
        145 140 31 58 34 70 34 148 0 78 -3 90 -34 148 -57 104 -144 160 -260 167 -36
        2 -79 1 -96 -4z"/>
        <path d="M2977 816 c-70 -40 -130 -76 -134 -79 -18 -19 127 -180 236 -262 191
        -144 391 -218 626 -232 304 -17 616 101 835 317 72 70 140 154 140 170 0 4
        -61 42 -135 84 l-134 77 -72 -76 c-323 -339 -835 -340 -1158 0 -39 41 -72 75
        -73 75 -2 0 -60 -34 -131 -74z"/>
      </g>
    </svg>
  );
};


export const SpinnerLoadingIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin -ml-1 mr-3"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill={color}
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
    

