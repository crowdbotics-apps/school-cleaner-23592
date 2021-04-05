import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import errorIcon from "../../assets/images/error-icon.svg";
import deleteIcon from "../../assets/images/delete-icon.svg";
import plusIcon from "../../assets/images/plus-icon.svg";



const DistrictInformation = props => {

  const { districts: { loading, success, error, data }} = useSelector(({ district }) => district);
  const [ currentDistrict, setCurrentDistrict ] = useState(null)
  const [ currentTab, setCurrentTab ] = useState('Overview');

  const setDistrict = district => {
    setCurrentDistrict(district)
  };

  useEffect(() => {
    setDistrict(props.district);
  }, [props]);


  const Overview = () => {
    return (
      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="Overview">
          <ul className="p-0">
            <li className="border-bottom d-flex justify-content-between px-3 py-3">
              <div className="name">
                <span>District name</span>
              </div>
              <div className="value">
                <span>{currentDistrict.name}</span>
              </div>
            </li>
            <li className="border-bottom d-flex justify-content-between px-3 py-3">
              <div className="name">
                <span>District code</span>
              </div>
              <div className="value">
                <span>{currentDistrict.code}</span>
              </div>
            </li>
            <li className="border-bottom d-flex justify-content-between px-3 py-3">
              <div className="name">
                <span>Buildings</span>
              </div>
              <div className="value">
                <span>18</span>
              </div>
            </li>
            <li className="border-bottom d-flex justify-content-between px-3 py-3">
              <div className="name">
                <span>Rooms</span>
              </div>
              <div className="value">
                <span>157</span>
              </div>
            </li>
            <li className="border-bottom d-flex justify-content-between px-3 py-3">
              <div className="name">
                <span>Sq. ft.</span>
              </div>
              <div className="value">
                <span>341</span>
              </div>
            </li>
          </ul>
        </div>
    );
  };

  const Admins = () => {
    return (
      <div className="tab-pane fade" id="admin" role="tabpanel" aria-labelledby="Admin">
        <ul className="p-0">
          {currentDistrict.admins.map(admin => {
            return (
              <li className="border-bottom d-flex justify-content-between p-2 pb-3 pt-3" key={admin.id}>
                <div className="name">
                  <span>{admin.name}</span>
                </div>
                <div className="icon-holder d-flex justify-content-end">
                  <img src={deleteIcon} alt="" className="image-responsive delete-icon" />
                  <a href="#" className="align-items-center border-0 d-flex m-auto text-uppercase" data-bs-toggle="modal" data-bs-target="#info-modal">
                    <img src={errorIcon} alt="" className="image-responsive error-icon" onClick={() => props.onAdminSelected(admin)}/>
                  </a>
                </div>
              </li>
            );
          })}
          <li className="d-flex justify-content-between p-2 pb-3 pt-3 add-admin-link">
            <a href="#" className="align-items-center border-0 btn btn-outline-secondary d-flex m-auto text-uppercase" data-bs-toggle="modal" data-bs-target="#add_admin">
              <img src={plusIcon} alt="" className="image-responsive" />
              <span>
                ADD ADMIN
              </span>
            </a>
          </li>
        </ul>
      </div>      
    );
  };

  const Details = () => {
    return (
      <div className="tab-content" id="myTabContent">
        <Admins /> 
        <Overview />
      </div>
    );
  }
  
  return(
    <div id="side-bar-tabs" className="tabs-holder" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button 
            className='nav-link py-3 active'
            id="Overview" 
            data-bs-toggle="tab" 
            data-bs-target="#home" 
            type="button" 
            role="tab" 
            aria-controls="home" 
            aria-selected="true"
          >
            Overview
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button 
            className='nav-link py-3'
            id="Admin" 
            data-bs-toggle="tab" 
            data-bs-target="#admin" 
            type="button" 
            role="tab" 
            aria-controls="admin" 
            aria-selected="false"
          >
            Admins
          </button>
        </li>
      </ul>
      {currentDistrict !== null && <Details />}
    </div>
  );
}

export default DistrictInformation;
