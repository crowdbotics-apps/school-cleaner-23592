import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BuildingCard from "../../../components/Dashboard/OverviewComponents/BuildingCard";
import Section from "../../../components/Dashboard/OverviewComponents/Section";
import SelectedBuliding from "../../../components/Dashboard/OverviewComponents/SelectedBuilding";
import Navbar from "../../../components/Dashboard/OverviewComponents/Navbar";
import { fetchSchools } from '../../../modules/actions/SchoolActions';
import "./school.scss";
import "../dashboard.scss";

const School = (props) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const { admins: { loadingAdmins, adminSuccess, adminError, adminData } } = useSelector(({ admin }) => admin);
    useEffect(() => {
        console.log("props.location.state.districtId", props.location.state.districtId)
        dispatch(fetchSchools(props.location.state.districtId));
    }, []);

    return (
        <div className="dashboard overveiw">
            {console.log("store", props)}
            <div id="siderbar" className="d-flex flex-column col">
                <div className="d-flex flex-column justify-content-between p-3 section-header">
                    <div className="d-flex justify-content-between top-header">
                        <div className="logo-holder">
                            <img src="assets/logo1.png" alt="" className="image-responsive" />
                        </div>
                        <div className="user-button">
                            <img src="assets/user-button.svg" alt="" className="image-responsive" />
                        </div>
                    </div>
                    <div className="align-items-end bottom-header d-flex justify-content-between">
                        <div className="align-items-end d-flex header-content ">
                            <div className="arrow-icon mr15">
                                <img src="assets/arrow-left.svg" alt="" className="image-responsive" />
                            </div>
                            <h3>
                                <span className="d-block mb-2 titile-name">John Doe</span>
                  Buildings
                </h3>
                        </div>
                        <div className="header-button">
                            <a href="#" className="btn btn-outline-secondary d-flex align-items-center text-uppercase" data-bs-toggle="modal" data-bs-target="#add_Building">
                                <img src="assets/plus-icon.svg" alt="" className="mr5 image-responsive" />
                                <span>
                                    Building
                  </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="inner-section h-100 p15">
                    <BuildingCard
                        image="assets/building-img.jpg"
                        name="St. Xaviers International School"
                        sectionno="4"
                        roomno="12"
                    />
                </div>
            </div>
            <div className="main-content w-100">
                <div className="main-content-tabs-section">
                    <SelectedBuliding
                        image="assets/building-img.jpg"
                        name="St. Xaviers International School"
                    />
                    <Navbar />

                    <div className="tab-content" id="nav-tabContent">
                        <Section />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default School;