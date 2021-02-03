import React from "react";
import { connect } from "react-redux";
import { Result, List, Brief, WhiteSpace, Modal } from "antd-mobile";
import browserCookie from "browser-cookies";
import { logoutSubmit } from "../../store/reducers/authReducer";
import { Redirect } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    console.log("logout");
    const alert = Modal.alert;

    alert("注销", "确认退出登录吗???", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确认",
        onPress: () => {
          browserCookie.erase("userid");
          this.props.logoutSubmit();
        },
      },
    ]);
  }
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    console.log(props);
    const user = props.state;
    return user.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../../img/${user.avatar}.png`).default}
              style={{ width: 50 }}
              alt=""
            />
          }
          title={user.user}
          message={user.type == "boss" ? user.company : null}
        />

        <List renderHeader={() => "简介"}>
          <Item multipleLine>
            {user.title}
            {user.desc.split("\n").map((v, index) => (
              <Brief key={index}>{v}</Brief>
            ))}
            {user.money ? <Brief>薪资:{user.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : (
      <Redirect to={user.redirectTo} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutSubmit: () => {
      dispatch(logoutSubmit());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
