/* eslint-disable no-unused-vars */
import styled from "styled-components";
import GloabalStyles from "./styles/GloabalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";


const H1 = styled.h1`
font-size: 30px;
font-weight: 600;
color: yellow;
`;


const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GloabalStyles />
      <StyledApp>
        <H1>Salam guluu</H1>
        <Button onClick={()=>alert('Check In')}> 
          Check In
        </Button>
        <Button onClick={()=>alert('Check Out')}> 
          Check Out
        </Button>
        <Input type="number" placeholder="Number of gests"/>
        <Input type="number" placeholder="Number of gests"/>
      </StyledApp>
    </>
  );
}

export default App;
