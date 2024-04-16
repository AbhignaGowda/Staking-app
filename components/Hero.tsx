// Hero.tsx
import React from 'react'
import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import StakeToken from "../components/StakeToken";
import RewardToken from "../components/RewardToken";
import Stake from "../components/Stake";
import styles from './Hero.module.css'; // Import the new CSS module

const Hero = () => {
  return (
    <div className={styles.heroContainer}> {/* Add the new class */}
      <SimpleGrid columns={2} spacing={4} mt={10}>
        <StakeToken />
        <RewardToken />
      </SimpleGrid>
      <Stake />
    </div>
  )
}

export default Hero
