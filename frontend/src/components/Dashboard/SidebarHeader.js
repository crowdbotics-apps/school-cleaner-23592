import React from 'react';
import '../../screens/Dashboard/dashboard.scss';
import logo from './assets/logo1.png';
import userbutton from './assets/user-button.svg';
import plusicon from './assets/plus-icon.svg';

const SideBarHeader = () => {
  return (
    <div className="d-flex flex-column justify-content-between p-3 section-header">
      <div className="d-flex justify-content-between top-header">
        <div className="logo-holder">
          <img src={logo} alt="" className="image-responsive" />
        </div>
        {/* <div className="user-button">
          <img src={userbutton} alt="" className="image-responsive" />
        </div> */}
      </div>
      <div className="align-items-center bottom-header d-flex justify-content-between">
        <div className="header-content">
          <h3>District details</h3>
        </div>
        <div className="header-button">
          <a href="#" className="btn btn-outline-secondary d-flex align-items-center text-uppercase" data-bs-toggle="modal" data-bs-target="#add_District">
            <img src={plusicon} alt="" className="image-responsive" />
            <span>District</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBarHeader;
