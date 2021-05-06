import React, { useState } from 'react';

import UnselectSection from './UnselectSection';
import Rooms from './Rooms';
import ReportCards from './ReportCard';

export default function Reports({ name, roomSpecs, report }) {
  const [heading, setHeading] = useState('');
  const [colName, setColName] = useState('');
  const [count, setCount] = useState('');
  const [unit, setUnit] = useState('');
  const [ids, setIds] = useState(0);

  const handleClick = (heading, name, count, unit, id) => {
    if (ids === 0) {
      document.getElementById(`section-list-item-${id}`).style.background = '#b4dbdb';
      setHeading(heading);
      setColName(name);
      setCount(count);
      setUnit(unit);
      setIds(id);
    } else {
      document.getElementById(`section-list-item-${ids}`).style.background = '#f2f6f6';
      document.getElementById(`section-list-item-${id}`).style.background = '#b4dbdb';
      setHeading(heading);
      setColName(name);
      setCount(count);
      setUnit(unit);
      setIds(id);
    }
  };
  const Table = () => {
    if (heading) {
      return <Rooms roomSpecs={roomSpecs} heading={heading} name={colName} count={count} unit={unit} />;
    } else {
      return <UnselectSection selectionname="cards" />;
    }
  };
  return (
    <div className="tab-pane fade" id="reports" role="tabpanel" aria-labelledby="reports">
      <div className="tabs-inner-content-holder">
        <div style={{ height: '100vh' }} className="tabs-siderbar">
          <div className="section-list-holder report-holder">
            <ReportCards
              name="Total Area"
              number={report?.total_area ? report?.total_area : 0}
              unit="sq. ft"
              id={1}
              handleClick={() => handleClick('Total Area', 'Room Type', 'Total Area', 'sq. ft', 1)}
            />
            <ReportCards
              name="Total Rooms"
              number={report?.total_rooms ? report?.total_rooms : 0}
              unit="rooms"
              id={2}
              handleClick={() => handleClick('Total Rooms', 'ROOM TYPE', 'TOTAL COUNT', 'rooms', 2)}
            />
            <ReportCards
              name="Cleaning Hours Needed"
              number={report?.estimated_time_to_clean ? report?.estimated_time_to_clean : 0}
              unit="hrs"
              id={3}
              handleClick={() => handleClick('Cleaning Hours Needed', 'ROOM TYPE', 'Total TIME', 'hrs', 3)}
            />

            <ReportCards
              name="Product Usage Estimates"
              number={report?.product_usage_estimation ? report?.product_usage_estimation : 0}
              unit="products"
              id={4}
              handleClick={() => handleClick('Total Sections', 'Room Type', 'TOTAL COUNT', 'products', 4)}
            />
            <ReportCards
              name="Average Inspection Rating"
              number={report?.total_sections ? report?.total_sections : 0}
              unit="%"
              id={5}
              handleClick={() => handleClick('Total Sections', 'Room Type', 'TOTAL COUNT', '%', 5)}
            />
          </div>
        </div>
        <div className="tabs-inner-block">
          {
            // showDetails ?
            //     <UnselectSection
            //         selectionname="cards" /> :
            //     <Rooms />
            <Table />
          }
        </div>
      </div>
    </div>
  );
}
