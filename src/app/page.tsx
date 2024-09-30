'use client'
import React from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';


import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";


const Landing: React.FC = () => {
  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;
  return (
    <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_API_KEY}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="bg-gradient-to-br from-blue-600 to-blue-800 min-h-screen flex flex-col items-center text-white px-6 overflow-hidden relative"
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
          >
            Lets Talk
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
        instructions={"You are assisting the user as best as you can. Ansewr in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "Need any help?",
        }}
      />
      <CopilotPopup />
    </CopilotKit>
  );
};

export default Landing;
