import { useState, useCallback, useEffect } from 'react';

const UNLOCK_SESSION_KEY = 'easter-egg-unlocked';

export const useEasterEgg = () => {
  // Initialize from sessionStorage if available
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(UNLOCK_SESSION_KEY) === 'true';
    }
    return false;
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCasualPage, setShowCasualPage] = useState(false);

  // Save unlock state to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(UNLOCK_SESSION_KEY, isUnlocked.toString());
    }
  }, [isUnlocked]);

  const SECRET_PASSWORD = "matrix"; // You can change this to whatever you want
  const BUBBLE_MESSAGE = "The matrix has you..."; // You can change this comic bubble text

  const unlock = useCallback((password: string) => {
    if (password === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setShowPasswordModal(false);
      return true;
    }
    return false;
  }, []);

  const openPasswordModal = useCallback(() => {
    if (isUnlocked) {
      setShowCasualPage(true);
    } else {
      setShowPasswordModal(true);
    }
  }, [isUnlocked]);

  const closeCasualPage = useCallback(() => {
    setShowCasualPage(false);
  }, []);

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
  }, []);

  return {
    isUnlocked,
    showPasswordModal,
    showCasualPage,
    bubbleMessage: BUBBLE_MESSAGE,
    unlock,
    openPasswordModal,
    closeCasualPage,
    closePasswordModal
  };
};