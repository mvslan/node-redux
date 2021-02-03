import React from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import { Switch, Route } from "react-router-dom";
import NavLinkBar from "../navlink";
import Boss from "../boss";
import Genius from "../genius";
import User from "../user";
import Msg from "../msg";

class Dashboard extends React.Component {
  componentDidMount() {
    // if (!this.props.chat.chatmsg.length) {
    //   this.props.getMsgList();
    //   this.props.recvMsg();
    // }
  }
  render() {
    const { pathname } = this.props.location;
    const user = this.props.state;
    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        hide: user.type == "genius",
      },
      {
        path: "/genius",
        text: "boss",
        icon: "job",
        title: "BOSS列表",
        component: Genius,
        hide: user.type == "boss",
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg,
      },
      {
        path: "/me",
        text: "我",
        icon: "user",
        title: "个人中心",
        component: User,
      },
    ];

    return (
      <div>
        <NavBar className="fixd-header" mode="dard">
          {
            navList.find((v) => {
              return v.path == pathname;
            }).title
          }
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map((v) => {
              return (
                <Route
                  key={v.path}
                  path={v.path}
                  component={v.component}
                ></Route>
              );
            })}
          </Switch>
        </div>

        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
