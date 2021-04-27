import React, { useState } from "react";
import InspectionCard from "./InspectionCard";
import UnselectSection from "./UnselectSection";
import InsepectionDetails from "./InspectionDetails";
export default function Inspection({ date, code, name, grade }) {
    const [showDetails, setShowDetails] = useState(true);
    const handleClick = () => {
        setShowDetails(false);
    }
    return (
        <div className="tab-pane fade" id="Inspections" role="tabpanel" aria-labelledby="inspections">
            <div className="tabs-inner-content-holder">
                <div className="tabs-siderbar">
                    <div className="section-list-holder inspection-sidbar">
                        <InspectionCard
                            date="Mon, 12/01/21 3:40 PM"
                            code="#1007"
                            name="Jason Smith"
                            grade="86%"
                            handleClick={handleClick}
                        />


                    </div>
                </div>
                <div className="tabs-inner-block">
                    {
                        showDetails ?
                            <UnselectSection
                                selectionname="inspection" /> :
                            <InsepectionDetails />
                    }

                </div>
            </div>

        </div>
    )
}