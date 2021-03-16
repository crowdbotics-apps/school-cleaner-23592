import React,{ useState, useEffect } from 'react';
import device from "../../assets/images/device.jpg";
import { signup } from '../../modules/actions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { signup: { loading, success, error },
  } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (success) {
      history.push('/dashboard');
    }
  }, [success]);

  const [signUpDetails, setSignUpDetails] = useState({first_name: '', last_name: '', email: '', phone_no:'', password: '', confirm_password: '', employer_code: '' });
  const [validated, setValidated] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setSignUpDetails({ ...signUpDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(signup(signUpDetails));
    } else {
      setValidated(true);
    }
  };
  return (
    <div class="device-holder d-flex h-100">
      <div class="align-items-center d-flex flex-fill justify-content-center login-content">
        <div class="login-holder">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-4">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="First Name" name="first_name" value={signUpDetails.first_name}
                      onChange={handleChange}/>
                    <label for="name">First Name</label>
                </div>
              </div>
              <div class="mb-4">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Lasr Name" name="last_name" value={signUpDetails.last_name}
                      onChange={handleChange}/>
                    <label for="name">Last Name</label>
                  </div>
              </div>
              <div class="mb-4">
                <div class="form-floating mb-3 go-bottom">
                  <input type="email" class="form-control" id="floatingInput" placeholder="samplee@example.com" name="email" value={signUpDetails.email}
                  onChange={handleChange}/>
                  <label for="name">Email address</label>
                </div>
              </div>
              <div class="mb-4">
                  <div class="form-floating">
                    <input type="number" class="form-control" id="floatingInput" placeholder="Phone no" name="phone_no" value={signUpDetails.phone_no} onChange={handleChange}/>
                    <label for="name">Phone no.</label>
                  </div>
              </div>
              <div class="mb-4">
                    <div class="form-floating">
                      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" value={signUpDetails.password} onChange={handleChange}/>
                      <label for="floatingPassword">Password</label>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="form-floating">
                      <input type="password" class="form-control" id="floatingPassword" placeholder="Confirm Password" name="confirm_password" value={signUpDetails.confirm_password} onChange={handleChange}/>
                      <label for="floatingPassword">Confirm Password</label>
                    </div>
                </div>
                <div class="mb-4">
                  <div class="form-floating">
                    <input type="number" class="form-control" id="floatingInput" placeholder="Employer Code" name="employer_code" value={signUpDetails.employer_code} onChange={handleChange}/>
                    <label for="name">Employer Code</label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary w-100">REGISTER</button>
            </form>
        </div>  
      </div>
      <div class="image-holder flex-fill">
          <img src={device} alt="" class="image-responsive" />
          <div class="image-caption">
              <div class="caption-head">
                <h2>Cleaning Services</h2>
                <p>A one line description of company’s motto</p>
              </div>
              <div class="caption-footer">
                  <a href="#" class="new-user d-inline-block">Already registered ?</a>
                  <a class="btn btn-light w-100" href="/" role="button">Login</a>
              </div>
          </div>
      </div>
    </div>   
  );
}
