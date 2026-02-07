
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  const [hasError, setHasError] = useState(false);

  // If the image fails to load or hasn't been uploaded to GitHub/Vercel,
  // we render this high-quality SVG that represents the "Ta-Tip" (Divine Eye) brand.
  if (hasError) {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        
        {/* Outer Circle - Matching your screenshot's style */}
        <circle cx="50" cy="50" r="48" fill="url(#eyeGradient)" />
        
        {/* White Eye / Monitor Shape (Ta-Tip Concept) */}
        <path 
          d="M50 30C30 30 15 50 15 50C15 50 30 70 50 70C70 70 85 50 85 50C85 50 70 30 50 30Z" 
          fill="white" 
          fillOpacity="0.9"
        />
        
        {/* Pupil / Focus Center */}
        <circle cx="50" cy="50" r="12" fill="#1e3a8a" />
        <circle cx="53" cy="47" r="4" fill="white" fillOpacity="0.8" />
        
        {/* Modern Border */}
        <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
      </svg>
    );
  }

  return (
    <img 
      src="tatip_logo.png" 
      alt="Ta-Tip Logo" 
      className={`${className} object-contain select-none`}
      // This trigger the SVG fallback if the PNG is missing in your GitHub repo
      onError={() => setHasError(true)}
    />
  );
};

export default Logo;
