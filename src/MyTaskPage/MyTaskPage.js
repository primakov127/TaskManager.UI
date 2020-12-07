import React from "react";
import { GrClose } from "react-icons/gr";
import MyTaskService from "../services/myTask.service";

export default class MyTaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    MyTaskService.getAllMyTasks().then((response) => {
      this.setState({
        list: response.data,
      });
    });
  }

  deleteTask(taskId) {
    MyTaskService.deleteTask(taskId).then((response) => {
      const newList = this.state.list.filter((task) => task.id !== taskId);
      this.setState({
        list: newList,
      });
    });
  }

  render() {
    return (
      <div className="page-container">
        <div className="adminToDo">
          <div className="list">
            {this.state.list.map((item) => {
              return (
                <div key={item.id} className="list__item">
                  {item.completed ? (
                    <span className="list__text list__text_crossed">
                      {item.text}
                    </span>
                  ) : (
                    <span className="list__text">{item.text}</span>
                  )}
                  <div
                    className="list__btn"
                    onClick={() => {
                      this.deleteTask(item.id);
                    }}
                  >
                    <GrClose />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
