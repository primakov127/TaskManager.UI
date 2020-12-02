import React from "react";
import { Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import AuthService from "../services/auth.service";
import ProtectedRoute from "../components/protectedRoute.component";
import Header from "../components/Header";

import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import HomePage from "../HomePage";
import ProfilePage from "../ProfilePage";
import UserPage from "../UserPage";
import AdminPage from "../AdminPage";

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <div>
        <Header logOut={this.logOut} />

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <ProtectedRoute
              path="/user"
              component={UserPage}
              allowed="ROLE_USER"
            />
            <ProtectedRoute
              path="/admin"
              component={AdminPage}
              allowed="ROLE_ADMIN"
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
