// Update your Home.tsx or App.tsx to show SidebarMediaPlayer

import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BookShowcase from "../components/BookShowcase";
import About from "../components/About";
import SecondNovel from "../components/SecondNovel";
import MediaPlayer from "../components/MediaPlayer";
import SidebarMediaPlayer from "../components/SidebarMediaPlayer"; // Add this
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";

const Home: React.FC = () => {
  const { isAudioPlayerVisible } = useAppContext();

  useEffect(() => {
    document.title = "Mathew Moslow | Author";
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <BookShowcase />
      <About />
      <SecondNovel />
      <MediaPlayer isVisible={isAudioPlayerVisible} />
      <SidebarMediaPlayer isVisible={true} />{" "}
      {/* Always visible, slides on hover */}
      <Footer />
    </>
  );
};

export default Home;
