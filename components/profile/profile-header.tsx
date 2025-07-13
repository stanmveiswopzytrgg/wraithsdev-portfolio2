"use client";

import Image from 'next/image';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SocialLinks from './social-links';
import { formatInTimeZone } from 'date-fns-tz';
import { useState, useEffect } from 'react';

export default function ProfileHeader() {
  const [userData, setUserData] = useState({
    avatar: 'https://r.resimlink.com/8CWnMTIk4ur.png',
    status: 'online',
    isAnimated: false,
  });

  const initialTime = formatInTimeZone(
    new Date(),
    'Europe/Istanbul',
    'hh:mm aa'
  );

  useEffect(() => {
    interface LanyardUser {
      discord_user: {
        id: string;
        avatar: string;
        username?: string;
      };
      discord_status?: 'online' | 'idle' | 'dnd' | 'offline' | string;
    }
    
    const updateUserDataFromResponse = (user: LanyardUser) => {
      if (!user || !user.discord_user) return;
      
      const isAnimated = user.discord_user.avatar?.startsWith('a_');
      const format = isAnimated ? 'gif' : 'png';
      
      const avatarUrl = user.discord_user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.${format}?size=512`
        : userData.avatar;
        
      let status = user.discord_status || 'offline';
      if (!['online', 'idle', 'dnd', 'offline'].includes(status)) {
        status = 'offline';
      }
      
      setUserData({
        avatar: avatarUrl,
        status: status,
        isAnimated: isAnimated,
      });
    };
    
    const fetchLanyardData = async () => {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/843136836947410945');
        const data = await response.json();
        if (data.success) {
          updateUserDataFromResponse(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch Lanyard data:', error);
      }
    };

    fetchLanyardData();
    
    const ws = new WebSocket('wss://api.lanyard.rest/socket');
    
    ws.onopen = () => {
      console.log('Connected to Lanyard WebSocket');
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
          updateUserDataFromResponse(data.d);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      console.log('Closing WebSocket connection');
      ws.close();
    };
  }, []);

  const updateLocalTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Istanbul',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const time = formatter.format(new Date());
    const timeElement = document.getElementById('local-time');
    if (timeElement) {
      timeElement.textContent = time;
    }
  };

  if (typeof window !== 'undefined') {
    updateLocalTime();
    setInterval(updateLocalTime, 60000);
  }

  const statusColors = {
    online: {
      dot: 'bg-green-500',
      glow: 'rgba(34,197,94,0.8)',
      pulse: 'green-500'
    },
    idle: {
      dot: 'bg-yellow-500',
      glow: 'rgba(234,179,8,0.8)',
      pulse: 'yellow-500'
    },
    dnd: {
      dot: 'bg-red-500',
      glow: 'rgba(239,68,68,0.8)',
      pulse: 'red-500'
    },
    offline: {
      dot: 'bg-gray-500',
      glow: 'rgba(107,114,128,0.5)',
      pulse: 'gray-500'
    }
  }[userData.status] || {
    dot: 'bg-gray-500',
    glow: 'rgba(107,114,128,0.5)',
    pulse: 'gray-500'
  };
  
  const statusDotColor = statusColors.dot;
  const statusGlowColor = statusColors.glow;
  const statusPulseColor = statusColors.pulse;

  return (
    <div className="flex flex-col gap-2 md:max-w-[22rem] w-full shrink-0">
      <div className="relative w-full aspect-square max-w-[384px]">
        {userData.isAnimated ? (
          <div className="relative w-full h-full">
            <img
              alt="Profile Avatar"
              className="rounded-full shadow-lg transition-transform duration-500 ease-in-out hover:scale-[1.02] absolute inset-0 w-full h-full object-cover"
              src={userData.avatar}
            />
          </div>
        ) : (
          <Image
            alt="Profile Avatar"
            className="rounded-full shadow-lg transition-transform duration-500 ease-in-out hover:scale-[1.02] aspect-square"
            src={userData.avatar}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
        <div className="absolute bottom-3 right-6 h-12 w-12 z-10">
          {userData.status === 'online' && (
            <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-green-500" 
                 style={{ animationDuration: '2s' }} />
          )}
          {userData.status === 'idle' && (
            <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-yellow-500" 
                 style={{ animationDuration: '3s' }} />
          )}
          
          <div className="absolute inset-0 rounded-full"
               style={{
                 boxShadow: `0 0 20px 4px ${statusGlowColor}`,
                 opacity: 0.8
               }} />
               
          <div
            className={`absolute inset-0 rounded-full ${statusDotColor} z-10 flex items-center justify-center`}
            style={{
              boxShadow: `
                0 0 0 4px rgba(255,255,255,0.3),
                0 0 14px 8px ${statusGlowColor}
              `,
            }}
          >
            {userData.status === 'dnd' && (
              <div className="w-6 h-1.5 bg-white rounded-full" />
            )}
            {userData.status === 'idle' && (
              <div className="w-3 h-3 border-4 border-white rounded-full border-b-transparent transform -rotate-45" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-4">
        <span className="text-5xl font-bold">WraithsDev</span>
      </div>

      <div className="text-xl text-violet-300 mt-1">
        İçerik Üretici - Geliştirici
      </div>

      <div className="flex flex-col gap-3 mt-4 text-lg">
        <div className="flex items-center gap-2 w-full">
          <span className="text-violet-400"><Clock size={20} /></span>
          <span>Antalya / Türkiye</span>
          <Badge variant="outline" className="ml-auto">
            <div className="size-2 bg-violet-400 rounded-full mr-1.5"></div>
            <span id="local-time">{initialTime}</span>
          </Badge>
        </div>
      </div>

      <Separator className="my-4" />

      <SocialLinks />
    </div>
  );
}
