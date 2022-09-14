import React from 'react';
import {eventsToCal} from './data/events'

// A button that checks if all the crns have a status of success, and if so, calls eventsToCal and downloads the ics file
function DownloadButton({crns, setCrns, termID}) {

  function handleDownload() {
    // if all statuses are success and there is at least one crn
    if (crns.every((crn) => crn.status === "success") && crns.length > 0) {
      const events = crns.map((crn) => crn.events).flat();
      eventsToCal(events, termID);
    }
  }

  return (
    <button onClick={handleDownload}>Download .ics</button>
  );
}
  
export default DownloadButton;