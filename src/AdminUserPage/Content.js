import React from "react";
import { GrClose } from "react-icons/gr";

export default function Content({ close, title, component }) {
  return (
    <div className="modal">
      <div className="modal__header">
        <span className="modal__title">{title}</span>
        <GrClose className="modal__btn" onClick={close} />
      </div>
      <div className="modal__content">{component}</div>
    </div>
  );
}
