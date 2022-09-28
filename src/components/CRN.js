import React from 'react';

import {X} from 'react-bootstrap-icons';

import "./style/components.css";

//library.add(faTrashCan);

// A list element that displays a crn, an x to delete it
function CRN({crn, setCrns, crns}) {

  function handleDelete() {
    setCrns(crns.filter((c) => c.crn !== crn.crn));
  }

  // If the status is pending, the crn is disabled
  const enabled = (crn.status === "success");

  return (
    <div className="rounded">
      <li className="list-group-item d-flex justify-content-between align-items-center" >
      <div>
        {crn.crn}
      <button className="delete-btn" onClick = {handleDelete}> <X/></button>
      </div>
      </li>
    </div>
  );
} 

export default CRN;