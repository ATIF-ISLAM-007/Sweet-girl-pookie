// src/components/Screen1.jsx

"use client"; // Note: This might be required for Next.js app router

import { motion } from "framer-motion";
import { useState, useMemo } from 'react'; // Added for state management

// Component for the initial "secret" screen
function InitialScreen({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }}
      exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
      className="flex flex-col items-center justify-center h-full text-center p-8"
    >
      {/* Duck GIF/Image - Adjust source as needed */}
      <img src="/duck-secret.gif" alt="Cute duck with a secret" className="w-24 h-24 mb-6" />

      <h1 className="text-3xl font-semibold text-white mb-4">
        I have a little secret for you...
      </h1>
      <p className="text-xl text-pink-300 mb-8">
        And trust me... only <strong className="text-yellow-400">YOU</strong> deserve this ✨
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold py-3 px-10 rounded-full shadow-lg text-lg transition duration-300"
      >
        Open it 🎁
      </motion.button>
    </motion.div>
  );
}

// Component for the "ready to know" screen
function ReadyScreen({ onShow }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="flex flex-col items-center justify-center h-full text-center p-8"
    >
      {/* Cat GIF/Image - Adjust source as needed */}
      <img src="/cat-shy.gif" alt="Shy cat" className="w-24 h-24 mb-6" />

      <h1 className="text-3xl font-semibold text-white mb-8">
        Are you really ready to know...?
      </h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShow}
        className="bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold py-3 px-10 rounded-full shadow-lg text-lg transition duration-300"
      >
        Show Me ✨
      </motion.button>
    </motion.div>
  );
}

// Component for the final lyrical/message screen
function LyricalScreen() {
  const lyrics = useMemo(() => [
    "Tu haseen tera naam haseen ae",
    "Tere ishq da jaam haseen ae",
    "Eh be-matlabi zindagi",
    "Jado di tere naam haseen ae",
  ], []);

  const [currentLine, setCurrentLine] = useState(0);

  // Auto-advance lyrics every 2 seconds
  useEffect(() => {
    if (currentLine < lyrics.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 2000); // Adjust timing to match video
      return () => clearTimeout(timer);
    }
  }, [currentLine, lyrics.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      {/* Panda GIF/Image - Adjust source as needed */}
      <motion.img
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 8 } }}
        src="/panda-flower.gif"
        alt="Panda with a flower"
        className="w-28 h-28 mb-6"
      />

      <div className="h-48 flex flex-col justify-center">
        {lyrics.map((line, index) => (
          index <= currentLine && (
            <motion.p
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl italic font-serif text-white mb-2"
            >
              {line}
            </motion.p>
          )
        ))}
      </div>

      {currentLine >= lyrics.length && (
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 9 } }}
          className="text-3xl font-bold text-pink-500 mt-8"
        >
          For My <strong className="text-red-400">Haseen Girl</strong> ❤️
        </motion.p>
      )}
    </motion.div>
  );
}

// Main component orchestrating the flow
export default function Screen1() {
  const [step, setStep] = useState(1); // 1: Initial, 2: Ready, 3: Lyrical

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-950/80 via-black to-pink-950 flex items-center justify-center">
      <div className="max-w-md w-full relative overflow-hidden h-[60vh]">
        {step === 1 && <InitialScreen onOpen={() => setStep(2)} />}
        {step === 2 && <ReadyScreen onShow={() => setStep(3)} />}
        {step === 3 && <LyricalScreen />}

        {/* The bottom right text seen in the video */}
        <p className="absolute bottom-4 right-4 text-sm text-gray-500">@anujbuilds</p>
      </div>
    </div>
  );
}
