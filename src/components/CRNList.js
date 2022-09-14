import React from 'react';
import CRN from './CRN';
// import fa-ul from font awesome


function CRNList({ crns, setCrns }) {
  return (
    <div className="crn-container">
      <ul className="list-group">
        {crns.map((crn) => (
          <CRN
            crn={crn}
            setCrns={setCrns}
            crns={crns}
            key={crn.crn}
          />
        ))}
      </ul>
    </div>
  );
}

export default CRNList;