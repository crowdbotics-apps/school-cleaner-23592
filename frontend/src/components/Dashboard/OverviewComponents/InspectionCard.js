import React from "react"
export default function InspectionCard({ date, code, name, grade, handleClick }) {
    return (
        <div className="d-flex justify-content-between section-list-item" onClick={handleClick}>
            <div className="section-list-header d-flex justify-content-between flex-column">
                <h6>{date}</h6>
                <h4>Inspection {code}</h4>
                <div className="inspection-name">by {name}</div>
            </div>
            <div className="grade">
                <div className="grade-label">GRADE</div>
                <h3 className="grade-value">{grade}</h3>
            </div>
            <div className="d-flex icon-holder">
                <object data="assets/arrow-right.svg" width="20" height="20"> </object>
            </div>
        </div>
    )
}