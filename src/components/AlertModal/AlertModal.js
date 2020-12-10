import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
} from "mdbreact";
import "./AlertModel.css";

// Modal Window to display success and failure messages - Currently used while adding items to the cart

function AlertModal({ showModal, hideModal }) {
  return (
    <MDBContainer>
      <MDBModal isOpen={showModal.show} toggle={hideModal} size="sm" centered>
        <MDBModalHeader>
          {showModal.messageType === "success" ? (
            <MDBIcon icon="check-circle" className="green-text pr-3" />
          ) : (
            <MDBIcon icon="times-circle" className="amber-text pr-3" />
          )}
          <strong>{showModal.title}</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <h6 className="black-text">{showModal.message}</h6>
        </MDBModalBody>
        <MDBModalFooter>
          {showModal.messageType === "success" ? (
            <MDBBtn
              className="black-text"
              onClick={hideModal}
              style={{ borderRadius: "5px", fontSize: "10px" }}
            >
              Close
            </MDBBtn>
          ) : (
            <MDBBtn
              className="black-text"
              color="warning"
              onClick={hideModal}
              style={{ borderRadius: "5px", fontSize: "10px" }}
            >
              Close
            </MDBBtn>
          )}
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}

export default AlertModal;
