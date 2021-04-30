import React, { useEffect, useState } from 'react';
import RoomForm from './RoomForm';

export default function SectionsCard({ sectionNumber, noOfRooms, noOfPeople, handleClick, sections, fetchRoomData, fetchSection, setSectionId, id }) {
  const [openRoomModal, setOpenRoomModal] = useState(false);
  const onOpenModal = () => setOpenRoomModal(true);
  const onCloseModal = () => setOpenRoomModal(false);

  useEffect(() => {
    setSectionId(id);
  });
  return (
    <>
      <div className="section-list-item" onClick={handleClick}>
        <div className="section-list-header d-flex justify-content-between mb20">
          <h5>{sectionNumber}</h5>
          <div className="d-flex icon-holder">
            <object data="assets/arrow-right.svg" width={20} height={20}>
              {' '}
            </object>
          </div>
        </div>
        <div className="section-header align-items-end">
          <div>
            <h6 className="mb-2">
              <span className="pr5">{noOfRooms}</span>rooms
            </h6>
            <h6>
              <span className="pr5">{noOfPeople}</span> People
            </h6>
          </div>
          <div className="header-button">
            <a className="btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenModal}>
              <img src="assets/plus-icon.svg" alt="" className="mr5 image-responsive" />
              <span>Room</span>
            </a>
          </div>
        </div>
        {openRoomModal ? (
          <RoomForm sections={sections} fetchRoomData={fetchRoomData} open={openRoomModal} onOpenModal={onOpenModal} onCloseModal={onCloseModal} fetchSection={fetchSection} />
        ) : null}
      </div>
    </>
  );
}
