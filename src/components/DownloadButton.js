import React from 'react';
import {eventsToCal} from './data/events'

// A Button that downloads the schedule as a .ics file
function DownloadButton({crns, setCrns, termID}) {

  function handleDownload() {
    const events = crns.map((crn) => crn.events).flat();
    eventsToCal(events, termID);
  }

  // Allow download if all crns success and at least one crn
  const enabled = (crns.length > 0 && crns.every((crn) => crn.status === "success"));
  const loading = (crns.length > 0 && crns.some((crn) => crn.status === "pending"));

  return (
    <div className="download-button">
      <button
        className="btn btn-light"
        onClick={handleDownload}
        disabled={!enabled}
      >
        {loading ? "Adding CRNs..." : "Download .ics"}
      </button>
    </div>
  );
}
  
export default DownloadButton;