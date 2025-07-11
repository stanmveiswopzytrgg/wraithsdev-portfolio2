"use client";

import { useEffect, useState } from 'react';

export function LocalTime() {
  const [time, setTime] = useState<string>('Loading...');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <span>{time}</span>;
}