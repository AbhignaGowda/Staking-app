import type { NextPage } from "next";
import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import Hero from "../components/Hero";
import Before from "../components/Before";
import styles from './global.module.css';


const Home: NextPage = () => {
  const address = useAddress();

  if(!address) {
    return (
      <div className={styles.con}>

      <Before/>
      </div>
    )
  }
  
  return (
    <Container maxW={"1200px"}>
      <Hero/>
    </Container>
  );
};

export default Home;