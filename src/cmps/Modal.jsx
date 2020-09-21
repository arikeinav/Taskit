import React from "react";

export class Modal extends React.Component {
  
  render() {
    const { children } = this.props;
    
    return (
      <div className={`modal-wrapper ${this.props.show ? "" : "hide"}`} >
        <div
          className="modal-content flex
column
justify-center
align-center"
          onClick={(ev) => ev.stopPropagation()}
        >
          {children}
         
        </div>
      </div>
    );
  }
}
