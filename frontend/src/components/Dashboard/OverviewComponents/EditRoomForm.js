import React, { useEffect, useState } from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch, useSelector } from 'react-redux';
import { editRoom } from '../../../modules/actions/SectionActions';
export default function RoomEditForm(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(generateCode());
        // districtCodeHandler();
    }, []);


    const [validated, setValidated] = useState(false);
    const [roomDetails, setRoomDetails] = useState({ name: '', logo: '', code: '', admins: [] });

    const submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(editRoom({ data: roomDetails, id: props.id }))
            setRoomDetails({ name: '', logo: '', code: '' })
            props.setOpenRoomEditForm(false)
        } else {
            setValidated(true);
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        setRoomDetails({ ...roomDetails, [name]: value });
    };
    return (
        <Modal className="deleteModal" center open={props.open} onClose={props.onCloseModal}>
            <div>
                <div className="deleteText">
                    <p className="deleteText">Edit Room details</p>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <div className="form-floating mb-3 go-bottom">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="floatingInput"
                                placeholder="Room Name"
                                onChange={handleChange}
                            />
                            <label htmlFor="name">Room Name</label>
                        </div>
                        <div className="form-floating mb-3 go-bottom">
                            <input
                                type="number"
                                className="form-control"
                                name="room_type"
                                id="room_type"
                                placeholder="Room Type"
                                onChange={handleChange}
                            />
                            <label htmlFor="room_type">Room Type</label>
                        </div>
                        <div className="form-floating mb-3 go-bottom">
                            <input
                                type="number"
                                className="form-control"
                                value={props?.sectionDetails?.id}
                                name="square_feet"
                                id="floatingInput"
                                placeholder="Section "
                                onChange={handleChange}
                            />
                            <label htmlFor="square_feet">Section</label>
                        </div>
                        <div className="form-floating mb-3 go-bottom">
                            <input
                                type="text"
                                className="form-control"
                                name="square_feet"
                                id="floatingInput"
                                placeholder="Room Area(Sq. ft.)"
                                onChange={handleChange}
                            />
                            <label htmlFor="square_feet">Room Area(Sq. ft.)</label>
                        </div>
                        <div className="form-floating mb-3 go-bottom">
                            <input
                                type="text"
                                className="form-control"
                                name="desks"
                                id="floatingInput"
                                placeholder="Desks "
                                onChange={handleChange}
                            />
                            <label htmlFor="desks">Desks</label>
                        </div>
                        <div className="form-floating mb-3 go-bottom">
                            <input
                                type="number"
                                className="form-control"
                                name="cleaner"
                                id="floatingInput"
                                placeholder="Cleaner "
                                onChange={handleChange}
                            />
                            <label htmlFor="cleaner">Cleaner</label>
                        </div>

                    </div>
                    <div className="deleteButtons">
                        <button type="button" className="ml-4 btn btn-primary" onClick={submitHandler}>Update</button>
                        <button type="button" className="ml-4 btn btn-primary" onClick={props.onCloseModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}