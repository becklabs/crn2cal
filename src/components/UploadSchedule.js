import React from 'react';
import { parseHTML, extractCRNS, getTermText, getCRNS} from './data/schedule';
import { addAllCRNs, addCRN } from './data/crn';

const UploadSchedule = ({crns, setCrns, setTermID, termID, termInfo}) => {
  // set loading

  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    // Read the html file as text then parse it
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const html = e.target.result;
      const doc = parseHTML(html);

      const scheduleTermName = getTermText(doc);
      const scheduleTermID = termInfo.find((term) => term.text === scheduleTermName).termId;

      if (scheduleTermID !== termID) {
        setTermID(scheduleTermID);
        setCrns([]);
      }

      const scheduleCrns = getCRNS(doc);
      
      scheduleCrns.forEach((crn) => {
        addCRN(termID, crn, crns, setCrns);
      });

    };
    reader.readAsText(file);
  };

  return (
    <>
      <button 
      className="btn btn-mini btn-light"
      onClick={handleClick}>
        Upload
      </button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
    </>
  );
};

export default UploadSchedule;