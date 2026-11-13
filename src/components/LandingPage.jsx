
function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <p className="landing-subtitle">WELCOME TO</p>

        <h1>Conference Expense Planner</h1>

        <p className="landing-description">
          Plan your perfect conference with ease.
          Choose your rooms, audio-visual equipment,
          and meals while keeping track of your expenses
          in one convenient place.
        </p>

        <button
          className="get-started-btn"
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
