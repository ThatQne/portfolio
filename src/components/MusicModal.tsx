import React, { useState, useEffect } from 'react';
import { X, Music, ExternalLink } from 'lucide-react';

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
  spotifyConfig: {
    playlistId: string;
    playlistUrl: string;
    description: string;
  };
}

const MusicModal: React.FC<MusicModalProps> = ({ isOpen, onClose, spotifyConfig }) => {
  const [playlistName, setPlaylistName] = useState<string>('Loading...');

  // Fetch playlist name from Spotify oEmbed API
  useEffect(() => {
    if (!isOpen) return;

    const fetchPlaylistName = async () => {
      try {
        const response = await fetch(
          `https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyConfig.playlistUrl)}`
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
  }, [isOpen, spotifyConfig.playlistUrl]);

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
                <Music className="text-green-500" size={16} />
                <span className="text-theme-primary font-mono text-sm">music.json</span>
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
              <span className="text-purple-400">const</span>{' '}
              <span className="text-blue-400">musicProfile</span>{' '}
              <span className="text-theme-primary">=</span>{' '}
              <span className="text-theme-primary">{'{'}</span>
            </div>
            
            <div className="ml-4 space-y-2">
              <div>
                <span className="text-green-400">"description"</span>
                <span className="text-theme-primary">:</span>{' '}
                <span className="text-yellow-400">"{spotifyConfig.description}"</span>
                <span className="text-theme-primary">,</span>
              </div>
              
              <div>
                <span className="text-green-400">"featuredPlaylist"</span>
                <span className="text-theme-primary">:</span>{' '}
                <span className="text-theme-primary">{'{'}</span>
              </div>
              
              {/* Spotify Embed replacing the playlist data */}
              <div className="ml-4">
                <div className="font-mono text-sm mb-2">
                  <span className="text-green-400">"name"</span>
                  <span className="text-theme-primary">:</span>{' '}
                  <span className="text-yellow-400">"{playlistName}"</span>
                  <span className="text-theme-primary">,</span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-sm">
                    <span className="text-green-400">"embed"</span>
                    <span className="text-theme-primary">:</span>{' '}
                    <span className="text-yellow-400">"spotify_playlist"</span>
                  </div>
                  <a
                    href={spotifyConfig.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-green-500 hover:text-green-400 transition-colors text-xs"
                  >
                    <ExternalLink size={12} />
                    <span>Open in Spotify</span>
                  </a>
                </div>
                
                <div className="bg-theme-primary rounded-lg p-3 border border-theme-primary">
                  <iframe
                    src={`https://open.spotify.com/embed/playlist/${spotifyConfig.playlistId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded"
                  ></iframe>
                </div>
                
                <div className="font-mono text-sm mt-2">
                  <span className="text-green-400">"url"</span>
                  <span className="text-theme-primary">:</span>{' '}
                  <span className="text-yellow-400">"{spotifyConfig.playlistUrl}"</span>
                </div>
              </div>
              
              <div className="text-theme-primary">{'}'}</div>
            </div>
            
            <div className="text-theme-primary">{'}'}</div>
          </div>

          {/* Footer comment */}
          <div className="mt-6 font-mono text-sm text-theme-muted">
            <span className="text-gray-500">// Perfect for those late-night coding sessions 🎵</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicModal;