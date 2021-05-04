import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch, useSelector } from 'react-redux';
import { editRoom, getSpecificRoom } from '../../../modules/actions/SectionActions';
const roomType = [
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
export default function RoomEditForm(props) {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  // const [roomDetails, setRoomDetails] = useState({ name: '', logo: '', code: '', admins: [] });
  const [roomDetails, setRoomDetails] = useState({});

  useEffect(() => {
    // dispatch(generateCode());
    // districtCodeHandler();
    // const obj = {
    //   setRoomDetails: setRoomDetails,
    //   id: props.id,
    // };
    // dispatch(getSpecificRoom(obj));
    setRoomDetails(props.roomDetail);
  }, [props.id]);

  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      const obj = {
        cleaner: parseInt(roomDetails.cleaner),
        admins: roomDetails.admins,
        code: roomDetails.code,
        desks: parseInt(roomDetails.desks),
        logo: parseInt(roomDetails.logo),
        name: roomDetails.name,
        room_type: roomDetails.room_type,
        square_feet: roomDetails.square_feet,
      };
      const sectionDetail = props.sectionDetails;
      dispatch(editRoom({ data: obj, id: props.id, sectionDetail }));
      setRoomDetails({ name: '', logo: '', code: '' });
      props.setOpenRoomEditForm(false);
      props.setRoomDetail({});
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
              <input value={roomDetails.name} type="text" className="form-control" name="name" id="floatingInput" placeholder="Room Name" onChange={handleChange} />
              <label htmlFor="name">Room Name</label>
            </div>
            <div className="form-floating mb-3 go-bottom">
              <input
                value={roomDetails.room_type}
                type="text"
                name="room_type"
                className="form-control"
                onChange={handleChange}
                list="room_type"
                required={true}
                id="floatingInput"
                placeholder="Room Type s"
              />
              <i class="fa fa-sort-desc"></i>

              <datalist id="room_type">
                {roomType?.map((item) => (
                  <option id={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </datalist>
              <label htmlFor="name">Room Type</label>
            </div>
            {/* <div className="form-floating mb-3 go-bottom">
                            <input
                                type="number"
                                className="form-control"
                                name="room_type"
                                id="room_type"
                                placeholder="Room Type"
                                onChange={handleChange}
                            />
                            <label htmlFor="room_type">Room Type</label>
                        </div> */}
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
                value={roomDetails.square_feet}
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
              <input value={roomDetails.desks} type="text" className="form-control" name="desks" id="floatingInput" placeholder="Desks " onChange={handleChange} />
              <label htmlFor="desks">Desks</label>
            </div>
            <div className="form-floating mb-3 go-bottom">
              <input
                value={roomDetails.estimated_time_to_clean}
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
            <button type="button" className="ml-4 btn btn-primary" onClick={submitHandler}>
              Update
            </button>
            <button type="button" className="ml-4 btn btn-primary" onClick={props.onCloseModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
