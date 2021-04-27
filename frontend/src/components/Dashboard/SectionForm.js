import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createSection, fetchSections } from '../../modules/actions/SectionActions';
import CSRFToken from '../../utils/csrfToken';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const SchoolForm = (props) => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [sectionDetail, setSectionDetail] = useState({ name: '' });
  const [closeModal, setCloseModal] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      await dispatch(createSection({ name: sectionDetail.name, school: props.school }));
      await props.fetchSection();
      setSectionDetail({ name: '' });
      props.onCloseModal();
      setCloseModal(true);
    } else {
      setValidated(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setSectionDetail({ ...sectionDetail, [name]: value });
  };

  return (
    <Modal className="deleteModal" center open={props.open} onClose={props.onCloseModal}>
      <div className="modal-holder">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <CSRFToken />
              <form onSubmit={submitHandler}>
                <h2 className="modal-title mb-4" id="add_sectionLabel">Add Section</h2>
                <div className="mb-4">
                  <div className="form-floating mb-3 go-bottom">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={sectionDetail.name}
                      onChange={handleChange}
                      required={true}
                      id="floatingInput"
                      placeholder="Building Name"
                    />
                    <label htmlFor="name">Section Name</label>
                  </div>
                </div>
                <button type="submit" data-dismiss={closeModal ? "modal" : ""} className="btn btn-primary text-uppercase">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SchoolForm;
