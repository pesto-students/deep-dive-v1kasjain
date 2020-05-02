import React, { useEffect, useRef } from "react";
import "./Modal.css";

const ModalHeader = ({ headingText, onClose }) => {
  return (
    <div className="modalHeader">
      <h3>{headingText}</h3>
      <button onClick={onClose} className="modalCloseBtn">
        x
      </button>
    </div>
  );
};

const Modal = props => {
  const ref = useRef(null);

  useEffect(() => {
    const onEscape = e => {
      if (props.shouldCloseOnEsc) {
        return true;
      }
      if (e.keyCode === 27) {
        props.onClose(e.target.value);
      }
    };
    const detectOnEscape = e => {
      if (e.keyCode === 27) {
        onEscape(e);
      }
    };

    document.addEventListener("keydown", detectOnEscape);
    return () => {
      document.removeEventListener("keydown", detectOnEscape);
    };
  });

  if (!props.modalVisibility) {
    return null;
  }

  const onClose = e => {
    props.onClose(e.target.value);
  };
  return (
    <div className="modalWrapper" tabIndex="-1">
      <div tabIndex="0"></div>
      {props.showHeader ? (
        <div ref={ref} className="modal">
          <ModalHeader
            onClose={onClose}
            headingText={props.headingText ? props.headingText : ""}
          />
          <div className="modalBody">{props.children}</div>
        </div>
      ) : (
        <div ref={ref} className="modal">
          <div className="modalBody">
            <button
              onClick={onClose}
              value={props.modalName}
              className="modalCloseBtn"
            >
              x
            </button>
            {props.children}
          </div>
        </div>
      )}
      <div tabIndex="0"></div>
    </div>
  );
};

export default Modal;
