import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import { fetchSchools, fetchReport } from '../../../modules/actions/SchoolActions';
import BuildingCard from '../../../components/Dashboard/OverviewComponents/BuildingCard';
import Section from '../../../components/Dashboard/Section';
import SelectedBuilding from '../../../components/Dashboard/OverviewComponents/SelectedBuilding';
import Navbar from '../../../components/Dashboard/OverviewComponents/Navbar';
import Reports from '../../../components/Dashboard/OverviewComponents/Reports';
import Inspection from '../../../components/Dashboard/OverviewComponents/Inspection';
import People from '../../../components/Dashboard/OverviewComponents/People';
import ProductNeeded from '../../../components/Dashboard/OverviewComponents/ProductsNeeded';
import Savings from '../../../components/Dashboard/OverviewComponents/Savings';
import CleaningMethods from '../../../components/Dashboard/OverviewComponents/CleaningMethods';
import Budgeting from '../../../components/Dashboard/OverviewComponents/Budgeting';
import SchoolForm from '../../../components/Dashboard/SchoolForm';
import { fetchSections } from '../../../modules/actions/SectionActions';
import { getUserData, fetchUsers } from '../../../modules/actions/UserActions';
import './Styles/overview.scss';
import '../dashboard.scss';
import '../margin_and_padding_helpers.scss';

function Overview(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openAddBulidingModal, setOpenAddBulidingModal] = useState(false);
  const onOpenModal = () => setOpenAddBulidingModal(true);
  const onCloseModal = () => setOpenAddBulidingModal(false);
  const [sectionData, setSectionData] = useState();
  useEffect(() => {
    dispatch(fetchSchools(props?.location?.state?.districtId));

    const token = Cookies.get('token');
    console.log(token);
    dispatch(getUserData(token));
    dispatch(fetchUsers(token));
    // dispatch(fetchSections(selectedSchool?.id));
  }, []);
  const [schoolId, setSchoolId] = useState(null);
  const schools = useSelector(({ school }) => school.schools.data);
  console.log('selectedSchool?.id', schools);
  const sections = useSelector((store) => store.section.sections.data);
  const report = useSelector((store) => store.school.reports.data);
  const user = useSelector((store) => console.log('store', store));

  const [selectedSchool, setSelectedSchool] = useState(schools[0]);
  const [selectedSections, setSelectedSections] = useState();
  const handleClick = (data) => {
    setSelectedSchool(data);
    dispatch(fetchSections(data?.id));
    dispatch(fetchReport(data?.id));
    setSectionData(data?.id);
    setSchoolId(data?.id);
  };
  const fetchSchool = () => {
    dispatch(fetchSchools(props?.location?.state?.districtId));
  };
  const fetchSection = () => {
    dispatch(fetchSections(sectionData));
  };

  const handleDeleteSection = () => {
    dispatch(fetchSchools(props?.location?.state?.districtId));
    dispatch(fetchSections(schoolId));
  };
  return (
    <div className="dashboard overveiw">
      <div id="siderbar" className="d-flex flex-column col">
        <div className="d-flex flex-column justify-content-between p-3 section-header">
          <div className="d-flex justify-content-between top-header">
            <div className="logo-holder">
              <img src="assets/logo.svg" alt="" className="image-responsive" />
            </div>
            <div className="user-button">
              <img src="assets/user-button.svg" alt="" className="image-responsive" />
            </div>
          </div>
          <div className="align-items-end bottom-header d-flex justify-content-between">
            <div className="align-items-end d-flex header-content ">
              <div className="arrow-icon mr15">
                <img style={{ cursor: 'pointer' }} onClick={() => history.replace('/dashboard')} src="assets/arrow-left.svg" alt="" className="image-responsive" />
              </div>
              <h3>
                <span className="d-block mb-2 titile-name">{schools[0]?.district_name}</span>
                Buildings
              </h3>
            </div>
            <div className="header-button">
              <a className="btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenModal}>
                <img src="assets/plus-icon.svg" alt="" className="mr5 image-responsive" />
                <span>Building</span>
              </a>
            </div>
          </div>
        </div>
        <div className="inner-section h-100 p15">
          {schools.map((school) => {
            return (
              <BuildingCard
                image={school.image}
                name={school.name}
                sectionno={school.total_sections}
                roomno={school.total_rooms}
                id={school.id}
                handleClick={() => handleClick(school)}
              />
            );
          })}
        </div>
      </div>
      <div className="main-content w-100">
        <div className="main-content-tabs-section">
          <SelectedBuilding image={selectedSchool?.image} name={selectedSchool?.name} />
          <Navbar />

          <div className="tab-content" id="nav-tabContent">
            <Section school={selectedSchool?.id} sections={sections} handleDeleteSection={handleDeleteSection} fetchSection={fetchSection} />
            <Reports report={report} />
            <Inspection />
            <People />
            <Budgeting />
            <ProductNeeded />
            <Savings />
            <CleaningMethods />
          </div>
        </div>
      </div>
      {openAddBulidingModal ? (
        <SchoolForm district={props?.location?.state?.districtId} open={openAddBulidingModal} onOpenModal={onOpenModal} onCloseModal={onCloseModal} fetchSchool={fetchSchool} />
      ) : null}
    </div>
  );
}
export default Overview;
