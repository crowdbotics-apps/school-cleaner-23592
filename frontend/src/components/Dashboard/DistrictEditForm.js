import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDistrict, generateCode  } from '../../modules/actions/DistrictActions';
import CSRFToken from '../../utils/csrfToken';
import $ from 'jquery';

const DistrictForm = props => {
  const dispatch = useDispatch();
  const [ validated, setValidated] = useState(false);
  const { name, logo, code, admins } = props.district
  const [ districtDetails, setDistrictDetails ] = useState({ name: '', logo: '', code: 'E4125', admins: []});
  const [ base64Image, setBase64Image ] = useState('');

  useEffect(() => {
    setDistrictDetails({ name: name, logo: logo, code: code, admins: admins })
    setBase64Image(logo)
  }, [props.district]);

  const handleImageChange = async (e) => {
    console.log('handleImageChange');
    const file = e.target.files[0]
    const base64 = await convertToBase64(file);
    setBase64Image(base64);
    setDistrictDetails({ ...districtDetails, logo: base64})
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
    })
  };

  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(updateDistrict({
        id: props.district.id, 
        name: districtDetails.name, 
        logo: base64Image, 
        code: code, 
        admins: []
      }));
      $('#update_District').modal('hide');
      setDistrictDetails({ name: '', logo: '', code: ''})
      setBase64Image('')
    } else {
      setValidated(true);
    }
  };

  const hideUpdateModal = (e) =>{
    $('#update_District').modal('hide');
    setDistrictDetails({ name: '', logo: '', code: ''})
    setBase64Image('')
  }

  const handleChange = ({ target: {name, value } }) => {
    setDistrictDetails({ ...districtDetails, [name]: value });
  };


  return(
    <div className="modal fade" id="update_District"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-holder">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <CSRFToken />
                <h2 className="modal-title mb-4" id="exampleModalLabel">Update District</h2>
                <div className="mb-4">
                  <div className="form-floating mb-3 go-bottom">
                    <input 
                      type="text" 
                      className="form-control"
                      name="name"
                      value={districtDetails.name}
                      onChange={handleChange}
                      id="floatingInput" 
                      placeholder="District Name" 
                    />
                    <label htmlFor="name">District Name</label>
                  </div>
                </div>
                <div className="logo-uploader mb-4">
                  <div className="logo-uploader-header d-flex align-items-center justify-content-between mb-3">
                    <div>District logo</div>
                      <input 
                        type="file" 
                        onChange={handleImageChange}
                        id="select-image-new" 
                        className="btn btn-outline-secondary" 
                        style={{ display: 'none' }}
                       />
                      <label for="select-image-new" className="btn btn-outline-secondary btn-lg d-flex align-items-center text-uppercase">Select image</label>
                  </div>
                  <div className="logo-uploader-area">
                    { base64Image == '' ? <p>Drag & drop the image in this section</p> : <img src={base64Image} height="100px" />
                    }
                  </div>
                </div>
                <div className="mb-4">
                  <div className="form-floating mb-3 go-bottom">
                    <input 
                      type="text"
                      name="code"
                      value={districtDetails.code}
                      onChange={handleChange}
                      className="form-control" 
                      id="floatingInput2" 
                      placeholder="District code"
                      readOnly
                    />
                    <label htmlFor="name">District code</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary text-uppercase">Update</button>
                <button type="button" className="ml-4 btn btn-primary" onClick={hideUpdateModal}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistrictForm;
