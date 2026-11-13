
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import ProductSelection from './components/ProductSelection';
import './App.css';

function App() {
  const [showPlanner, setShowPlanner] = useState(false);

  return (
    <>
      {!showPlanner ? (
        <LandingPage
          onGetStarted={() => setShowPlanner(true)}
        />
      ) : (
        <ProductSelection />
      )}
    </>
  );
}

export default App;
