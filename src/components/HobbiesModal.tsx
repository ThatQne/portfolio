import React from 'react';
import { X, Camera, Coffee, Settings, ExternalLink } from 'lucide-react';

interface HobbiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  hobbiesData: {
    photography: {
      camera: string;
      style: string;
      instagram: string;
    };
    coffee: {
      shops_visited: number;
      favorite_brew: string;
      current_quest: string;
    };
    other: string[];
  };
}

const HobbiesModal: React.FC<HobbiesModalProps> = ({ isOpen, onClose, hobbiesData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-card border border-theme-primary rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header - Code Editor Style */}
        <div className="bg-theme-primary border-b border-theme-primary p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2">
                <Camera className="text-purple-500" size={16} />
                <span className="text-theme-primary font-mono text-sm">hobbies.tsx</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-theme-secondary hover:text-theme-primary transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Code-style content */}
          <div className="font-mono text-sm space-y-4">
            <div className="text-theme-muted">
              <span className="text-purple-400">interface</span>{' '}
              <span className="text-blue-400">PersonalInterests</span>{' '}
              <span className="text-theme-primary">{'{'}</span>
            </div>
            
            <div className="ml-4 space-y-6">
              {/* Photography Section */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Camera className="text-purple-400" size={16} />
                  <span className="text-green-400">photography</span>
                  <span className="text-theme-primary">:</span>{' '}
                  <span className="text-theme-primary">{'{'}</span>
                </div>
                
                <div className="ml-4 bg-theme-primary rounded p-4 border border-theme-primary">
                  <div className="space-y-2">
                    <div>
                      <span className="text-green-400">"camera"</span>
                      <span className="text-theme-primary">:</span>{' '}
                      <span className="text-yellow-400">"{hobbiesData.photography.camera}"</span>
                      <span className="text-theme-primary">,</span>
                    </div>
                    <div>
                      <span className="text-green-400">"style"</span>
                      <span className="text-theme-primary">:</span>{' '}
                      <span className="text-yellow-400">"{hobbiesData.photography.style}"</span>
                      <span className="text-theme-primary">,</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">"instagram"</span>
                      <span className="text-theme-primary">:</span>{' '}
                      <span className="text-yellow-400">"{hobbiesData.photography.instagram}"</span>
                      <a
                        href={`https://instagram.com/${hobbiesData.photography.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors ml-2"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="text-theme-primary">{'}'}</div>
              </div>

              {/* Coffee Section */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Coffee className="text-amber-500" size={16} />
                  <span className="text-green-400">coffee</span>
                  <span className="text-theme-primary">:</span>{' '}
                  <span className="text-theme-primary">{'{'}</span>
                </div>
                
                <div className="ml-4 bg-theme-primary rounded p-4 border border-theme-primary">
                  <div className="space-y-2">
                    <div>
                      <span className="text-green-400">"shops_visited"</span>
                      <span className="text-theme-primary">:</span>{' '}
                      <span className="text-blue-300">{hobbiesData.coffee.shops_visited}</span>
                      <span className="text-theme-primary">,</span>
                    </div>
                    <div>
                      <span className="text-green-400">"favorite_brew"</span>
                      <span className="text-theme-primary">:</span>{' '}
                      <span className="text-yellow-400">"{hobbiesData.coffee.favorite_brew}"</span>
                      <span className="text-theme-primary">,</span>
                    </div>
                    <div>
                      <span className="text-green-400">"current_quest"</span>
                      <span className="text-theme-primary">:</span>{' '}
                      <span className="text-yellow-400">"{hobbiesData.coffee.current_quest}"</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-theme-primary">{'}'}</div>
              </div>

              {/* Other Interests */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Settings className="text-cyan-400" size={16} />
                  <span className="text-green-400">other_interests</span>
                  <span className="text-theme-primary">:</span>{' '}
                  <span className="text-theme-primary">[</span>
                </div>
                
                <div className="ml-4 space-y-2">
                  {hobbiesData.other.map((interest, index) => (
                    <div key={index} className="bg-theme-primary rounded p-3 border border-theme-primary">
                      <span className="text-yellow-400">"{interest}"</span>
                      {index < hobbiesData.other.length - 1 && <span className="text-theme-primary">,</span>}
                    </div>
                  ))}
                </div>
                
                <div className="text-theme-primary">]</div>
              </div>
            </div>
            
            <div className="text-theme-primary">{'}'}</div>
          </div>

          {/* Footer comment */}
          <div className="mt-6 font-mono text-sm text-theme-muted">
            <span className="text-gray-500">// Life's too short for boring hobbies ✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HobbiesModal;