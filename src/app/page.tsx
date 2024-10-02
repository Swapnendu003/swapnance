'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useRouter } from "next/navigation";

const Landing: React.FC = () => {
  const router = useRouter();
  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasUpvoted = localStorage.getItem('hasUpvoted');
    if (!hasUpvoted) {
      setShowPopup(true);
    }
  }, []);

  const handleUpvote = () => {
    window.open('https://quira.sh/repo/Swapnendu003-swapnance-865611807?utm_source=copy&utm_share_context=quests_creators', '_blank');
    localStorage.setItem('hasUpvoted', 'true');
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('hasUpvoted', 'true');
  };

  const handleClick = () => {
    router.push("/services");
  };

  return (
    <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_API_KEY}>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-xl max-w-md w-full"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Give an Upvote on Quira!</h2>
            <p className="text-white mb-6">Your support helps us grow and reach more people.</p>
            <button
              onClick={handleUpvote}
              className="bg-yellow-400 text-blue-900 rounded-full px-6 py-3 font-semibold hover:bg-yellow-500 transition mb-4"
            >
              Upvote Now
            </button>
            <br />
            <button
              onClick={handleClosePopup}
              className="text-white underline hover:text-gray-200 transition"
            >
              Maybe Later
            </button>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className={`bg-gradient-to-br from-blue-600 to-blue-800 min-h-screen flex flex-col items-center text-white px-6 overflow-hidden relative ${showPopup ? 'blur-lg' : ''}`}
      >
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-6xl flex justify-between items-center py-4 z-10"
        >
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"
              ></motion.div>
            </div>
            <h1 className="text-xl font-semibold">SwapNance</h1>
          </div>
          <nav className="hidden md:flex space-x-8 text-white">
            <a href="#" className="hover:text-blue-300 transition">Home</a>
            <a href="#" className="hover:text-blue-300 transition">About Us</a>
            <a href="#" className="hover:text-blue-300 transition">How It Works</a>
            <a href="#" className="hover:text-blue-300 transition">Our Services</a>
            <a href="#" className="hover:text-blue-300 transition">More</a>
          </nav>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="border border-blue-300 text-blue-300 rounded-full px-4 py-2 hover:bg-blue-300 hover:text-white transition"
          >
            Contact Us
          </motion.button>
        </motion.header>

        <div className="flex-1 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mt-12 md:mt-24 px-6 md:px-0">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex-1 text-left md:max-w-[50%] z-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Financial <br /> Solutions.
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated they
              live in Bookmarksgrove right at the coast of the Semantics.
            </p>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#333333" }}
              className="bg-black text-white rounded-full px-6 py-3 font-semibold hover:bg-gray-800 transition"
              onClick={handleClick}
            >
              Let's Get Started
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="flex-1 mt-12 md:mt-0 flex justify-center"
            style={{ marginLeft: "10rem" }}
          >
            <Image
              src="/assets/kaka.png"
              width={480}
              height={600}
              alt="Picture of the author"
              className="rounded-lg"
            />
          </motion.div>
        </div>

        {/* Floating Coins and Star Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-0 w-20 h-20"
        >
          <Image
            src="/assets/btc.png"
            width={100}
            height={100}
            alt="Coin Placeholder"
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-[20rem] right-[38rem] w-14 h-14"
        >
          <Image
            src="/assets/star.png"
            width={56}
            height={56}
            alt="Star Placeholder"
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="absolute bottom-12 right-16 w-24 h-24"
        >
          <Image
            src="/assets/btc2.png"
            width={96}
            height={96}
            alt="Coin Placeholder"
          />
        </motion.div>
      </motion.div>

      <CopilotPopup
        instructions="You are an AI language model specialized in providing guidance on various finance-related topics based on the Indian market..."
        labels={{
          title: "Money Maker",
          initial: "Hi! 👋 How can I assist you in making money?",
        }}
      />
    </CopilotKit>
  );
};

export default Landing;
