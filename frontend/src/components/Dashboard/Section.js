import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRoom, deleteSection } from '../../modules/actions/SectionActions';
import SectionsCard from './OverviewComponents/SectionCard';
import SectionsDetails from './OverviewComponents/SectionDetails';
import UnselectSection from './OverviewComponents/UnselectSection';
import SectionForm from '../Dashboard/SectionForm';
import DeleteModal from '../../components/Dashboard/OverviewComponents/DeleteModal';

export default function Section({ sectionNumber, noOfRooms, noOfPeople, school, sections, handleDeleteSection, fetchSection }) {
  const dispatch = useDispatch();
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const store = useSelector((store) => console.log('store rooom', store));
  const [showDetails, setShowDetails] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [sectionDetails, setSectionDetails] = useState({});
  const [roomData, setRoomData] = useState();
  const rooms = useSelector((store) => store.section.room.data);
  const onOpenModal = () => setOpenSectionModal(true);
  const onCloseModal = () => setOpenSectionModal(false);
  const [sectionId, setSectionId] = useState(null);

  const handleClick = async (sectionDetail) => {
    setShowDetails(false);
    setShowIcon(true);
    setSectionDetails(sectionDetail);
    dispatch(fetchRoom(sectionDetail.id));
    setRoomData(sectionDetail.id);
  };

  const fetchRoomData = () => {
    dispatch(fetchRoom(roomData));
  };

  const onOpenDeleteModal = () => setOpenDeleteModal(true);
  const onCloseDeleteModal = () => setOpenDeleteModal(false);

  function HandelDeleteSchool(id, openDeleteModal) {
    dispatch(deleteSection(id));
    handleDeleteSection();
    openDeleteModal(false);
  }

  function handelDeleteSection() {
    const obj = {
      school: school,
      sectionId: sectionId,
    };
    dispatch(deleteSection(obj));
    handleDeleteSection();
    setOpenDeleteModal(false);
  }

  return (
    <div className="tab-pane fade show active" id="overveiw" role="tabpanel" aria-labelledby="Overveiw-tab">
      <div className="tabs-inner-content-holder">
        <div className="tabs-siderbar">
          <div class="section-header">
            <h5>Sections</h5>
            <div className="d-flex header-button justify-content-between">
              {showIcon ? (
                <>
                  <a href="#" className="btn btn-outline-secondary d-flex align-items-center text-uppercase" data-bs-toggle="modal" data-bs-target="#add_Building">
                    <img src="assets/edit-icon.svg" alt="" className="image-responsive" />
                  </a>
                  <a href="#" className="mx-3 btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenDeleteModal}>
                    <img src="assets/delete-icon.svg" alt="" className="image-responsive" />
                  </a>{' '}
                </>
              ) : null}
              <a className="btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenModal}>
                <img src="assets/plus-icon.svg" alt="" class="mr5 image-responsive" />
                <span>Section</span>
              </a>
            </div>
          </div>
          <div className="section-list-holder">
            {sections.map((item) => (
              <SectionsCard
                id={item.id}
                sectionNumber={`${item?.name}`}
                noOfRooms={item?.rooms}
                noOfPeople={item.people?.length}
                handleClick={() => handleClick(item)}
                sections={sections}
                fetchSection={fetchSection}
                fetchRoomData={fetchRoomData}
                setSectionId={setSectionId}
              />
            ))}
          </div>
        </div>
        <div className="tabs-inner-block">
          {showDetails ? (
            <UnselectSection selectionname="section" />
          ) : (
            <SectionsDetails
              sectionDetails={sectionDetails}
              rooms={rooms}
              HandelDeleteSchool={HandelDeleteSchool}
              sections={sections}
              fetchSection={fetchSection}
              fetchRoomData={fetchRoomData}
            />
          )}
        </div>
      </div>
      {openSectionModal ? <SectionForm school={school} open={openSectionModal} onOpenModal={onOpenModal} onCloseModal={onCloseModal} fetchSection={fetchSection} /> : null}

      {openDeleteModal ? (
        <DeleteModal open={openDeleteModal} onOpenModal={onOpenDeleteModal} onCloseModal={onCloseDeleteModal} onDelete={handelDeleteSection} message=" Section" />
      ) : null}
    </div>
  );
}
