import React from "react";

export class Modal extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="modal-wrapper" onClick={this.props.onClose}>
        <div
          className={` ${
            !this.props.isForLog ? "modal-content" : "login-modal"
          } flex column  align-center`}
          onClick={(ev) => ev.stopPropagation()}
        >
          {children}

          {this.props.isForLog && this.props.onLoginHere && (
            <p>
              Already have an account?{" "}
              <span onClick={this.props.onLoginHere}>login here</span>
            </p>
          )}
        </div>
      </div>
    );
  }
}
