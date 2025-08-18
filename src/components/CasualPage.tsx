import React, { useState, useEffect } from 'react';
import { ArrowLeft, Music, Gamepad2, Camera, Terminal, Folder, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface CasualPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const CasualPage: React.FC<CasualPageProps> = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState<string>('welcome');
  const [playlistName, setPlaylistName] = useState<string>('Loading...');

  const { casualConfig, casualStats } = portfolioData;

  // Fetch playlist name when music file is active
  useEffect(() => {
    if (activeFile === 'music') {
      const fetchPlaylistName = async () => {
        try {
          const response = await fetch(
            `https://open.spotify.com/oembed?url=${encodeURIComponent(casualConfig.spotify.playlistUrl)}`
          );

          if (response.ok) {
            const data = await response.json();
            const title = data.title || 'My Playlist';
            setPlaylistName(title.replace(' on Spotify', ''));
          } else {
            setPlaylistName('My Playlist');
          }
        } catch (err) {
          console.error('Error fetching playlist name:', err);
          setPlaylistName('My Playlist');
        }
      };

      fetchPlaylistName();
    }
  }, [activeFile, casualConfig.spotify.playlistUrl]);

  if (!isOpen) return null;

  const getIcon = (iconName: string, color: string) => {
    const iconProps = { size: 16, style: { color } };
    switch (iconName) {
      case 'music': return <Music {...iconProps} />;
      case 'gamepad': return <Gamepad2 {...iconProps} />;
      case 'camera': return <Camera {...iconProps} />;
      default: return <FileText {...iconProps} />;
    }
  };

  const openFile = (fileName: string) => {
    setActiveFile(fileName);
  };

  const renderFileContent = () => {
    switch (activeFile) {
      case 'welcome':
        return renderWelcomeContent();
      case 'music':
        return renderMusicContent();
      case 'gaming':
        return renderGamingContent();
      case 'hobbies':
        return renderHobbiesContent();
      case 'tasks':
        return renderTasksContent();
      default:
        return renderWelcomeContent();
    }
  };

  const renderWelcomeContent = () => (
    <div className="font-mono text-sm space-y-4 leading-relaxed">
      {/* Welcome.md content - same as before */}
      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">1</div>
        <div className="text-gray-500">
          <span className="text-gray-500">/**</span>
        </div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">2</div>
        <div className="text-gray-500">
          <span className="text-gray-500"> * Welcome to the Secret Zone! 🎮</span>
        </div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">3</div>
        <div className="text-gray-500">
          <span className="text-gray-500"> * Click on any file in the explorer to dive into different sections.</span>
        </div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">4</div>
        <div className="text-gray-500">
          <span className="text-gray-500"> */</span>
        </div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">5</div>
        <div></div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">6</div>
        <div>
          <span className="text-purple-400">const</span>{' '}
          <span className="text-blue-400">casualProjects</span>{' '}
          <span className="text-white">=</span>{' '}
          <span className="text-white">{'{'}</span>
        </div>
      </div>

      {casualConfig.categories.map((category, index) => (
        <div key={category.id} className="flex group">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{7 + index}</div>
          <div className="flex-1">
            <button
              onClick={() => openFile(category.id)}
              className="w-full text-left hover:bg-gray-700 rounded px-2 py-1 transition-colors duration-200 flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2">
                <span className="ml-4"></span>
                {getIcon(category.icon, category.color)}
                <span className="text-green-400">"{category.id}"</span>
                <span className="text-white">:</span>
                <span className="text-yellow-400">"{category.title}"</span>
                {index < casualConfig.categories.length - 1 && <span className="text-white">,</span>}
                <span className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                  {category.description}
                </span>
              </div>
            </button>
          </div>
        </div>
      ))}

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{7 + casualConfig.categories.length}</div>
        <div className="text-white">{'}'}</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{8 + casualConfig.categories.length}</div>
        <div></div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{9 + casualConfig.categories.length}</div>
        <div>
          <span className="text-purple-400">const</span>{' '}
          <span className="text-blue-400">personalStats</span>{' '}
          <span className="text-white">=</span>{' '}
          <span className="text-white">{'{'}</span>
        </div>
      </div>

      {casualStats.map((stat, index) => (
        <div key={index} className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{10 + casualConfig.categories.length + index}</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-green-400">"{stat.label.toLowerCase().replace(/\s+/g, '_')}"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{stat.value}"</span>
            {index < casualStats.length - 1 && <span className="text-white">,</span>}
          </div>
        </div>
      ))}

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{10 + casualConfig.categories.length + casualStats.length}</div>
        <div className="text-white">{'}'}</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{11 + casualConfig.categories.length + casualStats.length}</div>
        <div></div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{12 + casualConfig.categories.length + casualStats.length}</div>
        <div className="text-gray-500">
          <span className="text-gray-500">// 🎉 Congratulations on finding this hidden page!</span>
        </div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{13 + casualConfig.categories.length + casualStats.length}</div>
        <div className="text-gray-500">
          <span className="text-gray-500">// You're clearly someone who pays attention to details.</span>
        </div>
      </div>
    </div>
  );

  const renderMusicContent = () => {
    return (
      <div className="font-mono text-sm space-y-4 leading-relaxed">
        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">1</div>
          <div className="text-gray-500">
            <span className="text-gray-500">/**</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">2</div>
          <div className="text-gray-500">
            <span className="text-gray-500"> * {casualConfig.spotify.description}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">3</div>
          <div className="text-gray-500">
            <span className="text-gray-500"> */</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">4</div>
          <div></div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">5</div>
          <div>
            <span className="text-purple-400">const</span>{' '}
            <span className="text-blue-400">musicProfile</span>{' '}
            <span className="text-white">=</span>{' '}
            <span className="text-white">{'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">6</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-green-400">"description"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{casualConfig.spotify.description}"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">7</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-green-400">"featuredPlaylist"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-white">{'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">8</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"name"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{playlistName}"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">9</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"embed"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"spotify_playlist"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">10</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"url"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{casualConfig.spotify.playlistUrl}"</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">11</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-white">{'}'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">12</div>
          <div className="text-white">{'}'}</div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">13</div>
          <div></div>
        </div>

        {/* Spotify Embed */}
        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">14</div>
          <div className="text-gray-500">
            <span className="text-gray-500">// Embedded Spotify Player:</span>
          </div>
        </div>

        <div className="mt-4 ml-12">
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-600">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${casualConfig.spotify.playlistId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderGamingContent = () => {
    const gamingData = casualConfig.categories.find(c => c.id === 'gaming')?.content.data || { setup: {}, games: [] };

    return (
      <div className="font-mono text-sm space-y-4 leading-relaxed">
        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">1</div>
          <div className="text-gray-500">
            <span className="text-gray-500">/**</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">2</div>
          <div className="text-gray-500">
            <span className="text-gray-500"> * Gaming Setup & Stats</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">3</div>
          <div className="text-gray-500">
            <span className="text-gray-500"> */</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">4</div>
          <div></div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">5</div>
          <div>
            <span className="text-purple-400">class</span>{' '}
            <span className="text-blue-400">GamingSetup</span>{' '}
            <span className="text-white">{'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">6</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-purple-400">constructor</span>
            <span className="text-white">() {'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">7</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-blue-400">this</span>
            <span className="text-white">.</span>
            <span className="text-green-400">hardware</span>{' '}
            <span className="text-white">=</span>{' '}
            <span className="text-white">{'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">8</div>
          <div>
            <span className="ml-12"></span>
            <span className="text-green-400">"gpu"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{gamingData.setup?.gpu || 'RTX 4070'}"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">9</div>
          <div>
            <span className="ml-12"></span>
            <span className="text-green-400">"cpu"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{gamingData.setup?.cpu || 'Ryzen 7 5800X'}"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">10</div>
          <div>
            <span className="ml-12"></span>
            <span className="text-green-400">"ram"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{gamingData.setup?.ram || '32GB DDR4'}"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">11</div>
          <div>
            <span className="ml-12"></span>
            <span className="text-green-400">"monitor"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{gamingData.setup?.monitor || '27\" 1440p 144Hz'}"</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">12</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-white">{'}'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">13</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-white">{'}'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">14</div>
          <div></div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">15</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-purple-400">getCurrentGames</span>
            <span className="text-white">() {'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">16</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-purple-400">return</span>{' '}
            <span className="text-white">[</span>
          </div>
        </div>

        {(gamingData.games || [
          { name: "Valorant", hours: 500, rank: "Diamond" },
          { name: "Apex Legends", hours: 300, rank: "Platinum" },
          { name: "CS2", hours: 200, rank: "Global Elite" }
        ]).map((game, index) => (
          <div key={index}>
            <div className="flex">
              <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{17 + index * 4}</div>
              <div>
                <span className="ml-12"></span>
                <span className="text-white">{'{'}</span>
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{18 + index * 4}</div>
              <div>
                <span className="ml-16"></span>
                <span className="text-green-400">"name"</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-400">"{game.name}"</span>
                <span className="text-white">,</span>
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{19 + index * 4}</div>
              <div>
                <span className="ml-16"></span>
                <span className="text-green-400">"hours"</span>
                <span className="text-white">:</span>{' '}
                <span className="text-blue-300">{game.hours}</span>
                <span className="text-white">,</span>
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{20 + index * 4}</div>
              <div>
                <span className="ml-16"></span>
                <span className="text-green-400">"rank"</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-400">"{game.rank}"</span>
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{21 + index * 4}</div>
              <div>
                <span className="ml-12"></span>
                <span className="text-white">{'}'}{index < (gamingData.games?.length || 3) - 1 ? ',' : ''}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{17 + (gamingData.games?.length || 3) * 4}</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-white">]</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{18 + (gamingData.games?.length || 3) * 4}</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-white">{'}'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{19 + (gamingData.games?.length || 3) * 4}</div>
          <div className="text-white">{'}'}</div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{20 + (gamingData.games?.length || 3) * 4}</div>
          <div></div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{21 + (gamingData.games?.length || 3) * 4}</div>
          <div className="text-gray-500">
            <span className="text-gray-500">// Always grinding for that next rank 🎮</span>
          </div>
        </div>
      </div>
    );
  };

  const renderHobbiesContent = () => {
    const hobbiesData = casualConfig.categories.find(c => c.id === 'hobbies')?.content.data || {
      photography: { camera: "Canon EOS R6", style: "Street & Portrait", instagram: "@thatqne" },
      coffee: { shops_visited: 42, favorite_brew: "Ethiopian Single Origin", current_quest: "Perfect espresso in DMV" },
      other: ["Mechanical keyboards", "Home automation", "3D printing experiments"]
    };

    return (
      <div className="font-mono text-sm space-y-4 leading-relaxed">
        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">1</div>
          <div className="text-gray-500">
            <span className="text-gray-500">/**</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">2</div>
          <div className="text-gray-500">
            <span className="text-gray-500"> * Personal Interests & Hobbies</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">3</div>
          <div className="text-gray-500">
            <span className="text-gray-500"> */</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">4</div>
          <div></div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">5</div>
          <div>
            <span className="text-purple-400">interface</span>{' '}
            <span className="text-blue-400">PersonalInterests</span>{' '}
            <span className="text-white">{'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">6</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-green-400">photography</span>
            <span className="text-white">:</span>{' '}
            <span className="text-white">{'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">7</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"camera"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{hobbiesData.photography?.camera || 'Canon EOS R6'}"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">8</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"style"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{hobbiesData.photography?.style || 'Street & Portrait'}"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">9</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"instagram"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{hobbiesData.photography?.instagram || '@thatqne'}"</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">10</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-white">{'}'}</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">11</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-green-400">coffee</span>
            <span className="text-white">:</span>{' '}
            <span className="text-white">{'{'}</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">12</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"shops_visited"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-blue-300">{hobbiesData.coffee?.shops_visited || 42}</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">13</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"favorite_brew"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{hobbiesData.coffee?.favorite_brew || 'Ethiopian Single Origin'}"</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">14</div>
          <div>
            <span className="ml-8"></span>
            <span className="text-green-400">"current_quest"</span>
            <span className="text-white">:</span>{' '}
            <span className="text-yellow-400">"{hobbiesData.coffee?.current_quest || 'Perfect espresso in DMV'}"</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">15</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-white">{'}'}</span>
            <span className="text-white">,</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">16</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-green-400">other_interests</span>
            <span className="text-white">:</span>{' '}
            <span className="text-white">[</span>
          </div>
        </div>

        {(hobbiesData.other || ["Mechanical keyboards", "Home automation", "3D printing experiments"]).map((interest, index) => (
          <div key={index} className="flex">
            <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{17 + index}</div>
            <div>
              <span className="ml-8"></span>
              <span className="text-yellow-400">"{interest}"</span>
              {index < (hobbiesData.other?.length || 3) - 1 && <span className="text-white">,</span>}
            </div>
          </div>
        ))}

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{17 + (hobbiesData.other?.length || 3)}</div>
          <div>
            <span className="ml-4"></span>
            <span className="text-white">]</span>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{18 + (hobbiesData.other?.length || 3)}</div>
          <div className="text-white">{'}'}</div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{19 + (hobbiesData.other?.length || 3)}</div>
          <div></div>
        </div>

        <div className="flex">
          <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">{20 + (hobbiesData.other?.length || 3)}</div>
          <div className="text-gray-500">
            <span className="text-gray-500">// Life's too short for boring hobbies ✨</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTasksContent = () => (
    <div className="font-mono text-sm space-y-4 leading-relaxed">
      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">1</div>
        <div className="text-blue-400"># Tasks & Goals</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">2</div>
        <div></div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">3</div>
        <div className="text-blue-400">## Current Projects</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">4</div>
        <div className="text-white">- [ ] Finish portfolio easter egg</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">5</div>
        <div className="text-white">- [x] Add secret zone</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">6</div>
        <div className="text-white">- [ ] Deploy to production</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">7</div>
        <div></div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">8</div>
        <div className="text-blue-400">## Learning Goals</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">9</div>
        <div className="text-white">- [ ] Master Three.js</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">10</div>
        <div className="text-white">- [ ] Learn Rust</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">11</div>
        <div className="text-white">- [x] Improve TypeScript skills</div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">12</div>
        <div></div>
      </div>

      <div className="flex">
        <div className="text-gray-500 text-xs w-8 text-right mr-4 select-none">13</div>
        <div className="text-gray-500">// Updated: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 z-50 overflow-hidden">
        {/* VS Code-style layout */}
        <div className="h-full flex flex-col">
          {/* Title Bar */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm font-mono">Kiro IDE - casual_zone</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
              {/* Explorer Header */}
              <div className="p-3 border-b border-gray-700">
                <div className="flex items-center space-x-2 text-gray-300 text-sm font-medium">
                  <Folder size={16} />
                  <span>EXPLORER</span>
                </div>
              </div>

              {/* File Tree */}
              <div className="flex-1 p-2">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                    <Folder size={14} />
                    <span>casual_zone</span>
                  </div>

                  <button
                    onClick={() => openFile('welcome')}
                    className={`w-full flex items-center space-x-2 px-2 py-1 text-sm rounded transition-colors ${activeFile === 'welcome' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    <FileText size={16} style={{ color: '#60a5fa' }} />
                    <span className="font-mono">welcome.md</span>
                  </button>

                  {casualConfig.categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => openFile(category.id)}
                      className={`w-full flex items-center space-x-2 px-2 py-1 text-sm rounded transition-colors ${activeFile === category.id ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                      {getIcon(category.icon, category.color)}
                      <span className="font-mono">{category.title}</span>
                    </button>
                  ))}

                  <button
                    onClick={() => openFile('tasks')}
                    className={`w-full flex items-center space-x-2 px-2 py-1 text-sm rounded transition-colors ${activeFile === 'tasks' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    <FileText size={16} style={{ color: '#f59e0b' }} />
                    <span className="font-mono">tasks.md</span>
                  </button>
                </div>
              </div>

              {/* Back Button */}
              <div className="p-3 border-t border-gray-700">
                <button
                  onClick={onClose}
                  className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Portfolio</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-900 flex flex-col overflow-hidden">
              {/* Tab Bar */}
              <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  {activeFile === 'welcome' && <Terminal className="text-blue-400" size={16} />}
                  {activeFile === 'music' && <Music className="text-green-500" size={16} />}
                  {activeFile === 'gaming' && <Gamepad2 className="text-orange-500" size={16} />}
                  {activeFile === 'hobbies' && <Camera className="text-purple-500" size={16} />}
                  {activeFile === 'tasks' && <FileText className="text-yellow-500" size={16} />}
                  <span className="text-gray-300 text-sm font-mono">
                    {activeFile === 'welcome' && 'welcome.md'}
                    {activeFile === 'music' && 'music.json'}
                    {activeFile === 'gaming' && 'gaming.js'}
                    {activeFile === 'hobbies' && 'hobbies.tsx'}
                    {activeFile === 'tasks' && 'tasks.md'}
                  </span>
                </div>
              </div>

              {/* Content - Single Code Editor */}
              <div className="flex-1 bg-gray-800 border border-gray-700 m-4 rounded-lg flex flex-col min-h-0">
                <div className="bg-gray-900 px-4 py-2 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>Line 1, Column 1</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    UTF-8
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto min-h-0">
                  {renderFileContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default CasualPage;