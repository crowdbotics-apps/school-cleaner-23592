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
      props.onCloseModal();
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

  // const handleImageChange = (e) => {
  //   console.log(e.target.value);
  // };

  return (
    <Modal className="deleteModal" center open={props.open} onClose={props.onCloseModal}>
      <div className="modal-holder">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <CSRFToken />
              <form onSubmit={submitHandler}>
                <h2 className="modal-title mb-4" id="add_buildingLabel">
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
                    <label htmlFor="name">Building Name</label>
                  </div>
                </div>
                <div className="logo-uploader mb-4">
                  <div className="logo-uploader-header d-flex align-items-center justify-content-between mb-3">
                    <div>Building logo</div>
                    <input
                      // value={buildingDetail.logo}
                      type="file"
                      onChange={handleChange}
                      required={false}
                      id="select-image"
                      className="btn btn-outline-secondary"
                      style={{ display: 'none' }}
                      name="logo"
                    />
                    <label style={{ color: '#136162' }} for="select-image" className="btn btn-outline-secondary btn-lg d-flex align-items-center text-uppercase">
                      Select image
                    </label>
                  </div>
                  <div className="logo-uploader-area-school">
                    {buildingDetail.logo == '' ? <p>Drag & drop the image in this section</p> : <img src={buildingDetail.logo} height="100px" />}
                  </div>
                </div>
                <div className="btnContainer">
                  <button type="submit" className="btn btn-primary text-uppercase">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SchoolForm;
