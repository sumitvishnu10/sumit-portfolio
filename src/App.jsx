import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from './components/ui/SmoothScroll';
import CustomCursor from './components/ui/CustomCursor';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;