import React, { useState } from "react";
import Fullscreen from "react-full-screen";
import socketIOClient from "socket.io-client";
import Example from "./Example";
import "./reset.css";
import "./style.css";

const ENDPOINT = "https://evening-caverns-60077.herokuapp.com/";
// const ENDPOINT = "http://127.0.0.1:8081";

function App() {

  // let fullScreenRef = useRef(null);
  let [fullScreenMode, setfullScreenMode]= useState(false);

  const socket = socketIOClient(ENDPOINT);
  // const [response, setResponse] = useState("");

  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
    // console.log(document.body.div)
    // document.body.requestFullscreen();
    // socket.on("coords", (data) => {
    //   console.log(data);
    //   console.log(data.longitude);
    //   console.log(data.latitude);
    // });
    socket.emit("controllerConnected");

    // setfullScreenMode(!fullScreenMode);
  }, []);

  const fullScreenToggler = () => {
    setfullScreenMode(!fullScreenMode);
  }


  return (
    <>
    <Fullscreen enabled={fullScreenMode}>
    {/* <div onLoad={fullScreenToggler}> */}
      <button className="fullscreen__button" onClick={fullScreenToggler}>
             FullScreen Mode
          </button>
      <div className="wifi__container">
        <img alt="wifi icon" className="wifi" src="./assets/wifi.svg" ></img>
      </div>
      {/* <button onClick={(e) => goFullScreen()}> enable full screen </button> */}
      {/* <p> */}
      {/* It's <time dateTime={response}>{response}</time> */}
      {/* </p> */}
      {/* <input type="range" min="78" max="102" onInput={handleChangeSlider}></input> */}
      <Example
        className={"nipple1"}
        color={"#00204B"}
        border={"none"}
        socket={socket}
        name={"cameraControls"}
      />
      <Example
        className={"nipple2"}
        color={"#FFB400"}
        border={"none"}
        socket={socket}
        name={"carControls"}
      />
    {/* </div> */}
    </Fullscreen>
    </>
    // TODO: input eventlistener 'input' needs to trigger emit to server
  );
}

export default App;
