import React, { useState, useEffect } from "react";
import Fullscreen from "react-full-screen";
import socketIOClient from "socket.io-client";
import Example from "./Example";
import "./reset.css";
import "./style.css";

const ENDPOINT = "https://evening-caverns-60077.herokuapp.com/";
// const ENDPOINT = "http://127.0.0.1:8081";

function App() {
  // let fullScreenRef = useRef(null);
  let [fullScreenMode, setfullScreenMode] = useState(false);
  let [connected, setConnected] = useState(undefined);
  let [inverted, setInverted] = useState(false);

  const socket = socketIOClient(ENDPOINT);
  // const [response, setResponse] = useState("");

  useEffect(() => {
    const onChange = () => {
      console.log("in change");
      if (document.hidden) {
        console.log("blurred");
        if (connected) {
          // socket.disconnect();
          socket.emit("blurred");
          setConnected(false);
        }
      } else {
        console.log("focus");
      }
    };

    document.addEventListener("visibilitychange", onChange);

    // const socket = socketIOClient(ENDPOINT);
    // console.log(document.body.div)
    // document.body.requestFullscreen();
    socket.on("connected", (status) => {
      console.log("connected");
      setConnected(status);
      console.log(status);
    });

    if (connected === undefined) {
      // console.log("controllerConnected emit")
      socket.emit("controllerConnected");
    }

    return () => {
      // socket.disconnect();
      document.removeEventListener("visibilitychange", onChange);
    };

    //   // setfullScreenMode(!fullScreenMode);
  }, [connected, socket]);

  const fullScreenToggler = () => {
    setfullScreenMode(!fullScreenMode);
  };

  const changeLayout = () => {
    setInverted(!inverted);
  };

  const nipple1 = `nipple1 ${inverted ? "left" : "right"}`;
  const nipple2 = `nipple2 ${inverted ? "right" : "left"}`;

  if (connected) {
    if(inverted){
      return (
        <>
          {console.log(inverted)}
          {console.log(nipple1, nipple2)}
          <div className="landscape">
            <Fullscreen enabled={fullScreenMode}>
              {/* <div onLoad={fullScreenToggler}> */}
              <button className="fullscreen__button" onClick={fullScreenToggler}>
                FullScreen
              </button>
              {/* <p>{layout}</p> */}
              <button
                className="fullscreen__button layout__button"
                onClick={changeLayout}
              >
                change layout
              </button>
              <div className="wifi__container">
                <img
                  alt="wifi icon"
                  className="wifi"
                  src="./assets/wifi.svg"
                ></img>
              </div>
              <Example
                className={"nipple1 left"}
                color={"#00204B"}
                border={"none"}
                socket={socket}
                name={"cameraControls"}
                // state={state}
              />
  
              <Example
                className={"nipple2 right"}
                // className={layout === "left" ? "left nipple2" : "right nipple2"}
                color={"#FFB400"}
                border={"none"}
                socket={socket}
                name={"carControls"}
                // state={state === "left"? "right" : "left"}
              />
  {console.log(nipple1, nipple2)}
              {/* </div> */}
            </Fullscreen>
          </div>
          <div className="portrait">
            <img alt="turn" src="/assets/turn.svg" />
            <p className="portrait__tekst">turn your phone</p>
          </div>
        </>
        // TODO: input eventlistener 'input' needs to trigger emit to server
      );
    } else {
      return (
        <>
          {console.log(inverted)}
          {console.log(nipple1, nipple2)}
          <div className="landscape">
            <Fullscreen enabled={fullScreenMode}>
              {/* <div onLoad={fullScreenToggler}> */}
              <button className="fullscreen__button" onClick={fullScreenToggler}>
                FullScreen
              </button>
              {/* <p>{layout}</p> */}
              <button
                className="fullscreen__button layout__button"
                onClick={changeLayout}
              >
                change layout
              </button>
              <div className="wifi__container">
                <img
                  alt="wifi icon"
                  className="wifi"
                  src="./assets/wifi.svg"
                ></img>
              </div>
              <Example
                className={"nipple1 right"}
                color={"#00204B"}
                border={"none"}
                socket={socket}
                name={"cameraControls"}
                // state={state}
              />
  
              <Example
                className={"nipple2 left"}
                // className={layout === "left" ? "left nipple2" : "right nipple2"}
                color={"#FFB400"}
                border={"none"}
                socket={socket}
                name={"carControls"}
                // state={state === "left"? "right" : "left"}
              />
              {/* </div> */}
            </Fullscreen>
          </div>
          <div className="portrait">
            <img alt="turn" src="/assets/turn.svg" />
            <p className="portrait__tekst">turn your phone</p>
          </div>
        </>
        // TODO: input eventlistener 'input' needs to trigger emit to server
      );
    }
    
  } else if (connected === false) {
    return (
      <div className="container">
        <p className="status">Looks like someone else is driving.</p>
        <button
          className="refresh"
          onClick={() => window.location.reload(false)}
        >
          try again
        </button>
      </div>
    );
  } else if (connected === undefined) {
    return (
      <div className="container">
        <p className="status">loading</p>
      </div>
    );
  }
}

export default App;
