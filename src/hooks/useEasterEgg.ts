import { useState, useCallback } from 'react';

export const useEasterEgg = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCasualPage, setShowCasualPage] = useState(false);

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