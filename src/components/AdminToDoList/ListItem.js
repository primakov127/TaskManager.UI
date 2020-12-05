import React from "react";
import { GrEdit } from "react-icons/gr";
import { GrTrash } from "react-icons/gr";
import { GrCheckmark } from "react-icons/gr";
import { GrClose } from "react-icons/gr";

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.changeView = this.changeView.bind(this);

    this.state = {
      isEdited: false,
      editedText: props.text,
    };
  }

  changeView() {
    this.setState({
      isEdited: !this.state.isEdited,
      editedText: this.props.text,
    });
  }

  updateItem() {
    if (
      this.state.editedText !== "" &&
      this.state.editedText !== this.props.text
    ) {
      this.props.updateItem({ id: this.props.id, text: this.state.editedText });
    }
    this.changeView();
  }

  handleInput(e) {
    this.setState({
      editedText: e.target.value,
    });
  }

  render() {
    return this.state.isEdited ? (
      <div className="list__item">
        <input
          className="list__input"
          type="text"
          value={this.state.editedText}
          onChange={this.handleInput}
        />
        <div
          className="list__btn"
          onClick={() => {
            this.updateItem();
          }}
        >
          <GrCheckmark />
        </div>
        <div className="list__btn" onClick={this.changeView}>
          <GrClose />
        </div>
      </div>
    ) : (
      <div className="list__item">
        <span className="list__text">{this.props.text}</span>
        <div className="list__btn" onClick={this.changeView}>
          <GrEdit />
        </div>
        <div
          className="list__btn"
          onClick={() => this.props.deleteItem(this.props.id)}
        >
          <GrTrash />
        </div>
      </div>
    );
  }
}
