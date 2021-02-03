import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducer } from "./store";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Login from "./containers/login";
import Register from "./containers/register";
import AuthRoute from "./components/authRoute";
import DashBoard from "./components/dashBoard";
import Boss from "./containers/bossinfo";
import GeniusInfo from "./containers/geniusinfo";
import Chat from "./components/chat";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
      </div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/bossinfo" component={Boss} />
        <Route path="/geniusinfo" component={GeniusInfo} />
        <Route path="/chat/:user" component={Chat} />

        <Route component={DashBoard} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
