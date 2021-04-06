import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDistrict, fetchDistricts } from '../../modules/actions/DistrictActions';
import arrorRight from "../../assets/images/arrow-right.svg";
import district from "../../assets/images/district.png";
import dottenIcon from "../../assets/images/dotted-icon.svg";
import $ from 'jquery';

const District = props => {
  const dispatch = useDispatch();
  const { deleteDistrict: { loading, success, error } } = useSelector(({ district }) => district);
  const [dispatched, setDispatched] = useState(false);

  const deleteDistrictHandler = () => {
    dispatch(deleteDistrict(props.district.id));
  };

  const showEditFormHandler = () => {
    props.onShowEditForm(props.district.id);
  }
  const style = {
    backgroundColor: '#B4DBDB'
  }

  const handleClick = () => {
    props.onEditDistrict(props.district)
    $('#update_District').modal('show');

  }

  return (
    <React.Fragment>
      <div className="district-box">
        <div className="image-holder">
          <img src={props.district.logo} alt="" className="w-100" />
        </div> 
        <div className="d-flex district-box-footer align-items-center px-4 w-100 py-2 justify-content-between" style={ props.selected === props.district.id ? style : {}}>
          <div className="content d-flex">
            <div className="icon" type="button">
              <img src={arrorRight} alt="" className="image-responsive" id={props.district.id} value={props.district.id} onClick={props.onSelectDistrict} />
            </div>
            <span>{props.district.name}</span>
          </div>
          <div className="dropdown">
            <button className="dropdown btn btn-secondary dropdown-toggle p-0" style={{ width: '25px'}} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={dottenIcon} alt="" className="image-responsive" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" onClick={handleClick}>Edit details</a></li>
              <li><a className="dropdown-item" onClick={deleteDistrictHandler}>Delete district</a></li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default District;
