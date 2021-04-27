import React from "react";

export default function UnselectSection({ selectionname }) {

    return (
        <div className="section-block" >
            <div className="image-holder">
                <object data="assets/section-img.jpg" width={320} height={244}> </object>
                <h5>Select a {selectionname} to view details</h5>
            </div>
        </div >
    )
}
