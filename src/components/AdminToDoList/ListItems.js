import React from "react";
import { GrEdit } from "react-icons/gr";
import FlipMove from "react-flip-move";
import ListItem from './ListItem';

import "./AdminToDo.css";

export default function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      // <div className="list__item" key={item.id}>
      //   <input
      //     className="list__input"
      //     type="text"
      //     id={item.id}
      //     value={item.text}
      //   />
      //   <div className="list__btn">
      //     {/* <FontAwesome
      //       // className="faicons"
      //       //icon="trash"
      //       // className="free-solid-svg-icons"
      //       name="trash"
      //       onClick={() => props.deleteItem(item.id)}
      //     /> */}
      //     <GrEdit />
      //   </div>
      // </div>
      <ListItem key={item.id} id={item.id} text={item.text} deleteItem={props.deleteItem} updateItem={props.updateItem}/>
    );
  });

  return (
    <div className="list">
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}
