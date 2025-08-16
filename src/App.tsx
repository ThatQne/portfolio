import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import ThemeSelector from './components/ThemeSelector';
import NotificationContainer from './components/NotificationContainer';
import './styles/theme-transitions.css';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="font-outfit bg-theme-primary text-theme-primary select-none h-full overflow-x-hidden" style={{ overscrollBehavior: 'none' }}>
          <CursorTrail />
          <ThemeSelector />
          <Sidebar />
          <div className="ml-16">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </div>
          <NotificationContainer />
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;