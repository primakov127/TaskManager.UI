import React from "react";
import MyTaskService from "../services/myTask.service";
import { GrCheckboxSelected } from "react-icons/gr";
import { GrCheckbox } from "react-icons/gr";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.changeCompleted = this.changeCompleted.bind(this);

    this.state = {
      taskList: [],
    };
  }

  componentDidMount() {
    MyTaskService.getAllUserTask(this.props.userId).then((response) => {
      this.setState({
        taskList: response.data,
      });
    });
  }

  changeCompleted(taskId, completed) {
    MyTaskService.updateUserTask(this.props.userId, taskId, completed).then(
      (response) => {
        const newList = this.state.taskList.map((task) => {
          if (task.id === response.data.id) {
            return response.data;
          }
          return task;
        });
        this.setState({
          taskList: newList,
        });
      }
    );
  }

  render() {
    return (
      <div className="list">
        {this.state.taskList.map((task) => {
          return (
            <div key={task.id} className="list__item">
              <span className="list__text">{task.text}</span>
              {task.completed ? (
                <div
                  onClick={() => this.changeCompleted(task.id, !task.completed)}
                >
                  <GrCheckboxSelected />
                </div>
              ) : (
                <div
                  onClick={() => this.changeCompleted(task.id, !task.completed)}
                >
                  <GrCheckbox />
                </div>
              )}
              {/* <input
                type="checkbox"
                checked={task.completed}
                onClick={() => this.changeCompleted(task.id, !task.completed)}
              /> */}
            </div>
          );
        })}
      </div>
    );
  }
}
