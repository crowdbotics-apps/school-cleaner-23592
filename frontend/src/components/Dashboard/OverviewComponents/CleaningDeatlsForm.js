import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCleanUp, fetchSchoolsCleaningDetails } from '../../../modules/actions/SchoolActions';
// import { createSection, editSection } from '../../modules/actions/SectionActions';
import CSRFToken from '../../../utils/csrfToken';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const CleaningDetailsForm = (props) => {
  const dispatch = useDispatch();
  console.log(props.schoolId);

  useEffect(() => {
    if (props.sectionDetails) {
      setSectionDetail({
        name: props.sectionDetails.name,
      });
    }
  }, [props.sectionDetails]);

  const [validated, setValidated] = useState(false);
  const [sectionDetail, setSectionDetail] = useState({});
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    debugger;
    dispatch(fetchSchoolsCleaningDetails(props?.schoolId));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    console.log(sectionDetail);
    const cleaningDetails = {
      dust_cleaning: parseInt(sectionDetail.dust_cleaning),
      dust_cleaning_size: parseInt(sectionDetail.dust_cleaning_size),
      floor_mopping: parseInt(sectionDetail.floor_mopping),
      floor_mopping_size: parseInt(sectionDetail.floor_mopping_size),
      floor_burnishing: parseInt(sectionDetail.floor_burnishing),
      floor_burnishing_size: parseInt(sectionDetail.floor_burnishing_size),
      cleaning_table: parseInt(sectionDetail.cleaning_table),
      misting_table: parseInt(sectionDetail.misting_table),
      school: props.newSchoolId,
    };
    console.log(cleaningDetails);
    dispatch(createCleanUp(cleaningDetails));
    setSectionDetail({});
    props.onCloseModal();
    setCloseModal(true);
  };

  const updateHandler = async (e) => {
    debugger;
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
                        <select name="dust_cleaning" className="form-control" list="dust_cleaning" onChange={handleChange} id="room_type">
                          <option hidden></option>
                          <option style={{ fontWeight: 'bolder' }} id={1} value={1}>
                            Dust MOP
                          </option>
                          <option style={{ fontWeight: 'bolder' }} id={2} value={2}>
                            Ride on Sweeper
                          </option>
                        </select>
                        <label htmlFor="name">Tool used in dust cleaning</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-floating mb-3 go-bottom">
                        <input
                          type="number"
                          className="form-control"
                          name="dust_cleaning_size"
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
                        <select name="floor_mopping" className="form-control" list="floor_mopping" onChange={handleChange} id="room_type">
                          <option hidden></option>
                          <option style={{ fontWeight: 'bolder' }} id={3} value={3}>
                            Flat mop
                          </option>
                          <option style={{ fontWeight: 'bolder' }} id={4} value={4}>
                            String mop
                          </option>
                          <option style={{ fontWeight: 'bolder' }} id={5} value={5}>
                            Ride on scrubber
                          </option>
                        </select>
                        <label htmlFor="name">Tool used in floor mopping</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-floating mb-3 go-bottom">
                        <input
                          type="number"
                          className="form-control"
                          name="floor_mopping_size"
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
                        <select name="floor_burnishing" className="form-control" list="floor_burnishing" onChange={handleChange} id="room_type">
                          <option hidden></option>
                          <option style={{ fontWeight: 'bolder' }} id={6} value={6}>
                            Ride on burnisher
                          </option>
                          <option style={{ fontWeight: 'bolder' }} id={7} value={7}>
                            Electric burnisher
                          </option>
                        </select>
                        <label htmlFor="name">Tool used in floor burnishing</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-floating mb-3 go-bottom">
                        <input
                          type="number"
                          className="form-control"
                          name="floor_burnishing_size"
                          value={sectionDetail.name}
                          onChange={handleChange}
                          id="floatingInput"
                          required={true}
                          placeholder="Building Name"
                        />
                        <label htmlFor="name">Tool Size</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <div className="form-floating mb-5 go-bottom">
                        <select name="cleaning_table" className="form-control" list="cleaning_table" onChange={handleChange} id="room_type">
                          <option hidden></option>
                          <option style={{ fontWeight: 'bolder' }} id={8} value={8}>
                            spray and wipe
                          </option>
                          <option style={{ fontWeight: 'bolder' }} id={9} value={9}>
                            pretreat
                          </option>
                          <option style={{ fontWeight: 'bolder' }} id={10} value={10}>
                            pads
                          </option>
                        </select>
                        <label htmlFor="name">Tool used in cleaning tables</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <div className="form-floating mb-5 go-bottom">
                        <select name="misting_table" className="form-control" list="misting_table" onChange={handleChange} id="room_type">
                          <option hidden></option>
                          <option style={{ fontWeight: 'bolder' }} id={11} value={11}>
                            Electostatic sprayer (if they do it)
                          </option>
                        </select>
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
