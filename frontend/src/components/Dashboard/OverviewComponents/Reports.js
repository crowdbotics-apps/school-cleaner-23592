import React, { useState } from "react";
import UnselectSection from "./UnselectSection";
import Rooms from "./Rooms";
import ReportCards from "./ReportCard";

export default function Reports({ name, number, report }) {
    const [heading, setHeading] = useState("");
    const [colName, setColName] = useState("");
    const [count, setCount] = useState("");
    const [unit, setUnit] = useState("");


    const handleClick = (heading, name, count, unit) => {
        setHeading(heading)
        setColName(name)
        setCount(count)
        setUnit(unit)
    }
    const Table = () => {
        if (heading) {
            return <Rooms heading={heading} name={colName} count={count} unit={unit} />
        }
        else {
            return <UnselectSection
                selectionname="cards" />
        }
    }
    return (
        <div className="tab-pane fade" id="reports" role="tabpanel" aria-labelledby="reports">
            <div className="tabs-inner-content-holder">
                <div className="tabs-siderbar">
                    <div className="section-list-holder report-holder">
                        <ReportCards
                            name="Total Area"
                            number={report.total_area ? report.total_area : 0}
                            unit='sq. ft'
                            handleClick={() => handleClick('Total Area', 'Room Type', 'Total Area', 'sq. ft')}
                        />
                        <ReportCards
                            name="Cleaning Hours Needed"
                            number={report.estimated_time_to_clean ? report.estimated_time_to_clean : 0}
                            unit='hrs'
                            handleClick={() => handleClick('Cleaning Hours Needed', 'ROOM TYPE', 'Total TIME', 'hrs')}
                        />
                        <ReportCards
                            name="Total Rooms"
                            number={report.total_rooms ? report.total_rooms : 0}
                            unit='rooms'
                            handleClick={() => handleClick('Total Rooms', 'ROOM TYPE', 'TOTAL COUNT', '')}
                        />
                        <ReportCards
                            name="Total Sections"
                            number={report.total_sections ? report.total_sections : 0}
                            unit='sections'
                            handleClick={() => handleClick('Total Sections', 'Room Type', 'TOTAL COUNT', '')}
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
    )
}