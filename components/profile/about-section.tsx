"use client";

import { Music, Gamepad } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Spotify {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

interface Activity {
  type: number;
  name: string;
  details?: string;
  state?: string;
  application_id?: string;
  assets?: {
    large_image?: string;
  };
  timestamps?: {
    start: number;
  };
}

interface LanyardData {
  spotify?: Spotify;
  activities?: Activity[];
}

interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

interface DiscordStatusProps {
  discordId: string;
}

function DiscordStatus({ discordId }: DiscordStatusProps) {
  const [status, setStatus] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("0:00");
  const [totalTime, setTotalTime] = useState<string>("0:00");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        if (!response.ok) throw new Error('Lanyard API\'ye erişilemedi');
        
        const data: LanyardResponse = await response.json();
        if (data.success) {
          setStatus(data.data);
          
          if (data.data.spotify) {
            const start = data.data.spotify.timestamps.start;
            const end = data.data.spotify.timestamps.end;
            const now = Date.now();
            const duration = end - start;
            const elapsed = now - start;
            const percentage = Math.min(Math.max((elapsed / duration) * 100, 0), 100);
            
            setProgress(percentage);
            
            const formatTime = (ms: number): string => {
              const totalSeconds = Math.floor(ms / 1000);
              const minutes = Math.floor(totalSeconds / 60);
              const seconds = totalSeconds % 60;
              return `${minutes}:${seconds.toString().padStart(2, '0')}`;
            };
            
            setCurrentTime(formatTime(elapsed));
            setTotalTime(formatTime(duration));
          }
        } else {
          throw new Error('Veri alınamadı');
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => clearInterval(interval);
  }, [discordId]);

  if (loading) {
    return (
      <div className="mt-6 flex justify-center items-center h-16">
        <div className="animate-pulse flex space-x-2">
          <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  const gameActivity = status?.activities?.find(activity => 
    activity.type === 0 && activity.name !== "Spotify"
  );

  if (!status?.spotify && !gameActivity) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col md:flex-row gap-6">
      {status?.spotify && (
        <div className="w-full md:w-1/2 bg-opacity-10 bg-black rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="p-5">
            <div className="flex items-center text-green-400 mb-3">
              <Music size={24} className="mr-2" />
              <span className="text-base font-semibold">Şu Anda Müzik Dinliyor</span>
            </div>
            
            <div className="flex">
              <img 
                src={status.spotify.album_art_url} 
                alt="Album Cover" 
                className="w-24 h-24 rounded-lg shadow-md"
              />
              
              <div className="ml-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-white font-bold text-xl">{status.spotify.song}</h3>
                  <p className="text-gray-300 text-base">Sanatçı: {status.spotify.artist}</p>
                  <p className="text-gray-400 text-sm">Albüm: {status.spotify.album}</p>
                </div>
                
                <div className="mt-3">
                  <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-1.5 bg-green-500 rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300 mt-2">
                    <span>{currentTime}</span>
                    <span>{totalTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {gameActivity && (
        <div className="w-full md:w-1/2 bg-opacity-10 bg-black rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="p-5">
            <div className="flex items-center text-purple-400 mb-3">
              <Gamepad size={24} className="mr-2" />
              <span className="text-base font-semibold">Şu Anda Oynuyor</span>
            </div>
            
            <div className="flex">
７              {gameActivity.assets?.large_image ? (
                <img 
                  src={`https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`} 
                  alt="Game" 
                  className="w-24 h-24 rounded-lg shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gray-700 flex items-center justify-center">
                  <Gamepad size={24} className="text-gray-400" />
                </div>
              )}
              
              <div className="ml-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-xl">{gameActivity.name}</h3>
                  {gameActivity.details && (
                    <p className="text-gray-300 text-base">{gameActivity.details}</p>
                  )}
                  {gameActivity.state && (
                    <p className="text-gray-400 text-sm">{gameActivity.state}</p>
                  )}
                </div>
                {gameActivity.timestamps?.start && (
                  <p className="text-gray-400 text-sm mt-2">
                    {Math.floor((Date.now() - gameActivity.timestamps.start) / 60000)} dakikadır oynuyor
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AboutSection() {
  const DISCORD_ID = '843136836947410945';
  
  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h2 id="about-me" className="text-4xl font-bold mb-6 text-white">
        👋 <span className="font-semibold">Merhaba, Ben </span>
        <span className="animated-gradient-text font-extrabold">
          Enes
        </span>
      </h2>
      
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-gray-300">
          Yaklaşık beş yıldır yazılım geliştirme alanında kendimi geliştirmekteyim ve son iki yıldır gerçekleştirdiğim projeleri <span className="font-semibold text-red-400">You</span><span className="font-semibold text-white">Tube</span> platformunda paylaşarak bilgi birikimimi toplulukla paylaşıyorum. Özellikle <span className="font-semibold text-blue-400">Discord botları</span> geliştirme konusunda derin bir tutkuya sahibim ve bu alanda yenilikçi projeler üretmekten büyük keyif alıyorum. Yazılım geliştirme sürecinde hem teknik becerilerimi hem de yaratıcı problem çözme yeteneklerimi sürekli olarak ileriye taşımaya özen gösteriyorum.
          Benimle iletişime geçmek isterseniz
          <a 
            href="https://discord.com/users/843136836947410945" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 underline decoration-purple-400 hover:decoration-purple-300 mx-2"
          >
            @WraithsDev
          </a>
          veya
          <a 
            href="mailto:wraithsisbirligi@gmail.com"
            className="font-semibold text-green-400 hover:text-green-300 transition-colors duration-200 underline decoration-green-400 hover:decoration-green-300 mx-2"
          >
            E-posta
          </a>
          İş birliği fırsatları, projeler için her zaman açığım!
        </p>
        
        <DiscordStatus discordId={DISCORD_ID} />
      </div>
    </div>
  );
}