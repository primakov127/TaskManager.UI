import React from "react";
import { GrHalt } from "react-icons/gr";

export default function ListItem(props) {
  return (
    <div className="list__item">
      <span className="list__text">{props.item.text}</span>
      <div className="list__btn" onClick={() => props.grabTask(props.item)}>
        <GrHalt />
      </div>
    </div>
  );
}
