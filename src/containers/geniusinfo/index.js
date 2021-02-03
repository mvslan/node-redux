import React from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelector from "../../components/avatar-selector";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { update } from "../../store/reducers/authReducer";

class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
    };
  }
  onChange(key, val) {
    this.setState({
      [key]: val,
    });
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.state.redirectTo;
    console.log(redirect);
    return (
      <div>
        {redirect && redirect !== path ? (
          <Redirect to={this.props.redirectTo}></Redirect>
        ) : null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={(imgname) => {
            this.setState({
              avatar: imgname,
            });
          }}
        ></AvatarSelector>
        <InputItem onChange={(v) => this.onChange("title", v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={(v) => this.onChange("desc", v)}
          rows={3}
          autoHeight
          title="个人见解"
        ></TextareaItem>
        <Button
          onClick={() => {
            this.props.update(this.state);
          }}
          type="primary"
        >
          保存
        </Button>
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
  return {
    update: (userInfo) => {
      dispatch(update(userInfo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GeniusInfo);
