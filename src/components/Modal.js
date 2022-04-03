import ReactDOM from "react-dom";

const Modal = ({ children, active, onClose }) => {
  return ReactDOM.createPortal(
    <div className={`ui dimmer visible modals ${active && "active"}`}>
      <div className={`ui standar modal visible ${active && "active"}`}>
        <i className="close icon" onClick={onClose}></i>
        {children}
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

const Header = ({ children }) => {
  return <div className="center aligned header">{children}</div>;
};

const Content = ({ children }) => {
  return <div className="content">{children}</div>;
};

const Actions = ({ children }) => {
  return <div className="actions">{children}</div>;
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Actions = Actions;

export default Modal;
