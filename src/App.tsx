// App.tsx - Main application component
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/admin/Admin";
import BlogList from "./pages/blog/BlogList";
import PostView from "./pages/blog/PostView";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BookShowcase from "./components/BookShowcase";
import About from "./components/About";
import SecondNovel from "./components/SecondNovel";
import SidebarMediaPlayer from "./components/SidebarMediaPlayer";
import Footer from "./components/Footer";

import { useAppContext } from "./context/AppContext";
import "./index.css";

// This is your homepage layout
function MainPageLayout() {
  const { setAudioPlayerVisible } = useAppContext();

  useEffect(() => {
    document.title = "Mathew Moslow | Author";
    setAudioPlayerVisible(true);
  }, [setAudioPlayerVisible]);

  const showAudioPlayer = () => {
    setAudioPlayerVisible(true);
  };

  return (
    <>
      <Header />
      <Hero />
      <BookShowcase showAudioPlayer={showAudioPlayer} />
      <About />
      <SecondNovel />
      <SidebarMediaPlayer isVisible={true} />
      <Footer />
    </>
  );
}

// App with routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPageLayout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/post/:id" element={<PostView />} />
      </Routes>
    </Router>
  );
}

export default App;
