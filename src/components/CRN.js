import React from 'react';

// A list element that displays a crn, an x to delete it and its status: loading animation if it is pending, a checkmark if it is successful, or an x if it is failed
function CRN({crn, setCrns, crns}) {

  function handleDelete() {
    setCrns(crns.filter((c) => c.crn !== crn.crn));
  }

  return (
    // From left to right: status, crn, delete button
    // Render the delete button if the status is not pending
    <div className="crn">
      <li><span className="fa-li"><i className="fa-solid fa-check-square"></i></span>
      <span>{crn.crn}</span>
      <button className="delete-btn" onClick = {handleDelete}>
        <i className="fa-solid fa-times">Delete</i>
      </button>
      </li>
    </div>
  );
} 

export default CRN;