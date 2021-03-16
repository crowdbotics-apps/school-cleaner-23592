import React,{ useState, useEffect } from 'react';
import eye from "../../assets/images/eye.svg";
import top from "../../assets/images/top.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../../modules/actions/AuthActions';
import './resetpassword.scss';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { resetPassword: { loading, success, error },
  } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const togglePassword = document.querySelector('#togglePassword');
    const togglePasswordConfirm = document.querySelector('#togglePasswordConfirm');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');
    togglePassword.addEventListener('click', function (e) {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
    });
    togglePasswordConfirm.addEventListener('click', function (e) {
      const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPassword.setAttribute('type', type);
    });
  }, []);

  const [resetDetails, setResetDetails] = useState({password: '', confirm_password: '' });
  const [validated, setValidated] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setResetDetails({ ...resetDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(resetPassword(resetDetails));
    } else {
      setValidated(true);
    }
  };


  return (
    <div class="reset-password">
      <div class="reset-password-holder">
        <div class="banner">
            <img src={top} alt="" class="image-responsive"/>
            <div class="caption-head">
              <h2>Cleaning Services</h2>
              <p>A one line description of company’s motto</p>
            </div>
        </div>
        <div class="form-holder">
          <h2>Password Reset</h2>
          <div class="form-box">
            <form onSubmit={handleSubmit}>
              <div class="mb-4">
                <div class="form-floating password-holder">
                  <input type="password" class="form-control" id="password" placeholder="New Password" name="password" value={resetDetails.password} onChange={handleChange} required={true}/>
                  <label for="floatingPassword">New Password</label>
                  <img src={eye} alt="" class="image-responsive eye-icon" id="togglePassword"/>
                </div> 
              </div>
              <div class="mb-4">
                <div class="form-floating password-holder">
                  <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" name="confirm_password" value={resetDetails.confirm_password} onChange={handleChange} required={true}/>
                  <label for="floatingPassword">Confirm Password</label>
                  <img src={eye} alt="" class="image-responsive eye-icon" id="togglePasswordConfirm"/>
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default ResetPassword;
