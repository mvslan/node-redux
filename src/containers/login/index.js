import React, { useState } from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import Logo from "../../components/logo";
import { login } from "../../store/reducers/authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const authState = props.state;
  const [state, setState] = useState({
    user: "",
    pwd: "",
  });
  function handleChange(key, value) {
    let _state = { ...state };
    _state[key] = value;
    setState(_state);
  }
  function register() {
    props.history.push("/register");
  }
  function handleLogin() {
    props.login(state);
  }

  return (
    <div>
      <Logo />
      {authState.redirectTo ? (
        <Redirect to={authState.redirectTo}></Redirect>
      ) : null}
      <WingBlank>
        <List>
          {authState.msg ? <p className="error-msg">{authState.msg}</p> : null}
          <InputItem onChange={(v) => handleChange("user", v)}>用户</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={(v) => handleChange("pwd", v)}>
            密码
          </InputItem>
        </List>
        <WhiteSpace />
        <Button onClick={handleLogin} type="primary">
          登录
        </Button>
        <WhiteSpace />
        <Button onClick={register} type="primary">
          注册
        </Button>
      </WingBlank>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (userInfo) => {
      dispatch(login(userInfo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
