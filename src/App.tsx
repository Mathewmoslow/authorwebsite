// src/App.tsx
import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BookShowcase from "./components/BookShowcase";
import About from "./components/About";
import SecondNovel from "./components/SecondNovel";
import BottomAudioBar from "./components/BottomAudioBar";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import './styles/global-layout.css';
import './styles/performance-fixes.css';
import './styles/header-fix.css'; 

function App() {
  const { setAudioPlayerVisible } = useAppContext();

  useEffect(() => {
    document.title = "Mathew Moslow | Author";
    setAudioPlayerVisible(true);
  }, [setAudioPlayerVisible]);

  return (
    <div className="App">
      <Header />
      <Hero />
      <BookShowcase />
      <About />
      <SecondNovel />
      <BottomAudioBar isVisible={true} />
      <Footer />
    </div>
  );
}

export default App;