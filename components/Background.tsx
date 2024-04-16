// components/Background.tsx
import styled from 'styled-components';
import Navbar from './Navbar'; 

const GradientBackground = styled.div`
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%); 
  width: 100%;
  height: 100vh;
`;
const BackgroundWithNavbar: React.FC = ({  }) => {
    return (
      
        <Navbar /> 
         
    
    )
  }
  
  export default BackgroundWithNavbar;