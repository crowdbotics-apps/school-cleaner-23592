import React from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
export default function SchoolEdit(props) {
    return (
        <Modal className="deleteModal" center open={props.open} onClose={props.onCloseModal}>
            <div>
                <div className="deleteText">
                    <p className="deleteText">Edit School details</p>
                </div>
                <div className="deleteButtons">
                    <button type="button" className="ml-4 btn btn-primary">Update</button>
                    <button type="button" className="ml-4 btn btn-primary" onClick={props.onCloseModal}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}