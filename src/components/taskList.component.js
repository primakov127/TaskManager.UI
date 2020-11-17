import React from "react";
import UserService from "../services/user.service";

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    UserService.getAllTasks().then((response) => {
      this.setState({
        list: response.data,
      });
    });
  }

  render() {
    const list = this.state.list;

    return (
      <ul className="list-group">
        {list &&
          list.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.text}
            </li>
          ))}
      </ul>
    );
  }
}
