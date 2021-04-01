import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDistrict, generateCode  } from '../../modules/actions/DistrictActions';


const DistrictForm = props => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    setDistrictDetails({name: props.district.name, logo: props.district.logo, code: props.district.code, admins: props.district.admins})
    setBase64Image(props.district.logo)
  }, []);

  const [ validated, setValidated] = useState(false);
  const [ districtDetails, setDistrictDetails ] = useState({ name: '', logo: '', code: 'E4125', admins: []});
  const [ base64Image, setBase64Image ] = useState('');


  const handleImageChange = async (e) => {
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
    console.log("----------------------------")
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(updateDistrict({name: districtDetails.name, logo: base64Image, code: props.district.code, admins: []}))
      setDistrictDetails({ name: '', logo: '', code: ''})
      setBase64Image('')
    } else {
      setValidated(true);
    }
  };

  const handleChange = ({ target: {name, value } }) => {
    setDistrictDetails({ ...districtDetails, [name]: value });
  };


  return(
    <div className="modal fade" id="update_District"  aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-holder">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <h2 className="modal-title mb-4" id="exampleModalLabel">Update District</h2>
                <div className="mb-4">
                  <div className="form-floating mb-3 go-bottom">
                    <input 
                      type="text" 
                      className="form-control"
                      name="name"
                      value={districtDetails.name}
                      onChange={handleChange}
                      required={true}
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
                        required={true}
                        id="select-image" 
                        className="btn btn-outline-secondary" 
                        style={{ display: 'none' }}
                       />
                      <label for="select-image" className="btn btn-outline-secondary btn-lg d-flex align-items-center text-uppercase">Select image</label>
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
                      id="floatingInput" 
                      placeholder="District code" 
                    />
                    <label htmlFor="name">District code</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary text-uppercase">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistrictForm;
