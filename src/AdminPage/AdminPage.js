import React from "react";
import UserService from "../services/user.service";

import AdminToDo from "../components/AdminToDoList";

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="page-container">
        <AdminToDo />
      </div>
    );
  }
}
