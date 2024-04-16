// Before.js
import React, { useState, useEffect } from 'react';
import { Container, Flex, Heading } from "@chakra-ui/react";
import styles from './Before.module.css';

const Before = () => {
  const [words, setWords] = useState(["Secure. Simple. Rewarding.", "Earn with Confidence", "Stake Smart"]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change the interval duration as needed

    return () => clearInterval(intervalId);
  }, [words]);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= words[currentWordIndex].length + 1) { // Adjusted condition here
        setDisplayedWord(words[currentWordIndex].slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Typing speed in milliseconds

    return () => clearInterval(typingInterval);
  }, [currentWordIndex, words]);

  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <div className={styles.staticTxt}>Karpine Staking</div>
        <ul className={styles.dynamicTxt}>
          <li>{displayedWord}</li>
        </ul>
      </div>
    </div>
  );
};

export default Before;
