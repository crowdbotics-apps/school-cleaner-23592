import React, { useState } from "react";
import "./Styles.scss";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
export default function DeleteModal(props) {
    return (
        <Modal className="deleteModal" open={props.open} onClose={props.onCloseModal} center>
            <div>
                <div style={{ textAlign: "center" }}>
                    <img className="deleteImage" src="assets/deleteicon.png" alt="" />
                </div>
                <div className="deleteText">
                    <p className="deleteText">Are you sure to delete {props.message}?</p>
                </div>
                <div className="deleteButtons">
                    <button type="button" className="ml-4 btn btn-primary" onClick={props.onDelete}>Delete</button>
                    <button type="button" className="ml-4 btn btn-primary" onClick={props.onCloseModal}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}