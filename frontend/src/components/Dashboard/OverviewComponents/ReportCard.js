import React from 'react';
export default function ReportCards({ name, number, handleClick, unit, id }) {
  return (
    <div id={`section-list-item-${id}`} className="section-list-item " onClick={handleClick}>
      <div className="section-list-header d-flex justify-content-between mb20">
        <h5>{name}</h5>
        <div className="d-flex icon-holder">
          <object data="assets/arrow-right.svg" width="20" height="20">
            {' '}
          </object>
        </div>
      </div>
      <div className="section-header align-items-end">
        <div>
          <h6 className="mb-2">
            {number} <span>{unit}</span>
          </h6>
        </div>
      </div>
    </div>
  );
}
