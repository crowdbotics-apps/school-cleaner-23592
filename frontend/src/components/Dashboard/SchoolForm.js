import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSchool } from '../../modules/actions/SchoolActions';
import CSRFToken from '../../utils/csrfToken';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const SchoolForm = (props) => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [buildingDetail, setBuildingDetail] = useState({ name: '', logo: '' });
  const [base64Image, setBase64Image] = useState('');
  const [closeModal, setCloseModal] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBase64Image(base64);
    setBuildingDetail({ ...buildingDetail, logo: base64 });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitHandler = async (e) => {
    console.log('props.district', props.district);
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      await dispatch(createSchool({ name: buildingDetail.name, image: buildingDetail.logo, district: props.district }));
      await props.fetchSchool();
      props.setOpenAddBulidingModal(true);
      setBuildingDetail({ name: '', logo: '' });
      setBase64Image('');
    } else {
      setValidated(true);
    }
  };

  const handleChange = async ({ target: { name, value, files } }) => {
    if (name === 'logo') {
      const file = files[0];
      const base64 = await convertToBase64(file);
      setBuildingDetail({ ...buildingDetail, [name]: base64 });
    } else {
      setBuildingDetail({ ...buildingDetail, [name]: value });
    }
  };

  return (
    <div className="modal fade" id="add_School" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div className="modal-holder">
        <div className="modal-dialog">
          <div style={{ border: 'none' }} className="modal-content">
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <CSRFToken />
                <h2 className="modal-title mb-4" id="ModalLabel">
                  Add Building
                </h2>
                <div className="mb-4">
                  <div className="form-floating mb-3 go-bottom">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={buildingDetail.name}
                      onChange={handleChange}
                      required={true}
                      id="floatingInput"
                      placeholder="Building Name"
                    />
                    <label htmlFor="name">School Name</label>
                  </div>
                </div>
                <div className="logo-uploader mb-4">
                  <div className="logo-uploader-header d-flex align-items-center justify-content-between mb-3">
                    <div>Building Image</div>
                    <input type="file" onChange={handleImageChange} required={true} id="select-image" className="btn btn-outline-secondary" style={{ display: 'none' }} />
                    <label for="select-image" className="btn btn-outline-secondary btn-lg d-flex align-items-center text-uppercase">
                      Select image
                    </label>
                  </div>
                  <div className="logo-uploader-area logo-uploader-area-school">{base64Image == '' ? <p>Building Image</p> : <img src={base64Image} height="100px" />}</div>
                </div>
                <button type="submit" className="btn btn-primary text-uppercase" data-bs-toggle="modal" data-bs-target="#add_School">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolForm;
