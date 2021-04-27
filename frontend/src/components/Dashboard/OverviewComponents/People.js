import React, { useState } from "react";
import PeopleDetails from "./PeopleDetails"

export default function People() {
    const [showDetail, setShowDetail] = useState(true);
    const handelClick = () => {
        setShowDetail(false);
    }
    return (

        <div className="tab-pane fade people-tab-holder" id="People" role="tabpanel" aria-labelledby="People">
            <div className="tabs-inner-content-holder">
                <div className="tabs-siderbar p-0">
                    <ul className="d-flex justify-content-between nav nav-tabs mt-2" id="myTab" role="tablist">
                        <li className="nav-item text-center col" role="presentation">
                            <button className="nav-link active w-100" id="Cleaners-tab" data-bs-toggle="tab" data-bs-target="#Cleaners" type="button" role="tab" aria-controls="Cleaners" aria-selected="true">Cleaners</button>
                        </li>
                        <li className="nav-item text-center col" role="presentation">
                            <button className="nav-link w-100" id="supervisors-tab" data-bs-toggle="tab" data-bs-target="#supervisors" type="button" role="tab" aria-controls="supervisors" aria-selected="false">supervisors</button>
                        </li>
                    </ul>
                    <div className="section-list-holder mt-0">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="Cleaners" role="tabpanel" aria-labelledby="Cleaners-tab">
                                <ul className="p-0 m-0">
                                    <li className="list-item">
                                        <div className="item-label" onClick={handelClick}>Abe Doe</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="supervisors" role="tabpanel" aria-labelledby="supervisors-tab">
                                supervisors
							</div>
                        </div>
                    </div>
                </div>
                <div className="tabs-inner-block">
                    {
                        showDetail ?
                            <div className="section-block" >
                                <div className="image-holder">
                                    <object data="assets/people-select-img.svg" width={320} height={244}> </object>
                                    <h5>Select a cleaner/supervisor to view details</h5>
                                </div>
                            </div > :
                            <PeopleDetails
                            />
                    }
                </div>
            </div>
        </div>
    )
}