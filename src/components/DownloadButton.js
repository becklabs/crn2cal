import React from 'react';
import {eventsToCal} from './data/events'

// A button that checks if all the crns have a status of success, and if so, calls eventsToCal and downloads the ics file
function DownloadButton({crns, setCrns, termID}) {

  function handleDownload() {
    // if all statuses are success and there is at least one crn
    if (crns.every((crn) => crn.status === "success") && crns.length > 0) {
      // filter out the crns that have a status of success
      const filteredCrns = crns.filter((crn) => crn.status === "success");
      const events = filteredCrns.map((crn) => crn.events).flat();
      eventsToCal(events, termID);
    }
  }

  // if all statuses are success or pending and there is at least one crn, then the button is enabled
  const enabled = (crns.every((crn) => crn.status === "success") && crns.length > 0);

  return (
    <div className="download-button">
      <button
        className="btn btn-light"
        onClick={handleDownload}
        disabled={!enabled}
      >
        Download .ics
      </button>
    </div>
  );

  /*
  return (
    <button type = "button" className="btn btn-light" onClick={handleDownload} disabled>Download .ics</button>
  );
  */
}
  
export default DownloadButton;