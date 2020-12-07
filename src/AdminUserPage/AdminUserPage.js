import React from "react";
import Popup from "reactjs-popup";
import UserService from "../services/user.service";
import Content from "./Content";
import List from "./List";
import "./index.css";


export default class AdminUserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
    };
  }

  componentDidMount() {
    UserService.getAllUsers().then((response) => {
      this.setState({
        userList: response.data,
      });
    });
  }

  render() {
    return (
      <div className="page-container">
        <div className="adminToDo">
          <div className="list">
            {this.state.userList.map((user) => {
              return (
                <div key={user.id} className="list__item list__btn">
                  <Popup
                    modal
                    trigger={(open) => (
                      <span className="list__text">{user.username}</span>
                    )}
                  >
                    {(close) => (
                      <Content
                        close={close}
                        title={user.username}
                        component={<List userId={user.id}/>}
                      />
                    )}
                  </Popup>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
