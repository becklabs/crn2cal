import React from 'react';
import {termID_headers, termID_payload} from "./data/terms";
import axios from 'axios';

// Select a term from a dropdown list

const TermSelect = ({termID, setTermID, setCrns}) => {
  const [termInfo, setTermInfo] = React.useState([]);
  
  React.useEffect(() => {
    const inner = () => {
      axios.post("https://api.searchneu.com/", termID_payload, { headers: termID_headers })
      .then((response) => {
        const items = response.data.data.termInfos;
        setTermInfo(items);
        setTermID(items[0].termId);
      }).catch((error) => {
        console.log(error);
      });
      }
    inner();
  }, []);

  const handleChange = (e) => {
    setTermID(e.target.value);
    setCrns([]);
  };

  return (
    <div className="term-select">
      <select
        className="form-select form-select mb-3"
        aria-label=".form-select example"
        name="term"
        value={termID}
        onChange={handleChange}
      >
        {termInfo.map((term) => (
          <option key={term.termId} value={term.termId}>
            {term.text}
          </option>
        ))}
      </select>
    </div>
  );

  /*
  return (
    <div className="term-select">
      <select
        className="term-select"
        name="term"
        value={termID}
        onChange={handleChange}
      >
        {termInfo.map((term) => (
          <option key={term.termId} value={term.termId}>
            {term.text}
          </option>
        ))}
      </select>
    </div>
  );
  */
}

export default TermSelect;
