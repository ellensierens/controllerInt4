import React from "react";
import ReactNipple from "react-nipple";
import "./style.css";

// optional: include the stylesheet somewhere in your app
import "react-nipple/lib/styles.css";

class Example extends React.Component {
  constructor({ color, className, border, socket, name, state }) {
    super();
    this.color = color;
    this.border = border;
    this.className = className;
    this.socket = socket;
    this.name = name;
    // this.state = state
  }

  // handleChangeSlider(e) {
  //   console.log('in change');
  //   console.log(e.currentTarget.value);
  //   this.socket.emit("changeServo", (e.currentTarget.value));
  //   // if(e.currentTarget.value > 90) {
  //   //   socket.emit("right", (e.currentTarget.value));
  //   // }else {
  //   //   socket.emit("left");
  //   // }
  // }
  
  render() {
    return (
      <>
        <div className={this.className}>
          <ReactNipple
            // supports all nipplejs options
            // see https://github.com/yoannmoinet/nipplejs#options
            options={{ mode: "dynamic", color: this.color }}
            // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
            style={{
              outline: this.border,
              width: "50vw",
              height: "100vh",
              // if you pass position: 'relative', you don't need to import the stylesheet
            }}
            // all events supported by nipplejs are available as callbacks
            // see https://github.com/yoannmoinet/nipplejs#start
            // onStart={
            //   () => {
            //     this.socket.emit(this.name, "stop");
            // }}
            onEnd={
              () => {
                this.socket.emit("stop", 0);
            }}
            onMove={(evt, data) => {
              console.log(data)
              console.log(data.instance.off)
              this.socket.emit(this.name, (data.instance.frontPosition));
            }}
          />
        </div>
      </>
    );
  }
}
export default Example;
