import React, { useState } from 'react';
import SidebarHeader from '../../atoms/Dashboard/District/SideBarHeader';
import DistrictInformation from '../../components/Dashboard/DistrictInformation';
import AdminInfo from '../../components/Dashboard/AdminInfo';
import DistrictForm from '../../components/Dashboard/DistrictForm'
import SidebarContent from '../../components/Dashboard/SidebarContent';
import Content from './District/Content';
import "./dashboard.scss";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.js';

const Dashboard = () => {
  const [ districtSelected, setDistrictSelected ] = useState(0);
  const [ selectedDistrict, setSelectedDistrict ] = useState(null);
  const [ adminInfo, setAdminInfo ] = useState({id: '', name: ''});
  
  const selectedDistrictHandler = district => {
    setSelectedDistrict(district)
  };

  const adminInfoHandler = ({id, name}) => {
    setAdminInfo({id: id, name: name})
  };

  return (
    <React.Fragment>
      <div className="dashboard">
        <div id="siderbar" className="d-flex flex-column col">
          <SidebarHeader />
          <div className="inner-section h-100">
            {selectedDistrict == null ? <SidebarContent /> : <DistrictInformation district={selectedDistrict} onAdminSelected={adminInfoHandler} /> }
          </div>
        </div>

        <Content onDistrictSelected={selectedDistrictHandler} />
      </div>

      <AdminInfo admin={adminInfo}/>
    </React.Fragment>
  );
}

export default Dashboard;


