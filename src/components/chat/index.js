import React from "react";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
import io from "socket.io-client";

const socket = io("ws://localhost:3010", {
  transports: ["websocket"],
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
socket.on("connect", () => {
  console.log("连接成功");
});
socket.on("disconnect", () => {
  console.log(socket.connected); // false
});

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
  }

  componentDidMount() {}

  handleSubmit() {
    socket.emit("sendmsg", { text: this.state.text });
    this.setState({
      text: "",
    });
  }

  render() {
    return (
      <div>
        <InputItem
          placeholder="请输入"
          value={this.state.text}
          onChange={(v) => {
            this.setState({ text: v });
          }}
        ></InputItem>
        <span onClick={() => this.handleSubmit()}>发送</span>
      </div>
    );
  }
}

export default Chat;
