import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Benefits from './components/Benefits';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <>
     <Navbar/>
    <Hero/>
    <Benefits/>
    <Footer/>
        </>
          
       
    );
};

export default App;
