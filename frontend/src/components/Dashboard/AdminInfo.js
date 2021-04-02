import React, { useEffect, useState } from 'react';
import emailIcon from "../../assets/images/email-icon.svg";
import phoneNumber from "../../assets/images/phone-number.svg";

const AdminInfo = props => {

  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    setAdmin(props.admin);
  }, [props]);

  return (
    <div className="modal fade" id="info-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-holder">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <ul className="admin-info m-0">
                <li>
                  <div className="mb-2">
                      <div>
                        <h4 className="m-0">{props.admin.name}</h4>
                      </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 d-flex">
                      <div className="icon-holder">
                        <img src={emailIcon} alt="" className="image-responsive" />
                      </div>
                      <div className="admin-email">
                        johndoe21@example.com
                      </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 d-flex">
                      <div className="icon-holder">
                        <img src={phoneNumber} alt="" className="image-responsive" />
                      </div>
                      <div className="admin-phone">
                        <a href="tel: 9876543210 ">9876543210</a>
                      </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInfo;
