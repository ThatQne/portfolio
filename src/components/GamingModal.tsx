import React from 'react';
import { X, Gamepad2, Monitor, Cpu, HardDrive } from 'lucide-react';

interface GamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  gamingData: {
    setup: {
      gpu: string;
      cpu: string;
      ram: string;
      monitor: string;
    };
    games: Array<{
      name: string;
      hours: number;
      rank: string;
    }>;
  };
}

const GamingModal: React.FC<GamingModalProps> = ({ isOpen, onClose, gamingData }) => {
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
                <Gamepad2 className="text-orange-500" size={16} />
                <span className="text-theme-primary font-mono text-sm">gaming.js</span>
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
              <span className="text-purple-400">class</span>{' '}
              <span className="text-blue-400">GamingSetup</span>{' '}
              <span className="text-theme-primary">{'{'}</span>
            </div>
            
            <div className="ml-4 space-y-4">
              {/* Constructor */}
              <div>
                <span className="text-purple-400">constructor</span>
                <span className="text-theme-primary">() {'{'}</span>
              </div>
              
              <div className="ml-4 space-y-2">
                <div>
                  <span className="text-blue-400">this</span>
                  <span className="text-theme-primary">.</span>
                  <span className="text-green-400">hardware</span>{' '}
                  <span className="text-theme-primary">=</span>{' '}
                  <span className="text-theme-primary">{'{'}</span>
                </div>
                
                <div className="ml-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-theme-primary rounded p-3 border border-theme-primary">
                    <div className="flex items-center space-x-2 mb-2">
                      <Monitor className="text-blue-400" size={16} />
                      <span className="text-green-400">gpu</span>
                    </div>
                    <div className="text-yellow-400">"{gamingData.setup.gpu}"</div>
                  </div>
                  
                  <div className="bg-theme-primary rounded p-3 border border-theme-primary">
                    <div className="flex items-center space-x-2 mb-2">
                      <Cpu className="text-red-400" size={16} />
                      <span className="text-green-400">cpu</span>
                    </div>
                    <div className="text-yellow-400">"{gamingData.setup.cpu}"</div>
                  </div>
                  
                  <div className="bg-theme-primary rounded p-3 border border-theme-primary">
                    <div className="flex items-center space-x-2 mb-2">
                      <HardDrive className="text-green-400" size={16} />
                      <span className="text-green-400">ram</span>
                    </div>
                    <div className="text-yellow-400">"{gamingData.setup.ram}"</div>
                  </div>
                  
                  <div className="bg-theme-primary rounded p-3 border border-theme-primary">
                    <div className="flex items-center space-x-2 mb-2">
                      <Monitor className="text-purple-400" size={16} />
                      <span className="text-green-400">monitor</span>
                    </div>
                    <div className="text-yellow-400">"{gamingData.setup.monitor}"</div>
                  </div>
                </div>
                
                <div className="text-theme-primary">{'}'}</div>
              </div>
              
              <div className="text-theme-primary">{'}'}</div>
              
              {/* Games method */}
              <div className="mt-6">
                <span className="text-purple-400">getCurrentGames</span>
                <span className="text-theme-primary">() {'{'}</span>
              </div>
              
              <div className="ml-4">
                <div>
                  <span className="text-purple-400">return</span>{' '}
                  <span className="text-theme-primary">[</span>
                </div>
                
                <div className="ml-4 space-y-3 mt-2">
                  {gamingData.games.map((game, index) => (
                    <div key={index} className="bg-theme-primary rounded p-4 border border-theme-primary">
                      <div className="text-theme-primary">{'{'}</div>
                      <div className="ml-4 space-y-1">
                        <div>
                          <span className="text-green-400">"name"</span>
                          <span className="text-theme-primary">:</span>{' '}
                          <span className="text-yellow-400">"{game.name}"</span>
                          <span className="text-theme-primary">,</span>
                        </div>
                        <div>
                          <span className="text-green-400">"hours"</span>
                          <span className="text-theme-primary">:</span>{' '}
                          <span className="text-blue-300">{game.hours}</span>
                          <span className="text-theme-primary">,</span>
                        </div>
                        <div>
                          <span className="text-green-400">"rank"</span>
                          <span className="text-theme-primary">:</span>{' '}
                          <span className="text-yellow-400">"{game.rank}"</span>
                        </div>
                      </div>
                      <div className="text-theme-primary">{'}'}{index < gamingData.games.length - 1 ? ',' : ''}</div>
                    </div>
                  ))}
                </div>
                
                <div className="text-theme-primary">]</div>
              </div>
              
              <div className="text-theme-primary">{'}'}</div>
            </div>
            
            <div className="text-theme-primary">{'}'}</div>
          </div>

          {/* Footer comment */}
          <div className="mt-6 font-mono text-sm text-theme-muted">
            <span className="text-gray-500">// Always grinding for that next rank 🎮</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingModal;