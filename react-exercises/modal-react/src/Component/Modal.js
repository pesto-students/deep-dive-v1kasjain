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
    if (props.modalVisibility) {
      ref.current.focus();
    }

    const handleEscapePress = e => {
      if (e.keyCode === 27) {
        if (props.shouldCloseOnEsc === false) {
          return true;
        } else {
          props.onClose(e.target.value);
        }
      }
    };

    const handleOverlayClick = e => {
      e.preventDefault();
      if (props.shouldCloseOnOverlay === false) {
        return true;
      } else {
        if (ref.current && !ref.current.contains(e.target)) {
          props.onClose(props.modalName);
        }
      }
    };

    document.addEventListener("keyup", handleEscapePress);
    document.addEventListener("click", handleOverlayClick, true);
    return () => {
      document.removeEventListener("keyup", handleEscapePress);
      document.removeEventListener("click", handleOverlayClick, true);
    };
  });

  if (!props.modalVisibility) {
    return null;
  }

  const onClose = e => {
    props.onClose(props.modalName);
  };

  return (
    <div className="modalWrapper">
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
    </div>
  );
};

export default Modal;
