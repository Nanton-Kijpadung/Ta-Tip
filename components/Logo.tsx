
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  const [hasError, setHasError] = useState(false);

  // If the image fails to load, we show a professional stylized fallback
  if (hasError) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl text-white font-black shadow-sm border border-blue-500/20 overflow-hidden`}
        style={{ fontSize: '1.2em' }}
      >
        T
      </div>
    );
  }

  return (
    <img 
      src="tatip_logo.png" 
      alt="Ta-Tip Logo" 
      className={`${className} object-contain select-none`}
      onError={() => setHasError(true)}
    />
  );
};

export default Logo;
