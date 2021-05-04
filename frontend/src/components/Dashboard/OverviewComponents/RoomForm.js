import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { createRoom } from '../../../modules/actions/SectionActions';

const roomsType = [
  {
    id: 1,
    name: 'Small classroom',
  },
  {
    id: 2,
    name: 'Medium classroom',
  },
  {
    id: 3,
    name: 'Large classroom',
  },
  {
    id: 4,
    name: 'Single bathroom',
  },
  {
    id: 5,
    name: 'Double bathroom',
  },
  {
    id: 6,
    name: 'Triple bathroom',
  },
  {
    id: 7,
    name: 'Quad bathroom',
  },
  {
    id: 8,
    name: 'Hallway',
  },
  {
    id: 9,
    name: 'Cafeteria',
  },
  {
    id: 10,
    name: 'Kitchen',
  },
  {
    id: 11,
    name: 'Office',
  },
  {
    id: 12,
    name: 'Gym',
  },
  {
    id: 13,
    name: 'Auditorium',
  },
  {
    id: 14,
    name: 'Locker room',
  },
];
const RoomForm = (props) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [roomDetail, setRoomDetail] = useState({ name: '' });
  const [closeModal, setCloseModal] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      console.log('form value', roomDetail);
      const obj = {
        roomDetail: roomDetail,
        sectionDetails: props.sectionDetails,
        school: props.school,
        district: props.district,
      };
      await dispatch(createRoom(obj));
      await props.fetchSection();
      // setSectionDetail({ name: '' });
      props.onCloseModal();
      setCloseModal(true);
    } else {
      setValidated(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    // console.log(value);
    setRoomDetail({ ...roomDetail, [name]: value });
  };
  return (
    <Modal className="deleteModal" center open={props.open} onClose={props.onCloseModal}>
      <div className="modal-holder">
        <div className="modal-dialog">
          <div style={{ border: 'none' }} className="modal-content">
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <h2 className="modal-title mb-4" id="add_sectionLabel">
                  Add Room
                </h2>
                <div className="mb-4">
                  <div className="form-floating mb-3 go-bottom">
                    <input type="text" className="form-control" name="name" required={true} id="floatingInput" placeholder="Room Name" onChange={handleChange} />
                    <label htmlFor="name">Room Name</label>
                  </div>
                  <div className="form-floating mb-3 go-bottom">
                    {/* <input
                      type="text"
                      name="room_type"
                      className="form-control"
                      onChange={handleChange}
                      list="room_type"
                      required={true}
                      id="floatingInput"
                      placeholder="Room Type"
                    />
                    <i class="fa fa-sort-desc"></i> */}

                    <select name="room_type" className="form-control" list="room_type" onChange={handleChange} id="room_type">
                      <option hidden selected></option>
                      {roomsType?.map((item) => (
                        <option id={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="name">Room Type</label>
                  </div>
                  <div className="form-floating mb-3 go-bottom">
                    <input type="text" name="section" className="form-control" onChange={handleChange} list="sections" required={true} id="floatingInput" placeholder=" Section" />
                    <i class="fa fa-sort-desc"></i>

                    <datalist id="sections">
                      {props?.sections?.map((item) => (
                        <option id={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </datalist>
                    <label htmlFor="name">Section</label>
                  </div>
                  <div className="form-floating mb-3 go-bottom">
                    <input type="text" className="form-control" name="square_feet" required={true} id="floatingInput" placeholder="Room Area (Sq. ft.)" onChange={handleChange} />
                    <label htmlFor="name">Room Area (Sq. ft.)</label>
                  </div>
                  <div className="form-floating mb-3 go-bottom">
                    <input type="text" className="form-control" name="desks" required={true} id="floatingInput" placeholder="Desk" onChange={handleChange} />
                    <label htmlFor="name">Desk</label>
                  </div>
                  {/* <div className="form-floating mb-3 go-bottom">
                    <input type="text" className="form-control" name="windows" required={true} id="floatingInput" placeholder="Windows" onChange={handleChange} />
                    <label htmlFor="name">Windows</label>
                  </div> */}
                  {/* <div className="form-floating mb-3 go-bottom">
                    <input type="number" className="form-control" name="room_type" required={true} id="floatingInput" placeholder="Room Type" onChange={handleChange} />
                    <label htmlFor="name">Room Type</label>
                  </div> */}

                  {/* <div className="form-floating mb-3 go-bottom">
                    <input
                      type="number"
                      className="form-control"
                      name="estimated_time_to_clean"
                      required={true}
                      id="floatingInput"
                      placeholder="Estimated Time To Clean"
                      onChange={handleChange}
                    />
                    <label htmlFor="name">Estimated Time To Clean</label>
                  </div> */}
                </div>
                <button type="submit" className="btn btn-primary text-uppercase">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default RoomForm;
