import React, { useEffect } from "react";
import { connect } from "react-redux";
import {} from "../../store/actions/authAction";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { loadData } from "../../store/reducers/authReducer";

// @withRouter
const AuthRoute = (props) => {
  useEffect(() => {
    const publicList = ["/login", "/register"];
    const pathname = props.location.pathname;
    if (publicList.indexOf(pathname) !== -1) {
      return null;
    } else {
      axios.get("/user/info").then((res) => {
        if (res.status == 200) {
          if (res.data.code == 0) {
            props.loadData(res.data.data);
          } else {
            props.history.push("/login");
          }
        }
      });
    }
  }, []);
  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (userinfo) => {
      dispatch(loadData(userinfo));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
);
