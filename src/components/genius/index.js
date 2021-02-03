import React from "react";
import { connect } from "react-redux";
import { getUserList } from "../../store/reducers/chatUserReducer";
import UserCard from "../usercard";

class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList("boss");
  }
  render() {
    return <UserCard userlist={this.props.state.userlist}></UserCard>;
  }
}
const mapStateToProps = (state) => {
  return {
    state: state.chatUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (type) => {
      dispatch(getUserList(type));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Genius);
