import { useState } from "react";
import ReactLogo from "./assets/react.svg";
import "./App.scss";
import Button from "./components/shared/Button";

function App() {
  return (
    <>
      <div className="banner">
        <img src={ReactLogo} alt="React Logo" width="100" height="100" />
        <h1>React Cheatsheet</h1>
        <Button label="Get Started" />
      </div>
      <footer>
        <p>
          Created by{" "}
          <a
            href="https://github.com/aditya3198"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aditya Garg
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
