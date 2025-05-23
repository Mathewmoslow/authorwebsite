// App.tsx - Main application component
import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BookShowcase from "./components/BookShowcase";
import About from "./components/About";
import SecondNovel from "./components/SecondNovel";
import SidebarMediaPlayer from "./components/SidebarMediaPlayer";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import "./index.css";

function App() {
  const { isAudioPlayerVisible, setAudioPlayerVisible } = useAppContext();

  useEffect(() => {
    document.title = "Mathew Moslow | Author";
  }, []);

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
      <SidebarMediaPlayer isVisible={isAudioPlayerVisible} />
      <Footer />
    </div>
  );
}

export default App;
