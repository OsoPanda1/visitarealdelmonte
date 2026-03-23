import { useState, useEffect } from "react";

const INTRO_KEY = "tamv_cinematic_intro_shown";

export const useCinematicIntro = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem(INTRO_KEY);
    if (!hasSeenIntro) {
      setIsFirstVisit(true);
      setShowIntro(true);
    }
  }, []);

  const completeIntro = () => {
    localStorage.setItem(INTRO_KEY, "true");
    setShowIntro(false);
  };

  const resetIntro = () => {
    localStorage.removeItem(INTRO_KEY);
    setShowIntro(true);
    setIsFirstVisit(true);
  };

  return { showIntro, isFirstVisit, completeIntro, resetIntro };
};
