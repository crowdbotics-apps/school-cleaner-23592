import React from 'react';
import RoomForm from './RoomForm';

const roomsType = [
  {
    id: 1,
    name: 'Small classroom',
  },
  {
    id: 2,
    name: 'Medium classroom',
  },
  {
    id: 3,
    name: 'Large classroom',
  },
  {
    id: 4,
    name: 'Single bathroom',
  },
  {
    id: 5,
    name: 'Double bathroom',
  },
  {
    id: 6,
    name: 'Triple bathroom',
  },
  {
    id: 7,
    name: 'Quad bathroom',
  },
  {
    id: 8,
    name: 'Hallway',
  },
  {
    id: 9,
    name: 'Cafeteria',
  },
  {
    id: 10,
    name: 'Kitchen',
  },
  {
    id: 11,
    name: 'Office',
  },
  {
    id: 12,
    name: 'Gym',
  },
  {
    id: 13,
    name: 'Auditorium',
  },
  {
    id: 14,
    name: 'Locker room',
  },
];

export default function Rooms({ heading, name, count, unit, sections, roomSpecs }) {
  console.log('roomSpecs', roomSpecs, unit);
  return (
    <>
      <div className="section-details">
        <div className="d-flex justify-content-between p15 section-details-header align-items-center">
          <div className="section-header">
            <h5>{heading}</h5>
          </div>
          <div className="d-flex header-button justify-content-between">
            <a href="#" className="btn btn-outline-secondary d-flex align-items-center text-uppercase" data-bs-toggle="modal" data-bs-target="#add_room">
              <img src="assets/plus-icon.svg" alt="" className="mr5 image-responsive" />
              <span>Custom Room</span>
            </a>
          </div>
          <RoomForm />
        </div>
        <div className="section-details-content">
          <div className="report-header">
            <div className="list-label">{name}</div>
            <div className="list-content">{count}</div>
          </div>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="Details" role="tabpanel" aria-labelledby="Details-tab">
              <div className="inner-tab-section-list-holder">
                <ul className="section-list-block p-0 m-0">
                  {roomsType?.map((i, index) => (
                    <>
                      {roomSpecs?.map((j, index) => (
                        <>
                          {i.id === j.room_type ? (
                            <li className="inner-tab-section-list-item d-flex justify-content-between">
                              <div className="list-label">{i.name}</div>
                              <div className="list-content">
                                {unit === 'sq. ft'
                                  ? j.square_feet
                                  : unit === 'hrs'
                                  ? j.estimated_time_to_clean
                                  : unit === 'products'
                                  ? j.product_usage !== null
                                    ? j.product_usage
                                    : '0'
                                  : unit === 'rooms'
                                  ? j.count
                                  : null}
                              </div>
                            </li>
                          ) : null}
                        </>
                      ))}
                    </>
                  ))}

                  {/* <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">classrooms</div>
                    <div className="list-content">32</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Hallways</div>
                    <div className="list-content">07</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Restrooms</div>
                    <div className="list-content">06</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Offices</div>
                    <div className="list-content">04</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Gyms</div>
                    <div className="list-content">02</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Libraries</div>
                    <div className="list-content">01</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-pane fade" id="Rooms" role="tabpanel" aria-labelledby="Rooms-tab">
              <div className="iinner-tab-section-list-holder-without-scroll room-block">
                <ul className="section-list-block p-0 m-0">
                  <li className="border d-flex flex-column inner-tab-section-list-item justify-content-between m15">
                    <div className="list-label">Room 103</div>
                    <div className="room-details">
                      <span>400 sq. ft.</span>
                      <span>21 desks</span>
                      <span>08 windows</span>
                    </div>
                  </li>
                  <li className="border d-flex flex-column inner-tab-section-list-item justify-content-between m15">
                    <div className="list-label">Room 103</div>
                    <div className="room-details">
                      <span>400 sq. ft.</span>
                      <span>21 desks</span>
                      <span>08 windows</span>
                    </div>
                  </li>
                  <li className="border d-flex flex-column inner-tab-section-list-item justify-content-between m15">
                    <div className="list-label">Room 103</div>
                    <div className="room-details">
                      <span>400 sq. ft.</span>
                      <span>21 desks</span>
                      <span>08 windows</span>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div className="inner-tab-section-list-holder">
                <ul className="section-list-block p-0 m-0">
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Abe Doe</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Bishan Gupta</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Bueran Hendricks</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Bunny Reagan</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Chris Morris</div>
                  </li>
                  <li className="inner-tab-section-list-item d-flex justify-content-between">
                    <div className="list-label">Dom Bess</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
