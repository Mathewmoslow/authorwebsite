// App.tsx - Main application component
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BookShowcase from "./components/BookShowcase";
import About from "./components/About";
import SecondNovel from "./components/SecondNovel";
import SidebarMediaPlayer from "./components/SidebarMediaPlayer";
import MinimalAudioPlayer from "./components/MinimalAudioPlayer";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import "./index.css";

function App() {
  const { setAudioPlayerVisible } = useAppContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = "Mathew Moslow | Author";
    
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Make the audio player visible by default
    setAudioPlayerVisible(true);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [setAudioPlayerVisible]);

  const showAudioPlayer = () => {
    setAudioPlayerVisible(true);
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <BookShowcase showAudioPlayer={showAudioPlayer} />
      <About />
      <SecondNovel />
      {isMobile ? (
        <MinimalAudioPlayer isVisible={true} />
      ) : (
        <SidebarMediaPlayer isVisible={true} />
      )}
      <Footer />
    </div>
  );
}

export default App;