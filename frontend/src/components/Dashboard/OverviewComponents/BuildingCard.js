import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import SchoolEdit from './SchoolEditForm';
import DeleteModal from './DeleteModal';
import { deleteSchool } from '../../../modules/actions/SchoolActions';
export default function BuildingCard(props) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [emptyImage, setEmptyImage] = useState('');
  const dispatch = useDispatch();

  const onOpenEditModal = () => setOpenEditModal(true);
  const onCloseEditModal = () => setOpenEditModal(false);
  const onOpenDeleteModal = () => setOpenDeleteModal(true);
  const onCloseDeleteModal = () => setOpenDeleteModal(false);
  function HandelDeleteSchool() {
    const obj = {
      id: props.id,
      district: props.district,
    };
    dispatch(deleteSchool(obj));
    setOpenDeleteModal(false);
  }
  useEffect(() => {
    if (props.image) {
      setEmptyImage(props.image);
    }
  });
  return (
    <div class="building-card-holder mb15">
      <div class="building-image" onClick={props.handleClick}>
        {emptyImage ? <img src={props.image} alt="" className="image-responsive w-100" /> : <img src="assets/empty-image.png" alt="" className="image-responsive w-100" />}
        <div class="building-caption p10">
          <div class="caption-holder p10">
            <div class="building-heading-holder d-flex justify-content-between">
              <h5 class="m-0">{props.name}</h5>
              <div class="icon-holder">
                <div className="dropdown">
                  <button className="dropdown btn " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="assets/dotted-icon-white.svg" alt="" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li>
                      <a className="dropdown-item" data-toggle="modal" onClick={onOpenEditModal}>
                        Edit details
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={onOpenDeleteModal}>
                        Delete School
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="building-details-holder">
              <p class="m-0">
                <span>{props.sectionno}</span> Sections | <span>{props.roomno}</span> Rooms
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="align-items-center building-card-footer d-flex p15" onClick={props.handleClick}>
        <div class="d-flex icon-holder mr10">
          <object data="assets/arrow-right.svg" width="20" height="20">
            {' '}
          </object>
        </div>
        <h6 style={{ cursor: 'pointer' }} class="m-0">
          show details
        </h6>
      </div>
      {openEditModal ? <SchoolEdit open={openEditModal} onOpenModal={onOpenEditModal} onCloseModal={onCloseEditModal} /> : null}
      {openDeleteModal ? (
        <DeleteModal open={openDeleteModal} onOpenModal={onOpenDeleteModal} onCloseModal={onCloseDeleteModal} onDelete={HandelDeleteSchool} message="School" />
      ) : null}
    </div>
  );
}
