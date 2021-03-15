import '../../main/App.css';
import React,{ useState, useEffect } from 'react';
import device from "../../assets/images/device.jpg";
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../modules/actions/AuthActions';
import { Axios } from '../../api/axios';




const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

//   const { login: { loading, success, error },
//   } = useSelector(({ auth }) => auth);

//   useEffect(() => {
//     if (success) {
//       history.push('/dashboard');
//     }
//   }, [success]);

  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(login(loginDetails));
    } else {
      setValidated(true);
    }
  };

  return (
    <div class="reset-password">
    <div class="reset-password-holder">
        <div class="banner">
            <img src="assets/reset-banner.jpg" alt="" class="image-responsive"/>
            <div class="caption-head">
                <h2>Cleaning Services</h2>
                <p>A one line description of company’s motto</p>
            </div>
        </div>
        <div class="form-holder">
            <h2>Password Reset</h2>
        <div class="form-box">
            <div class="mb-4">
                <div class="form-floating password-holder">
                <input type="password" class="form-control" id="floatingPassword" placeholder="New Password" />
                <label for="floatingPassword">New Password</label>
                <img src="assets/eye.svg" alt="" class="image-responsive eye-icon" />
                </div>
            </div>
            <div class="mb-4">
                <div class="form-floating password-holder">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Confirm Password"/>
                <label for="floatingPassword">Confirm Password</label>
                <img src="assets/eye.svg" alt="" class="image-responsive eye-icon"/>
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Submit</button>
        </div>
        </div>
    </div>
    </div>

  );
}


export default ResetPassword;