
import { Flex } from '@chakra-ui/react';
import './App.css';
import Navbar from './components/Navbar';
import Todos from './pages/Todos';
import  { Toaster } from 'react-hot-toast';


function App() {
  return (
  <Flex flexDirection="column" height="100vh" overflow="auto">
      <Navbar/>
      <Todos/>
      <Toaster/>

  </Flex>
   
  );
}

export default App;
