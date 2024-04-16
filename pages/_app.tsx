import './global.module.css';
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ChakraProvider } from "@chakra-ui/react";
import styles from './app.module.css';
import Why from '../components/Why';

import Navbar from "../components/Navbar";
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.background}>

    <ThirdwebProvider activeChain={Sepolia}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
    <Why/>
    <Footer/>
    <video src={require('../public/back.mp4')} autoPlay muted loop className={styles.video}  />
  
    </div>
  );
}

export default MyApp;






