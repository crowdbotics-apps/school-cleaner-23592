import '../../main/App.css';
import React,{ useState, useEffect } from 'react';
import device from "../../assets/images/device.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../modules/actions/AuthActions';
import CSRFToken from '../../utils/csrfToken';




const LogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { login: { loading, success, error },
  } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (success) {
      history.push('/dashboard');
    }
  }, [success]);

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

  const handleClick = () => {
    alert("forget password clicked")
  }

  return (
    <div class="device-holder d-flex h-100">
      <div class="image-holder flex-fill">
          <img src={device} class="image-responsive"/>
          <div class="image-caption">
              <div class="caption-head">
                <h2>Cleaning Services</h2>
                <p>A one line description of company’s motto</p>
              </div>
              <div class="caption-footer">
                  <a href="#" class="new-user d-inline-block">New User ?</a>
                  <a class="btn btn-light w-100" href="/signup" role="button">Sign up</a>
              </div>
          </div>
      </div>
      <div class="align-items-center d-flex flex-fill justify-content-center login-content">
          <div class="login-holder">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <CSRFToken />
                <div class="mb-4">
                  <div class="form-floating mb-3 go-bottom">
                      <input type="email" class="form-control" id="floatingInput"
                       placeholder="sample@example.com"
                       name="email"
                       value={loginDetails.email}
                      onChange={handleChange}>
                      </input>
                      <label for="name">Email address</label>
                    </div>
                </div>
                 <div class="mb-4">
                    <div class="form-floating">
                      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
                      <label for="floatingPassword">Password</label>
                    </div>
                </div>
                <div class="mb-4 form-check d-flex justify-content-between">
                  <div>
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"
                    name="password"
                    value={loginDetails.password}
                    onChange={handleChange}>
                    </input>
                    <label class="form-check-label" for="exampleCheck1">Remember me</label>
                  </div>
                  <a href="#" class="forgot-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Forgot Password ?</a>
                </div>
                <button type="submit" class="btn btn-primary w-100">Continue</button>
              </form>
          </div>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-holder">
                <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-body">
                        <h2 class="modal-title" id="exampleModalLabel">Forgot Password</h2>
                        <p class="modal-details">Password reset link will be sent to your verified email address</p>
                          <div class="mb-4">
                            <div class="form-floating mb-3 go-bottom">
                                <input type="email" class="form-control" id="floatingInput" placeholder="sample@example.com" />
                                <label for="name">Email address</label>
                              </div>
                          </div>
                        <button type="button" class="btn btn-primary w-100">Submit</button>
                      </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
  );
}


export default LogIn;