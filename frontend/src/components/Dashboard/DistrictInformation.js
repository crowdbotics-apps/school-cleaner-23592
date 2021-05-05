import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import errorIcon from '../../assets/images/error-icon.svg';
import deleteIcon from '../../assets/images/delete-icon.svg';
import plusIcon from '../../assets/images/plus-icon.svg';
import { updateDistrict, fetchDistricts } from '../../modules/actions/DistrictActions';
import AdminInfo from './AdminInfo';
import DeleteModal from './OverviewComponents/DeleteModal';

const DistrictInformation = (props) => {
  const dispatch = useDispatch();
  const {
    districts: { loading, success, error, data },
  } = useSelector(({ district }) => district);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [editAdminModal, setEditAdminModal] = useState(false);
  const [adminDetails, setAdminDetails] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAdminData, setDeleteAdminData] = useState();
  const onOpenModal = () => setEditAdminModal(true);
  const onCloseModal = () => setEditAdminModal(false);
  const onOpenDeleteModal = (admin) => {
    setDeleteModal(true);
    setDeleteAdminData(admin);
  };
  const onCloseDeleteModal = () => setDeleteModal(false);
  const setDistrict = (district) => {
    setCurrentDistrict(district);
  };

  const handleDeleteAdmin = () => {
    let admins = props.district.admins.filter((id) => id != deleteAdminData.id);
    let admin_detail = props.district.admin_detail.filter((x) => x.id != deleteAdminData.id);

    dispatch(
      updateDistrict({
        id: props.district.id,
        admins,
      })
    );
    props.district.admins = admins;
    props.district.admin_detail = admin_detail;
    setCurrentDistrict(props.district);
    setDeleteAdminData(false);
    setDeleteModal(false);
  };
  const handleClick = (admin) => {
    setAdminDetails(admin);
    onOpenModal();
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
              <span>{currentDistrict.buildings || 0}</span>
            </div>
          </li>
          <li className="border-bottom d-flex justify-content-between px-3 py-3">
            <div className="name">
              <span>Rooms</span>
            </div>
            <div className="value">
              <span>{currentDistrict.rooms || 0}</span>
            </div>
          </li>
          <li className="border-bottom d-flex justify-content-between px-3 py-3">
            <div className="name">
              <span>Sq. ft.</span>
            </div>
            <div className="value">
              <span>{currentDistrict.sq_feet || 0}</span>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const Admins = () => {
    return (
      <div className="tab-admin" id="" role="" aria-labelledby="">
        <ul className="p-0">
          {currentDistrict &&
            currentDistrict.admin_detail.map((admin) => {
              return (
                <li className="border-bottom d-flex justify-content-between p-2 pb-3 pt-3" key={admin.id}>
                  <div className="name">
                    <span>{admin.name}</span>
                  </div>
                  <div className="icon-holder d-flex justify-content-end">
                    <img src={deleteIcon} alt="" className="image-responsive delete-icon" onClick={() => onOpenDeleteModal(admin)} />
                    <a className="align-items-center border-0 d-flex m-auto text-uppercase" onClick={() => handleClick(admin)}>
                      <img src={errorIcon} alt="" className="image-responsive error-icon" />
                      {/* onClick={() => props.onAdminSelected(admin)} */}
                      {/* onClick={() => handleDeleteAdmin(admin)} */}
                    </a>
                  </div>
                </li>
              );
            })}
          <li className="d-flex justify-content-between p-2 pb-3 pt-3 add-admin-link">
            <a href="#" className="align-items-center border-0 btn btn-outline-secondary d-flex m-auto text-uppercase" data-bs-toggle="modal" data-bs-target="#add_admin">
              <img src={plusIcon} alt="" className="image-responsive" />
              <span>ADD ADMIN</span>
            </a>
          </li>
        </ul>
        {editAdminModal ? <AdminInfo open={editAdminModal} admindetails={adminDetails} onOpenModal={onOpenModal} onCloseModal={onCloseModal} admin={adminDetails} /> : null}
        {deleteModal ? <DeleteModal open={deleteModal} onCloseModal={onCloseDeleteModal} onOpenModal={onOpenDeleteModal} onDelete={handleDeleteAdmin} /> : null}
      </div>
    );
  };

  // const Details = () => {
  //   return (
  //     <div className="tab-content" id="myTabContent">
  //       <Admins />
  //       <Overview />
  //     </div>
  //   );
  // }

  const renderDetails = () => <>{activeTab === 'Overview' ? <Overview /> : <Admins />}</>;

  return (
    <div id="side-bar-tabs" className="tabs-holder" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link py-3 ${activeTab === 'Overview' ? 'active' : ''}`}
            // id="Overview"
            // data-bs-toggle="tab"
            // data-bs-target="#home"
            // type="button"
            // role="tab"
            // aria-controls="home"
            // aria-selected="true"
            onClick={() => setActiveTab('Overview')}
          >
            Overview
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link py-3 ${activeTab === 'Admin' ? 'active' : ''}`}
            // id="Admin"
            // data-bs-toggle="tab"
            // data-bs-target="#admin"
            // type="button"
            // role="tab"
            // aria-controls="admin"
            // aria-selected="false"
            onClick={() => setActiveTab('Admin')}
          >
            Admins
          </button>
        </li>
      </ul>
      {currentDistrict !== null && renderDetails()}
      {/* {currentDistrict !== null && <Details />} */}
    </div>
  );
};

export default DistrictInformation;
