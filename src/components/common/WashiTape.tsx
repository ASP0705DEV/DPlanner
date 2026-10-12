import React from 'react';

interface WashiTapeProps {
  color?: 'pink' | 'mint' | 'butter' | 'lavender';
  rotate?: string;
  className?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  color = 'pink',
  rotate = '-rotate-1',
  className = '',
}) => {
  const colorMap = {
    pink: 'bg-[#FFB7C5]/80 border-t border-b border-[#FFB7C5]',
    mint: 'bg-[#DDF3E4]/90 border-t border-b border-[#BBF7D0]',
    butter: 'bg-[#FFF0B8]/90 border-t border-b border-[#FDE68A]',
    lavender: 'bg-[#E7DFFF]/90 border-t border-b border-[#DDD6FE]',
  };

  return (
    <div
      className={`absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-5 ${colorMap[color]} shadow-sm z-10 pointer-events-none opacity-90 ${rotate} ${className}`}
      style={{
        clipPath: 'polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%)',
      }}
    />
  );
};
