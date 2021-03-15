import './App.css';
import React from 'react';
import device from './device.jpg';

export default function LogIn() {
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
                  <a class="btn btn-light w-100" href="#" role="button">Sign up</a>
              </div>
          </div>
      </div>
      <div class="align-items-center d-flex flex-fill justify-content-center login-content">
          <div class="login-holder">
              <h2>Login</h2>
              <form>
                <div class="mb-4">
                  <div class="form-floating mb-3 go-bottom">
                      <input type="email" class="form-control" id="floatingInput" placeholder="sample@example.com"></input>
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
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                    <label class="form-check-label" for="exampleCheck1">Remember me</label>
                  </div>
                  <a href="#" class="forgot-link">Forgot Password ?</a>
                </div>
                <button type="submit" class="btn btn-primary w-100">Continue</button>
              </form>
          </div>
      </div>
  </div>
  );
}
