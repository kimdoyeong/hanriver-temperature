import React from "react";
import axios from "axios";
import Loader from "./Loader";

async function getTemp() {
  return (await axios.get("http://127.0.0.1:3001/")).data;
}

class App extends React.Component {
  state = {
    loaded: false,
    temp: 0
  };
  componentDidMount() {
    const load = () => {
      getTemp().then(temp => {
        this.setState({
          loaded: true,
          temp
        });
      });
    };
    load();
    setInterval(load, 1000 * 60 * 3);
  }
  render() {
    if (!this.state.loaded) {
      return <Loader />;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            color: "white",
            textShadow: "0 0 20px black",
            textAlign: "center"
          }}
        >
          <h3
            style={{
              fontSize: "2em"
            }}
          >
            오늘의 한강 수온
          </h3>
          <h1
            style={{
              fontSize: "4em"
            }}
          >
            {this.state.temp}°C
          </h1>
          <p>
            {parseInt(this.state.temp) <= 10
              ? "다른 날을 노리세요"
              : "오늘 딱 좋은 온도네요!"}
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -10,
            filter: "blur(5px)",
            transform: "scale(1.1)"
          }}
        >
          <video
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100vh"
            }}
            autoPlay
            loop
            muted
          >
            <source src="bubble.mp4" />
          </video>
        </div>
      </div>
    );
  }
}

export default App;
