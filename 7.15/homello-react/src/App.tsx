import "./App.css";

import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <main className="app">
      <section className="app__content">
        <div className="app__intro">
          <p className="app__brand">Homello</p>

          <h1>Find your next roommate</h1>

          <p className="app__description">
            Meet verified students looking for a shared
            home.
          </p>
        </div>

        <ProfileCard
          name="Yunchong MAO"
          age={23}
          city="Paris"
          verified={true}
          moveIn="September 2026"
          roommatePreference="Quiet, tidy, and sociable"
        />
      </section>
    </main>
  );
}

export default App;