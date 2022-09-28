import React from 'react';
import getTermInfo from "./data/terms";

// Select a term from a dropdown list

const TermSelect = ({termID, setTermID, setCrns, termInfo, setTermInfo}) => {
  React.useEffect(() => {const inner = () => {
    getTermInfo().then((termInfo) => {
      setTermInfo(termInfo);
      setTermID(termInfo[0].termId);
    }).catch((err) => {
      console.log(err);
    });
  };
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
}

export default TermSelect;
