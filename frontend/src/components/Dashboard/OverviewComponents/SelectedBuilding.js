import React from 'react';
import './Styles.scss';
export default function SelectedBuilding(props) {
  return (
    <div className="main-content-top-banner">
      <div className="building-image ">
        <div style={{ height: '180px' }}>
          <img src={props.image} alt="" className="image-responsive w-100 h-100 image" />
        </div>
        <div className="building-caption p10">
          <div className="caption-holder p10">
            <div className="building-heading-holder d-flex justify-content-between">
              <h3 className="m-0">{props.name}</h3>
              <div className="icon-holder">
                <object data="assets/dotted-icon-white.svg" width={20} height={20}>
                  {' '}
                </object>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
