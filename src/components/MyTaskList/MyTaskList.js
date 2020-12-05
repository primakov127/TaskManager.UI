import React from "react";
import ListItem from "./ListItem";
import "../AdminToDoList/AdminToDo.css";

export default function MyTaskList(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return <ListItem key={item.id} item={item} grabTask={props.grabTask} />;
  });

  return (
    <div className="list">
        {listItems}
    </div>
  );
}
