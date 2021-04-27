import React, { useEffect, useState } from 'react';
import emailIcon from "../../assets/images/email-icon.svg";
import phoneNumber from "../../assets/images/phone-number.svg";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const AdminInfo = props => {

  const [admin, setAdmin] = useState()

  useEffect(() => {
    setAdmin(props.admindetails);
    console.log("detail admin", props.admindetails)
  }, [props]);

  return (
    <Modal id="adimnModal" center open={props.open} onClose={props.onCloseModal}>
      <div style={{ textAlign: "left" }}>
        <div className="mb-2">
          <div>
            <h4 className="m-0">{props.admindetails.name}</h4>
          </div>
          <div className="mb-2 d-flex">
            <div className="icon-holder">
              <img src={emailIcon} alt="" className="image-responsive" />
            </div>
            <div className="admin-email">
              {props.admindetails.email}
            </div>
          </div>
          <div className="mb-2 d-flex">
            <div className="icon-holder">
              <img src={phoneNumber} alt="" className="image-responsive" />
            </div>
            <div className="admin-phone">
              <a href="tel: 9876543210 ">{props.admindetails.phone}</a>
            </div>
          </div>
        </div>

      </div>
      {/* <div className="modal-holder">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <ul className="admin-info m-0">
                <li>
                  <div className="mb-2">
                    <div>
                      <h4 className="m-0">{props.admindetails.name}</h4>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 d-flex">
                    <div className="icon-holder">
                      <img src={emailIcon} alt="" className="image-responsive" />
                    </div>
                    <div className="admin-email">
                      {props.admindetails.email}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 d-flex">
                    <div className="icon-holder">
                      <img src={phoneNumber} alt="" className="image-responsive" />
                    </div>
                    <div className="admin-phone">
                      <a href="tel: 9876543210 ">{props.admindetails.phone}</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Modal>
  );
}

export default AdminInfo;
