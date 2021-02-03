import React, { useState } from "react";
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio,
} from "antd-mobile";
import Logo from "../../components/logo";
import { connect } from "react-redux";
import { register } from "../../store/reducers/authReducer";
import { Redirect } from "react-router-dom";

const RadioItem = Radio.RadioItem;
const Register = (props) => {
  const authState = props.state;
  const [state, setState] = useState({
    user: "",
    pwd: "",
    repeatPwd: "",
    type: "boss",
  });
  function handleChange(key, value) {
    let _state = { ...state };
    _state[key] = value;
    setState(_state);
  }
  function register() {
    props.register(state);
  }
  return (
    <div>
      <Logo></Logo>
      {authState.redirectTo ? (
        <Redirect to={authState.redirectTo}></Redirect>
      ) : null}
      <List>
        {authState.msg ? <p className="error-msg">{authState.msg}</p> : null}
        <InputItem onChange={(v) => handleChange("user", v)}>用户名</InputItem>
        <WhiteSpace />
        <InputItem type="password" onChange={(v) => handleChange("pwd", v)}>
          密码
        </InputItem>
        <WhiteSpace />
        <InputItem
          type="password"
          onChange={(v) => handleChange("repeatPwd", v)}
        >
          确认密码
        </InputItem>
        <WhiteSpace />
        <RadioItem
          checked={state.type === "genius"}
          onChange={() => handleChange("type", "genius")}
        >
          牛人
        </RadioItem>
        <RadioItem
          checked={state.type === "boss"}
          onChange={(v) => handleChange("type", "boss")}
        >
          BOSS
        </RadioItem>
        <WhiteSpace />
        <Button type="primary" onClick={register}>
          注册{" "}
        </Button>
      </List>
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
    register: (userInfo) => {
      dispatch(register(userInfo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
