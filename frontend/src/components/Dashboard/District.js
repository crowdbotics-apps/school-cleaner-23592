import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDistrict, fetchDistricts } from '../../modules/actions/DistrictActions';
import arrorRight from "../../assets/images/arrow-right.svg";
import district from "../../assets/images/district.png";
import dottenIcon from "../../assets/images/dotted-icon.svg";


const District = props => {
  const dispatch = useDispatch();
  const { deleteDistrict: { loading, success, error } } = useSelector(({ district }) => district);
  const { fetchDistricts } = useSelector(({ district }) => district);

  useEffect(() => {
    if(success){
      dispatch(fetchDistricts())
    }
  }, [success]);

  const deleteDistrictHandler = () => {
    dispatch(deleteDistrict(props.district.id))
  };

  const showEditFormHandler = () => {
    props.onShowEditForm(props.district.id);
  }
  const style = {
    backgroundColor: '#B4DBDB'
  }

  return (
    <React.Fragment>
      <div className="district-box">
        <div className="image-holder">
          <img src={district} alt="" className="w-100" />
        </div> 
        <div className="d-flex district-box-footer align-items-center px-4 w-100 py-2 justify-content-between" style={ props.selected === props.district.id ? style : {}}>
          <div className="content d-flex">
            <div className="icon" type="button">
              <img src={arrorRight} alt="" className="image-responsive" id={props.district.id} value={props.district.id} onClick={props.onSelectDistrict} />
            </div>
            <span>{props.district.name}</span>
          </div>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={dottenIcon} alt="" className="image-responsive" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <li><p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#update_District" onClick={() => props.onEditDistrict(props.district)}>Edit details</p></li>
              <li><a className="dropdown-item" onClick={deleteDistrictHandler}>Delete district</a></li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default District;
