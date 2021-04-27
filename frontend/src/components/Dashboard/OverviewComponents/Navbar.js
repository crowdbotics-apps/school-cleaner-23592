import React from "react";

export default function Navbar() {
    return (
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#overveiw" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Overview</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#reports" type="button" role="tab" aria-controls="reports" aria-selected="false">Reports</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Inspections" type="button" role="tab" aria-controls="Inspections" aria-selected="false">Inspections</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#People" type="button" role="tab" aria-controls="People" aria-selected="false">People</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Budgeting" type="button" role="tab" aria-controls="Budgeting" aria-selected="false">Budgeting</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#products_needed" type="button" role="tab" aria-controls="products_needed" aria-selected="false">products needed</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#savings" type="button" role="tab"
                    aria-controls="savings" aria-selected="false">savings</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#cleaning_methods" type="button" role="tab"
                    aria-controls="nav-profile-tab" aria-selected="false">cleaning methods</button>
            </div>
        </nav>
    )
}