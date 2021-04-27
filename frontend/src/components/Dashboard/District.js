import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteDistrict, fetchDistricts } from '../../modules/actions/DistrictActions';
import { getDistricEmployees } from '../../modules/actions/AdminActions';
import arrorRight from "../../assets/images/arrow-right.svg";
import district from "../../assets/images/district.png";
import dottenIcon from "../../assets/images/dotted-icon.svg";
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "./OverviewComponents/Styles.scss";
const District = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { deleteDistrict: { loading, success, error } } = useSelector(({ district }) => district);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


  const deleteDistrictHandler = () => {
    dispatch(deleteDistrict(props.district.id));
    setOpen(false);
  };

  const showEditFormHandler = () => {
    props.onShowEditForm(props.district.id);
  }
  const style = {
    backgroundColor: '#B4DBDB'
  }

  const handleClick = () => {
    props.onEditDistrict(props.district)
  }


  const selectDistricHandler = () => {
    props.onSelectDistrict(props.district.id)
    dispatch(getDistricEmployees(props.district.id))
  }

  return (
    <React.Fragment>
      <div className="district-box"  >
        <div className="image-holder" >
          <img src={props.district.logo} alt="" className="w-100" onClick={props.handleClick} />
        </div>
        <div className="d-flex district-box-footer align-items-center px-4 w-100 py-2 justify-content-between" style={props.selected === props.district.id ? style : {}}>
          <div className="content d-flex" onClick={() => selectDistricHandler()} >
            <div className="icon" type="button" >
              <img src={arrorRight} alt="" className="image-responsive" id={props.district.id} value={props.district.id} />
            </div>
            <span>{props.district.name}</span>
          </div>
          <div className="dropdown">
            <button className="dropdown btn btn-secondary dropdown-toggle p-0" style={{ width: '25px' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={dottenIcon} alt="" className="image-responsive" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" onClick={handleClick}>Edit details</a></li>
              <li><a className="dropdown-item" data-toggle="modal" onClick={onOpenModal}>Delete district</a></li>


            </ul>

          </div>
        </div>
        {
          open ? <Modal className="deleteModal" open={open} onClose={onCloseModal} center>
            <div>
              <div style={{ textAlign: "center" }}>
                <img className="deleteImage" src="assets/deleteicon.png" alt="" />
              </div>
              <div className="deleteText">
                <p className="deleteText">Are you sure to delete district?</p>
              </div>
              <div className="deleteButtons">
                <button type="button" className="ml-4 btn btn-primary" onClick={deleteDistrictHandler}>Delete</button>
                <button type="button" className="ml-4 btn btn-primary" onClick={onCloseModal}>Cancel</button>
              </div>
            </div>
          </Modal> : null

        }
      </div>
    </React.Fragment>
  );
}

export default District;
