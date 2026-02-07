
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
    <img src="tatip_logo.png" alt="Ta-Tip Logo" className={`${className} object-contain`} />
);

export default Logo;
