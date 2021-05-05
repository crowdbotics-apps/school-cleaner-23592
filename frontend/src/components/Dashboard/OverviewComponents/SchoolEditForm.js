import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSchool } from '../../../modules/actions/SchoolActions';
import CSRFToken from '../../../utils/csrfToken';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function SchoolEdit(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    setBuildingDetail({
      name: props.name,
      logo: props.image,
    });
    setBase64Image(props.image);
  }, []);

  const [validated, setValidated] = useState(false);
  const [buildingDetail, setBuildingDetail] = useState({ name: '', logo: '' });
  const [base64Image, setBase64Image] = useState('');
  const [closeModal, setCloseModal] = useState(false);

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
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      if (props.image === buildingDetail.logo) {
        const obj = {
          data: {
            name: buildingDetail.name,
            district: props.district,
          },
          school: props.id,
        };
        await dispatch(updateSchool(obj));
      } else {
        const obj = {
          data: {
            name: buildingDetail.name,
            image: buildingDetail.logo,
            district: props.district,
          },
          school: props.id,
        };
        await dispatch(updateSchool(obj));
      }
      props.setOpenEditModal(false);
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
      setBase64Image(base64);
      setBuildingDetail({
        ...buildingDetail,
        logo: base64,
      });
      //   setBuildingDetail({ ...buildingDetail, [name]: base64 });
    } else {
      setBuildingDetail({ ...buildingDetail, name: value });
    }
  };
  const handleImagesChange = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    const base64 = await convertToBase64(file);

    setBase64Image(base64);
    setBuildingDetail({
      ...buildingDetail,
      logo: base64,
    });
    // setBuildingDetail({ ...buildingDetail, logo: base64 });
  };

  return (
    <Modal className="deleteModal" center open={props.open} onClose={props.onCloseModal}>
      <div className="modal-holder">
        <div className="modal-dialog">
          <div style={{ border: 'none' }} className="modal-content">
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <CSRFToken />
                <h2 className="modal-title mb-4" id="ModalLabel">
                  Edit Building
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
                    <input type="file" onChange={handleImagesChange} id="select-images" className="btn btn-outline-secondary" style={{ display: 'none' }} />
                    <label for="select-images" className="btn btn-outline-secondary btn-lg d-flex align-items-center text-uppercase">
                      Select image
                    </label>
                  </div>
                  <div className="logo-uploader-area logo-uploader-area-school">
                    {buildingDetail.logo == '' ? <p>Building Image</p> : <img src={buildingDetail.logo} height="100px" />}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary text-uppercase">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
