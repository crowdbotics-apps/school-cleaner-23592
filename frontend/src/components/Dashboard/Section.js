import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRoom, deleteSection } from '../../modules/actions/SectionActions';
import SectionsCard from './OverviewComponents/SectionCard';
import SectionsDetails from './OverviewComponents/SectionDetails';
import UnselectSection from './OverviewComponents/UnselectSection';
import SectionForm from '../Dashboard/SectionForm';
import CleaningDetailForm from '../Dashboard/OverviewComponents/CleaningDeatlsForm';
import DeleteModal from '../../components/Dashboard/OverviewComponents/DeleteModal';

export default function Section({ sectionNumber, noOfRooms, district, school, sections, handleDeleteSection, fetchSection, setShowDetails, showDetails, setSectionId, sectionId }) {
  const dispatch = useDispatch();
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [editSectionModal, setEditSectionModal] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const store = useSelector((store) => console.log('store rooom', store));

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [activeColor, setActiveColor] = useState(false);
  const [sectionDetails, setSectionDetails] = useState({});

  const [roomData, setRoomData] = useState();
  const rooms = useSelector((store) => store.section.room.data);
  const onOpenModal = () => setOpenSectionModal(true);
  const onCloseModal = () => setOpenSectionModal(false);
  const openEditModal = () => setEditSectionModal(true);
  const closeEditModal = () => setEditSectionModal(false);

  const handleClick = async (sectionDetail, cardId) => {
    if (sectionId === 0) {
      document.getElementById(`section-list-item-${cardId}`).style.background = '#b4dbdb';
      setShowDetails(false);
      setShowIcon(true);
      setSectionDetails(sectionDetail);
      setSectionId(sectionDetail.id);
      dispatch(fetchRoom(sectionDetail.id));
      setRoomData(sectionDetail.id);
      setRoomId(0);
    } else {
      document.getElementById(`section-list-item-${sectionId}`).style.background = '#f2f6f6';
      document.getElementById(`section-list-item-${cardId}`).style.background = '#b4dbdb';
      if (roomId !== 0) {
        document.getElementById(`inner-tab-section-list-item-${roomId}`).style.background = '#f2f6f6';
        setRoomId(0);
      }
      setShowDetails(false);
      setShowIcon(true);
      setSectionDetails(sectionDetail);
      setSectionId(sectionDetail.id);
      dispatch(fetchRoom(sectionDetail.id));
      setRoomData(sectionDetail.id);
    }
  };

  const fetchRoomData = () => {
    dispatch(fetchRoom(roomData));
  };

  const onOpenDeleteModal = () => setOpenDeleteModal(true);
  const onCloseDeleteModal = () => setOpenDeleteModal(false);

  function HandelDeleteSchool(id, openDeleteModal) {
    const obj = {
      id: id,
      sectionDetails: sectionDetails,
      school: school,
      district: district,
    };
    dispatch(deleteSection(obj));
    handleDeleteSection();
    openDeleteModal(false);
  }

  function handelDeleteSection() {
    const obj = {
      school: school,
      sectionId: sectionDetails.id,
      district: district,
    };
    if (roomId !== 0) {
      document.getElementById(`inner-tab-section-list-item-${roomId}`).style.background = '#f2f6f6';
      setRoomId(0);
    }
    if (sectionId !== 0) {
      document.getElementById(`section-list-item-${sectionId}`).style.background = '#f2f6f6';
      setSectionId(0);
    }

    dispatch(deleteSection(obj));
    handleDeleteSection();
    setOpenDeleteModal(false);
  }

  return (
    <div className="tab-pane fade show active" id="overveiw" role="tabpanel" aria-labelledby="Overveiw-tab">
      <div className="tabs-inner-content-holder">
        <div style={{ maxWidth: '415px', overflow: 'scroll', height: '63vh' }} className="tabs-siderbar">
          <div class="section-header">
            <h5>Sections</h5>
            <div className="d-flex header-button justify-content-between">
              {showIcon ? (
                <>
                  <a
                    className="btn btn-outline-secondary d-flex align-items-center text-uppercase"
                    data-bs-toggle="modal"
                    data-bs-target="#add_Building"
                    onClick={() => setEditSectionModal(true)}
                  >
                    <img src="assets/edit-icon.svg" alt="" className="image-responsive" />
                  </a>
                  <a className="mx-3 btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenDeleteModal}>
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
          <div className="section-list-holder-without-overflow">
            {sections.map((item) => (
              <SectionsCard
                id={item.id}
                sectionNumber={`${item?.name}`}
                noOfRooms={item?.rooms}
                noOfPeople={item.people?.length}
                handleClick={() => handleClick(item, item.id)}
                sections={sections}
                fetchSection={fetchSection}
                fetchRoomData={fetchRoomData}
                setSectionId={setSectionId}
                item={item}
                district={district}
                school={school}
                sectionId={sectionId}
              />
            ))}
          </div>
        </div>
        <div style={{ overflow: 'scroll', height: '63vh' }} className="tabs-inner-block">
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
              district={district}
              school={school}
              setRoomId={setRoomId}
              roomId={roomId}
            />
          )}
        </div>
      </div>
      {openSectionModal ? (
        <SectionForm
          district={district}
          school={school}
          open={openSectionModal}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          fetchSection={fetchSection}
          roomId={roomId}
          setRoomId={setRoomId}
          sectionId={sectionId}
          setSectionId={setSectionId}
        />
      ) : // <CleaningDetailForm open={openSectionModal} onOpenModal={onOpenModal} onCloseModal={onCloseModal} />
      null}

      {editSectionModal ? (
        <SectionForm
          sectionDetails={sectionDetails}
          school={school}
          open={editSectionModal}
          onOpenModal={openEditModal}
          onCloseModal={closeEditModal}
          fetchSection={fetchSection}
        />
      ) : null}

      {openDeleteModal ? (
        <DeleteModal open={openDeleteModal} onOpenModal={onOpenDeleteModal} onCloseModal={onCloseDeleteModal} onDelete={handelDeleteSection} message=" Section" />
      ) : null}
    </div>
  );
}
