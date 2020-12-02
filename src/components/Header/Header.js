import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import "./Header.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.changeNavMenu = this.changeNavMenu.bind(this);

    this.state = {
      isNavMenu: false,
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

  changeNavMenu() {
    this.setState({
      isNavMenu: !this.state.isNavMenu,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <header>
        <div className="header__logo">
          <p>Task manager</p>
        </div>
        <nav>
          <div className="nav-bar">
            <Link
              className={
                "nav-bar__link" +
                (this.state.isNavMenu ? " nav-bar__link_responsive" : "")
              }
              to={"/home"}
            >
              Home
            </Link>
            {currentUser && (
              <Link
                className={
                  "nav-bar__link" +
                  (this.state.isNavMenu ? " nav-bar__link_responsive" : "")
                }
                to={"/user"}
              >
                My Tasks
              </Link>
            )}
            {currentUser && (
              <Link
                className={
                  "nav-bar__link" +
                  (this.state.isNavMenu ? " nav-bar__link_responsive" : "")
                }
                href="#"
              >
                Task List
              </Link>
            )}
            {showAdminBoard && (
              <Link
                className={
                  "nav-bar__link" +
                  (this.state.isNavMenu ? " nav-bar__link_responsive" : "")
                }
                to={"/admin"}
              >
                Admin Panel
              </Link>
            )}
            <span className="nav-bar__icon" onClick={this.changeNavMenu}>
              &#9776;
            </span>
          </div>
        </nav>

        {currentUser ? (
          <div className="header__right">
            <span>Welcome,
                <Link className="header__link" to={"/profile"}>{currentUser.username}</Link>!
            </span>
            <a
              className="header__btn"
              href="/login"
              onClick={this.props.logOut}
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="header__right">
            <Link className="header__btn" to={"/login"}>
              Sign in
            </Link>
            <Link className="header__btn" to={"register"}>
              Sign up
            </Link>
          </div>
        )}
      </header>
    );
  }
}
