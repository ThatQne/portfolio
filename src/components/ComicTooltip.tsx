import React, { useState, useEffect } from 'react';

interface ComicTooltipProps {
  message: string;
  isVisible: boolean;
}

const ComicTooltip: React.FC<ComicTooltipProps> = ({ message, isVisible }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayText(prev => {
          const newText = prev.split('');

          // Add random characters for positions not yet revealed
          for (let i = currentIndex; i < message.length; i++) {
            if (message[i] === ' ') {
              newText[i] = ' ';
            } else {
              newText[i] = characters[Math.floor(Math.random() * characters.length)];
            }
          }

          // Set the correct character for the current position
          newText[currentIndex] = message[currentIndex];

          return newText.join('');
        });

        setCurrentIndex(prev => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 35); // Much faster animation - was 100ms, now 30ms

    return () => clearInterval(interval);
  }, [isVisible, currentIndex, message]);

  if (!isVisible) return null;

  return (
    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative">
        {/* Comic speech bubble */}
        <div className="bg-white text-black px-4 py-2 rounded-lg shadow-lg border-2 border-black max-w-xs">
          <p className="text-sm font-mono font-bold text-center">
            {displayText}
          </p>
        </div>

        {/* Speech bubble tail */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black"></div>
          <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default ComicTooltip;