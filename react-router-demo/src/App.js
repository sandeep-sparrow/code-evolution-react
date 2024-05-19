import './App.css';
import { Router } from './routes/Router';
import { useState } from 'react';
import publicRoutes from './routes/publicRoutes';
import { Navbar } from './components/Navbar';

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  return (
    <>
      <Router allRoutes={allRoutes} />
      <Navbar />
    </>
  );
}

export default App;
