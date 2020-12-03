import React from "react";
import { GrAdd } from "react-icons/gr";
import ListItems from "./ListItems";
import TaskService from "../../services/task.service";
import "./AdminToDo.css";

export default class AdminToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      currentItem: {
        text: "",
        key: "",
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    TaskService.getAllTasks().then((response) => {
      this.setState({
        list: response.data,
      });
    });
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      TaskService.addTask(newItem).then((response) => {
        const items = [...this.state.list, response.data];
        this.setState({
          list: items,
          currentItem: {
            text: "",
            key: "",
          },
        });
      });
    }
  }

  updateItem(item) {
    TaskService.updateTask(item).then((response) => {
      const newList = this.state.list.map((itm) => {
        if (itm.id === response.data.id) {
          return response.data;
        }
        return itm;
      });
      this.setState({
        list: newList,
      });
    });
  }

  deleteItem(id) {
    TaskService.deleteTask(id);
    const items = this.state.list.filter((item) => item.id !== id);
    this.setState({
      list: items,
    });
  }

  render() {
    return (
      <div className="adminToDo">
        <form className="adminToDo__bar" onSubmit={this.addItem}>
          <input
            className="adminToDo__input"
            type="text"
            placeholder="Enter task"
            value={this.state.currentItem.text}
            onChange={this.handleInput}
          />
          <button className="adminToDo__btn" type="submit">
            <GrAdd />
          </button>
        </form>
        {/* <form id="to-do-form" onSubmit={this.addItem}>
          <input
            type="text"
            placeholder="Enter task"
            value={this.state.currentItem.text}
            onChange={this.handleInput}
          ></input>
          <button type="submit">Add</button>
        </form> */}
        <ListItems
          items={this.state.list}
          deleteItem={this.deleteItem}
          updateItem={this.updateItem}
        />
      </div>
    );
  }
}
