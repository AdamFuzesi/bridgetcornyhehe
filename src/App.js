import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  // 0 => closed, 1 => letter out (folded), 2 => fully open
  const [openState, setOpenState] = useState(0);
  const [hover, setHover] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Reference to our audio element
  const audioRef = useRef(null);

  // Hover-lift only when envelope closed
  const handleMouseEnter = () => {
    if (openState === 0) {
      setHover(true);
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  // On click: go from 0->1->2. 
  // Playing music if going from 1->2.
  const handleClick = () => {
    setOpenState((prev) => {
      // Going from 1->2 => play music
      if (prev === 1) {
        audioRef.current?.play();
      }
      if (prev < 2) {
        return prev + 1;
      }
      return 2;
    });
  };

  // Handle the Yes/No button clicks
  const handleYes = () => {
    setResponseMessage("YAYYYYYYYYYYY");
  };

  const handleNo = () => {
    setResponseMessage("crap");
  };

  return (
    <div className="container">
      {/* Hidden audio: plays on second click (1->2) */}
      <audio ref={audioRef} src="/Careless-Whisper.mp3" />

      <div
        className="valentines"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="envelope"></div>
        <div className="front"></div>

        {/* The letter/card with states */}
        <div
          className={[
            "card",
            hover ? "hover" : "",
            `state${openState}`,
          ].join(" ")}
        >
          <div className="letter-inner">
            {/* Left half: large image (hidden in state0 by CSS override if desired) */}
            <div className="left-half" />

            {/* Right half: question & buttons */}
            <div className="right-half">
              <div className="question">Would u be my Valentine? :)</div>
              <div className="button-row">
                <button className="yes-btn" onClick={handleYes}>
                  Yes
                </button>
                <button className="no-btn" onClick={handleNo}>
                  Fhughedaboutit
                </button>
              </div>

              {/* Show response message if any */}
              {responseMessage && (
                <div style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#d62828" }}>
                  {responseMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating hearts above the envelope */}
        <div className="hearts">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
          <div className="four"></div>
          <div className="five"></div>
        </div>
      </div>

      <div className="shadow"></div>
    </div>
  );
}

export default App;
