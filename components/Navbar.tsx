import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { ConnectWallet } from "@thirdweb-dev/react";
// import logo from '../public/logo.jpg';

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [sticky, setSticky] = useState<boolean>(false);
  const [connectButtonStyles, setConnectButtonStyles] = useState({
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  });

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setConnectButtonStyles(prevStyles => ({
          ...prevStyles,
          position: 'relative',
          right: '20px', // Adjust the value as needed
        }));
      } else {
        // Reset styles for larger screens
        setConnectButtonStyles(prevStyles => ({
          ...prevStyles,
          position: 'static',
          right: 'auto',
        }));
      }
    };

    handleResize(); // Initial adjustment on component mount

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Run only once when the component mounts

  const toggleMenu = () => {
    setToggle(prevToggle => !prevToggle);
  };

  return (
    <nav className={`${styles.nav} ${sticky ? styles.Glassmorphism : ''}`}>
      <h2 className={styles.logo} style={{ fontSize: sticky ? '24px' : '34px' }}>Karpine</h2>
      <ul className={`${toggle ? '' : styles.hideMobileMenu}`}>
        <li className={styles.navList}>Home</li>
        <li className={styles.navList}>Why-Karpine</li>
        <li className={styles.navList}>About</li>
        <li className={styles.navList}>Contact-Us</li>
        <li className={styles.navList}>
          <ConnectWallet style={connectButtonStyles} className={styles.Wbutton} />
        </li>
      </ul>
      <img src="/menu.png" alt="menu" className={styles.menuIcon} onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
