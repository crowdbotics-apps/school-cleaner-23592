import React from "react";

export default function PeopleDetails() {
    return (<>
        <div className="people-details-holder inspections-details">
            <div className="header">
                <h5>Inspection Result - <span>Abe Doe</span></h5>
            </div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item mb-4">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <div className="d-flex justify-content-between w-100">
                                <div className="inspections-sub-details">
                                    <div className="date-label">
                                        Mon, 12/01/21 3:40 PM
								        	</div>
                                    <h4>Classroom 102</h4>
                                    <div class="inspection-name">cleaned by Tyler Harris</div>
                                </div>
                                <div className="points-holder pr30">
                                    <div className="points-label">Total Points</div>
                                    <h3 className="points-value">04/06</h3>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body p-0">
                            <div className="inspections-table pt-3">
                                <div className="d-flex header-block justify-content-between mb-3 px-3">
                                    <div className="header-label">PARAMETER</div>
                                    <div className="header-label">RESULT</div>
                                    <div className="header-label">POINTS</div>
                                </div>
                                <div className="content-block">
                                    <ul>
                                        <li className="">
                                            <div className="content-text p-3">
                                                <div className="content-parameter">
                                                    1. Floors swept and mopped
								        				</div>
                                                <div className="content-result">
                                                    PASS
								        				</div>
                                                <div className="content-points">
                                                    01
								        				</div>
                                            </div>
                                        </li>
                                        <li className="">
                                            <div className="content-text p-3">
                                                <div className="content-parameter">
                                                    2. Desktops cleaned and disinfected
								        				</div>
                                                <div className="content-result">
                                                    PASS
								        				</div>
                                                <div className="content-points">
                                                    01
								        				</div>
                                            </div>
                                        </li>
                                        <li className="fail">
                                            <div className="content-text p-3">
                                                <div className="content-parameter">
                                                    3. High dusting completed
								        				</div>
                                                <div className="content-result">
                                                    FAIL
								        				</div>
                                                <div className="content-points">
                                                    00
								        				</div>
                                            </div>
                                            <div className="content-inner-block">
                                                <h6>Inspection notes & images</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel et nulla ut amet porttitor dolor. Aenean vivamus tristique tincidunt est in porttitor.</p>
                                                <div className="d-flex image-holder justify-content-between">
                                                    <div className="image-block">
                                                        <object data="assets/classroom-1.jpg" width="160" height="120"> </object>
                                                    </div>
                                                    <div className="image-block">
                                                        <object data="assets/classroom-2.jpg" width="160" height="120"> </object>
                                                    </div>
                                                    <div className="image-block">
                                                        <object data="assets/classroom-3.jpg" width="160" height="120"> </object>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="">
                                            <div className="content-text p-3">
                                                <div className="content-parameter">
                                                    4. Trash emptied
								        				</div>
                                                <div className="content-result">
                                                    PASS
								        				</div>
                                                <div className="content-points">
                                                    01
								        				</div>
                                            </div>
                                        </li>
                                        <li className="">
                                            <div className="content-text p-3">
                                                <div className="content-parameter">
                                                    5. Glass cleaned
								        				</div>
                                                <div className="content-result">
                                                    PASS
								        				</div>
                                                <div className="content-points">
                                                    01
								        				</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>)
}