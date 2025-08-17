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
import PasswordModal from './components/PasswordModal';
import CasualPage from './components/CasualPage';
import { useEasterEgg } from './hooks/useEasterEgg';
import './styles/theme-transitions.css';

function App() {
  const {
    isUnlocked,
    showPasswordModal,
    showCasualPage,
    bubbleMessage,
    unlock,
    openPasswordModal,
    closeCasualPage,
    closePasswordModal
  } = useEasterEgg();

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="font-outfit bg-theme-primary text-theme-primary select-none h-full overflow-x-hidden" style={{ overscrollBehavior: 'none' }}>
          <CursorTrail />
          <ThemeSelector />
          <Sidebar />
          <div className="ml-16">
            <Hero bubbleMessage={bubbleMessage} />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer 
              isUnlocked={isUnlocked}
              onLockClick={openPasswordModal}
            />
          </div>
          <NotificationContainer />
          
          {/* Easter Egg Components */}
          <PasswordModal
            isOpen={showPasswordModal}
            onClose={closePasswordModal}
            onSubmit={unlock}
          />
          
          <CasualPage
            isOpen={showCasualPage}
            onClose={closeCasualPage}
          />
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;