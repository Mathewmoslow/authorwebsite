// src/context/AppContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the context shape
interface AppContextType {
  isAudioPlayerVisible: boolean;
  setAudioPlayerVisible: (visible: boolean) => void;
  isAudioPlaying: boolean;
  setAudioPlaying: (playing: boolean) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  isAudioMinimized: boolean;
  setAudioMinimized: (minimized: boolean) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  isAudioPlayerVisible: false,
  setAudioPlayerVisible: () => {},
  isAudioPlaying: false,
  setAudioPlaying: () => {},
  currentTrackIndex: 0,
  setCurrentTrackIndex: () => {},
  isAudioMinimized: false,
  setAudioMinimized: () => {},
});

// Props for the provider component
interface AppProviderProps {
  children: ReactNode;
}

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAudioPlayerVisible, setAudioPlayerVisible] =
    useState<boolean>(false);
  const [isAudioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isAudioMinimized, setAudioMinimized] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isAudioPlayerVisible,
        setAudioPlayerVisible,
        isAudioPlaying,
        setAudioPlaying,
        currentTrackIndex,
        setCurrentTrackIndex,
        isAudioMinimized,
        setAudioMinimized,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);

export default AppContext;
