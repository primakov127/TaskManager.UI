import React from "react";
import UserService from "../services/user.service";
import MyTaskService from "../services/myTask.service";
import TaskService from "../services/task.service";
import MyTasksList from "../components/MyTaskList";

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.grabTask = this.grabTask.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      content: "",
      list: [],
      searchText: "",
    };
  }

  componentDidMount() {
    TaskService.getAllTasks().then((response) => {
      this.setState({
        list: response.data,
      });
    });
    UserService.getUserBoard().then(
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

  handleInput(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  grabTask(task) {
    MyTaskService.addTask(task);
  }


  render() {
    const filteredList = this.state.searchText.length === 0 ? this.state.list :
    this.state.list.filter(task => task.text.toLowerCase().includes(this.state.searchText.toLowerCase()))

    return (
      <div className="page-container">
        <div className="adminToDo">
          <form className="adminToDo__bar" onSubmit={this.getTasksByText}>
            <input
              className="adminToDo__input"
              type="text"
              value={this.state.searchText}
              onChange={this.handleInput}
              placeholder="Search task"
            />
          </form>

          {/* <MyTasksList items={this.state.list} grabTask={this.grabTask} /> */}
          <MyTasksList items={filteredList} grabTask={this.grabTask} />
        </div>
      </div>
    );
  }
}
