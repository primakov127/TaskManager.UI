import React from "react";

import ListItems from "./ListItems";
import AdminService from "../../services/admin.service";
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
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    AdminService.getTasks().then((response) => {
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
      AdminService.addTask(newItem).then((response) => {
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

  deleteItem(id) {
    AdminService.deleteTask(id);
    const items = this.state.list.filter((item) => item.id !== id);
    this.setState({
      list: items,
    });
  }

  render() {
    return (
      <div className="adminToDo">
        <form id="to-do-form" onSubmit={this.addItem}>
          <input
            type="text"
            placeholder="Enter task"
            value={this.state.currentItem.text}
            onChange={this.handleInput}
          ></input>
          <button type="submit">Add</button>
        </form>
        <ListItems items={this.state.list} deleteItem={this.deleteItem} />
      </div>
    );
  }
}
