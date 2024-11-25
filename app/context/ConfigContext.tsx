'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeGemini } from '../lib/gemini';

interface ConfigContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('geminiApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      initializeGemini(savedApiKey);
    }
  }, []);

  const handleSetApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('geminiApiKey', key);
  };

  return (
    <ConfigContext.Provider value={{ apiKey, setApiKey: handleSetApiKey }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
} 