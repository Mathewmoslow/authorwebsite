import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BookShowcase from "../components/BookShowcase";
import About from "../components/About";
import SecondNovel from "../components/SecondNovel";
import LatestPosts from "./LatestPosts"; // Add this import
import MediaPlayer from "../components/MediaPlayer";
import SidebarMediaPlayer from "../components/SidebarMediaPlayer";
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
      <LatestPosts /> {/* Add this line - Latest blog posts section */}
      <MediaPlayer isVisible={isAudioPlayerVisible} />
      <SidebarMediaPlayer isVisible={true} />
      <Footer />
    </>
  );
};

export default Home;
