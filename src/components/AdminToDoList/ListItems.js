import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlipMove from "react-flip-move";

import "./AdminToDo.css";

export default function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className="listItem" key={item.id}>
        <div className="btn">
          <FontAwesomeIcon
            className="faicons"
            icon="trash"
            onClick={() => props.deleteItem(item.id)}
          />
        </div>
        <div className="wide">
          <input type="text" id={item.id} value={item.text} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}
