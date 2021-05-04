import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { createSection, editSection } from '../../modules/actions/SectionActions';
import CSRFToken from '../../../utils/csrfToken';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const CleaningDetailsForm = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.sectionDetails) {
      setSectionDetail({
        name: props.sectionDetails.name,
      });
    }
  }, [props.sectionDetails]);

  const [validated, setValidated] = useState(false);
  const [sectionDetail, setSectionDetail] = useState({ name: '' });
  const [closeModal, setCloseModal] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      // await dispatch(createSection({ name: sectionDetail.name, school: props.school, district: props.district }));
      await props.fetchSection();
      setSectionDetail({ name: '' });
      props.onCloseModal();
      setCloseModal(true);
    } else {
      setValidated(true);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      // await dispatch(editSection({ id: props.sectionDetails.id, name: sectionDetail.name, school: props.school }));
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
    <div style={{ width: 1000 }}>
      <Modal classNames="salman" className="deleteModal" open={props.open} onClose={props.onCloseModal}>
        <div className="modal-holder">
          <div className="modal-dialog">
            <div style={{ border: 'none' }} className="modal-content">
              <div className="modal-body">
                <CSRFToken />
                <form onSubmit={props.sectionDetails ? updateHandler : submitHandler}>
                  <h2 className="modal-title mb-4" id="add_sectionLabel">
                    Cleaning details
                  </h2>
                  <div className="row">
                    <div className="col-8 mb-4">
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
                        <label htmlFor="name">Tool used in dust cleaning</label>
                      </div>
                    </div>
                    <div className="col-4">
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
                        <label htmlFor="name">Tool size</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8 mb-4">
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
                        <label htmlFor="name">Tool used in floor mopping</label>
                      </div>
                    </div>
                    <div className="col-4">
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
                        <label htmlFor="name">Tool Size</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8 mb-4">
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
                        <label htmlFor="name">Tool used in floor burnishing</label>
                      </div>
                    </div>
                    <div className="col-4">
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
                        <label htmlFor="name">Tool Size</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <div className="form-floating mb-5 go-bottom">
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
                        <label htmlFor="name">Tool used in cleaning tables</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <div className="form-floating mb-5 go-bottom">
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
                        <label htmlFor="name">Do you do misting table</label>
                      </div>
                    </div>
                  </div>

                  <button type="submit" data-dismiss={closeModal ? 'modal' : ''} className="btn btn-primary text-uppercase">
                    {props.sectionDetails ? 'Update' : 'Save'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CleaningDetailsForm;
