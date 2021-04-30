import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteModal from '../../../components/Dashboard/OverviewComponents/DeleteModal';
import { deleteRoom } from '../../../modules/actions/SectionActions';
import RoomForm from './RoomForm';
import EditRoomForm from './EditRoomForm';

export default function SectionsDetails({ sectionDetails, rooms, HandelDeleteSchool, fetchSection, sections, fetchRoomData }) {
  const dispatch = useDispatch();
  const onOpenDeleteModal = () => setOpenDeleteModal(true);
  const onCloseDeleteModal = () => setOpenDeleteModal(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [tabValue, setTabValue] = useState('');
  const [roomId, setRoomId] = useState();
  const [hideBtn, setHideBtn] = useState(false);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [openRoomEditForm, setOpenRoomEditForm] = useState(false);
  const onOpenRoonEditModal = () => setOpenRoomEditForm(true);
  const onCloseRoomEditModalModal = () => setOpenRoomEditForm(false);
  const onOpenModal = () => setOpenSectionModal(true);
  const onCloseModal = () => setOpenSectionModal(false);
  const handleDelete = () => {
    const obj = {
      roomId: roomId,
      sectionDetails: sectionDetails,
    };
    dispatch(deleteRoom(obj));
    setOpenDeleteModal(false);
  };
  return (
    <>
      {/* <!-- Select a section to view details end --> */}
      <div className="section-details">
        <div className="d-flex justify-content-between p15 section-details-header align-items-center">
          <div className="section-header">
            <h5> {sectionDetails.name}</h5>
          </div>
          {tabValue === 'people' ? (
            <div className="d-flex header-button justify-content-between">
              {/* <a href="#" className="btn btn-outline-secondary d-flex align-items-center text-uppercase">
                <img src="assets/edit-icon.svg" alt="" className="image-responsive" />
              </a>
              <a href="#" className="mx-3 btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenDeleteModal}>
                <img src="assets/delete-icon.svg" alt="" className="image-responsive" />
              </a>
              <a href="#" className="btn btn-outline-secondary d-flex align-items-center text-uppercase" data-bs-toggle="modal" data-bs-target="#add_Building">
                <img src="assets/plus-icon.svg" alt="" className="mr5 image-responsive" />
                <span>People</span>
              </a> */}
            </div>
          ) : tabValue === 'rooms' ? (
            <div className="d-flex header-button justify-content-between">
              {/* {hideBtn ? (
                <> */}
              {hideBtn ? (
                <>
                  <a className="btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenRoonEditModal}>
                    <img src="assets/edit-icon.svg" alt="" className="image-responsive" />
                  </a>
                  <a href="#" className="mx-3 btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenDeleteModal}>
                    <img src="assets/delete-icon.svg" alt="" className="image-responsive" />
                  </a>
                </>
              ) : null}
              <a href="#" className="btn btn-outline-secondary d-flex align-items-center text-uppercase" onClick={onOpenModal}>
                <img src="assets/plus-icon.svg" alt="" className="mr5 image-responsive" />
                <span>Rooms</span>
              </a>{' '}
              {/* </> */}
              {/* // ) : null} */}
            </div>
          ) : null}
        </div>
        <div className="section-details-content">
          <ul className="d-flex justify-content-between nav nav-tabs mt-2" id="myTab" role="tablist">
            <li className="nav-item text-center col" role="presentation">
              <button
                className="nav-link w-100 active"
                id="Details-tab"
                data-bs-toggle="tab"
                data-bs-target="#Details"
                type="button"
                role="tab"
                aria-controls="Details"
                aria-selected="true"
                onClick={() => setTabValue('details')}
              >
                Details
              </button>
            </li>
            <li className="nav-item text-center col" role="presentation">
              <button
                className="nav-link w-100"
                id="Rooms-tab"
                data-bs-toggle="tab"
                data-bs-target="#Rooms"
                type="button"
                role="tab"
                aria-controls="Rooms"
                aria-selected="false"
                onClick={() => setTabValue('rooms')}
              >
                Rooms
              </button>
            </li>
            <li className="nav-item text-center col" role="presentation">
              <button
                className="nav-link w-100"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                onClick={() => setTabValue('people')}
              >
                People
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="Details" role="tabpanel" aria-labelledby="Details-tab">
              <div className="inner-tab-section-list-holder">
                <ul className="section-list-block p-0 m-0">
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Cleaner</div>
                    <div className="list-content">John Doe</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Sq. ft.</div>
                    <div className="list-content">{sectionDetails.square_feet ? sectionDetails.square_feet : 0}</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Desks</div>
                    <div className="list-content">{sectionDetails.desks ? sectionDetails.desks : 0}</div>
                  </li>
                  {/* <li className="inner-tab-section-list-item d-flex justify-content-between">
                                        <div className="list-label">
                                            Windows
									  			</div>
                                        <div className="list-content">
                                            {sectionDetails.windows ? sectionDetails.windows : 0}
                                        </div>
                                    </li>
                                    <li className="inner-tab-section-list-item d-flex justify-content-between">
                                        <div className="list-label">
                                            Trash cans
									  			</div>
                                        <div className="list-content">
                                            {sectionDetails.trash_cans ? sectionDetails.trash_cans : 0}
                                        </div>
                                    </li>
                                    <li className="inner-tab-section-list-item d-flex justify-content-between">
                                        <div className="list-label">
                                            <strong>Estimated time to clean</strong>
                                        </div>
                                        <div className="list-content">
                                            <strong>{sectionDetails.estimated_time_to_clean ? sectionDetails.estimated_time_to_clean : 0}</strong>
                                        </div>
                                    </li> */}
                </ul>
              </div>
            </div>
            <div className="tab-pane fade" id="Rooms" role="tabpanel" aria-labelledby="Rooms-tab">
              <div className="inner-tab-section-list-holder room-block">
                <ul className="section-list-block p-0 m-0">
                  {rooms.map((room) => (
                    <li
                      onClick={() => {
                        setRoomId(room.id);
                        setHideBtn(true);
                      }}
                      className="border d-flex flex-column inner-tab-section-list-item justify-content-between m15"
                    >
                      <div className="list-label">{room.name}</div>
                      <div className="room-details">
                        <span>{room.square_feet} sq. ft.</span>
                        <span>{room.desks} desks</span>
                        <span>{room.windows} windows</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div className="inner-tab-section-list-holder">
                <ul className="section-list-block p-0 m-0">
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Abe Doe</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Bishan Gupta</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Bueran Hendricks</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Bunny Reagan</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Chris Morris</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Dom Bess</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openDeleteModal ? (
        <DeleteModal
          open={openDeleteModal}
          onOpenModal={onOpenDeleteModal}
          onCloseModal={onCloseDeleteModal}
          onDelete={tabValue === 'rooms' ? handleDelete : () => HandelDeleteSchool(sectionDetails?.id, setOpenDeleteModal)}
          message="Room"
          sectionDetails={sectionDetails}
        />
      ) : null}

      {openSectionModal ? (
        <RoomForm
          sections={sections}
          fetchRoomData={fetchRoomData}
          open={openSectionModal}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          fetchSection={fetchSection}
          sectionDetails={sectionDetails}
        />
      ) : null}
      {openRoomEditForm ? (
        <EditRoomForm
          open={openRoomEditForm}
          onOpenModal={onOpenRoonEditModal}
          onCloseModal={onCloseRoomEditModalModal}
          sectionDetails={sectionDetails}
          setOpenRoomEditForm={setOpenRoomEditForm}
          id={roomId}
        />
      ) : null}
    </>
  );
}
