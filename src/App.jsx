import "./App.css";
import HomePage from "./components/Home/HomePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <HomePage />
      </div>
    </>
  );
}

export default App;
