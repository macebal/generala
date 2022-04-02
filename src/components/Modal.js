import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="ui dimmer visible modals active">
      <div className="ui standar modal visible active">
        <i class="close icon"></i>
        {children}
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

const Header = ({ children }) => {
  return <div class="center aligned header">{children}</div>;
};

const Content = ({ children }) => {
  return <div className="content">{children}</div>;
};

const Actions = ({ children }) => {
  return <div class="actions">{children}</div>;
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Actions = Actions;

export default Modal;
