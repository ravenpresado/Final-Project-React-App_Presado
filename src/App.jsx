
import { useState } from 'react';
import LandingPage from './components/LandingPage';
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
        <div className="planner-placeholder">
          <h1>Conference Expense Planner</h1>
          <p>Welcome to your conference planning dashboard!</p>
        </div>
      )}
    </>
  );
}

export default App;
