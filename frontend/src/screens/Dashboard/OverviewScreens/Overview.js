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
import CleaningDeatlsForm from '../../../components/Dashboard/OverviewComponents/CleaningDeatlsForm';
import './Styles/overview.scss';
import '../dashboard.scss';
import '../margin_and_padding_helpers.scss';

function Overview(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openAddBulidingModal, setOpenAddBulidingModal] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const onOpenModal = () => setOpenAddBulidingModal(true);
  const onCloseModal = () => setOpenAddBulidingModal(false);
  const [showDetails, setShowDetails] = useState(true);
  const [sectionData, setSectionData] = useState(0);
  const [sectionId, setSectionId] = useState(0);
  const [newSchoolId, setNewSchoolId] = useState('');
  useEffect(() => {
    dispatch(fetchSchools(props?.location?.state?.districtId));

    const token = Cookies.get('token');
    dispatch(getUserData(token));
    dispatch(fetchUsers(token));
    // dispatch(fetchSections(selectedSchool?.id));
  }, []);
  const [schoolId, setSchoolId] = useState(null);
  const schools = useSelector(({ school }) => school.schools.data);
  const sections = useSelector((store) => store.section.sections.data);
  const report = useSelector((store) => store.school.reports.data);

  const [selectedSchool, setSelectedSchool] = useState(schools[0]);
  const [selectedSections, setSelectedSections] = useState();
  const handleClick = (data, cardId) => {
    if (sectionData === 0) {
      document.getElementById(`building-card-holder-${cardId}`).style.background = '#b4dbdb';
      setSelectedSchool(data);
      dispatch(fetchSections(data?.id));
      dispatch(fetchReport(data?.id));
      setSectionData(data?.id);
      setSchoolId(data?.id);
      setShowDetails(true);
      setSectionId(0);
    } else {
      document.getElementById(`building-card-holder-${sectionData}`).style.background = '#f2f6f6';
      document.getElementById(`building-card-holder-${cardId}`).style.background = '#b4dbdb';
      if (sectionId !== 0) {
        document.getElementById(`section-list-item-${sectionId}`).style.background = '#f2f6f6';
        setSectionId(0);
      }
      setSelectedSchool(data);
      dispatch(fetchSections(data?.id));
      dispatch(fetchReport(data?.id));
      setSectionData(data?.id);
      setSchoolId(data?.id);
      setShowDetails(true);
    }
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
              <img src="assets/logo1.png" alt="" className="image-responsive" />
            </div>
            {/* <div className="user-button">
              <img src="assets/user-button.svg" alt="" className="image-responsive" />
            </div> */}
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
              {/* <a className="btn btn-outline-secondary d-flex align-items-center text-uppercase" > */}
              <a className="btn btn-outline-secondary d-flex align-items-center text-uppercase" data-bs-toggle="modal" data-bs-target="#add_School">
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
                handleClick={() => handleClick(school, school.id)}
                district={props?.location?.state?.districtId}
                setSectionId={setSectionId}
                sectionId={sectionId}
                setSectionData={setSectionData}
                sectionData={sectionData}
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
            <Section
              district={props?.location?.state?.districtId}
              school={selectedSchool?.id}
              sections={sections}
              handleDeleteSection={handleDeleteSection}
              fetchSection={fetchSection}
              setShowDetails={setShowDetails}
              showDetails={showDetails}
              setSectionId={setSectionId}
              sectionId={sectionId}
            />
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
      <SchoolForm setNewSchoolId={setNewSchoolId} district={props?.location?.state?.districtId} fetchSchool={fetchSchool} setOpenAddBulidingModal={setOpenAddBulidingModal} />
      {openAddBulidingModal ? <CleaningDeatlsForm open={openAddBulidingModal} onOpenModal={onOpenModal} onCloseModal={onCloseModal} newSchoolId={newSchoolId} /> : null}
    </div>
  );
}
export default Overview;
