import axios from "axios";
import {toICSEvents} from "./data/events";
import { buildClassPayload, class_headers } from "./data/classes";
import { validCRN } from "./data/crn";
import {addCRN} from "./data/crn";

// Form where you can enter a crn and it submits when you press enter

function CRNForm({ crn, setCrn, crns, setCrns, termID}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validCRN(crn, crns)) {
      addCRN(termID, crn, crns, setCrns);
      setCrn("");
    }
  }

  function handleChange(event) {
    // ensure that the input is all numbers and less than or equal to 5 digits
    if (event.target.value.match(/^[0-9]{0,5}$/)) {
    setCrn(event.target.value);
    }
  }

  return (
    <div className="crn-form">
    <form onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder="Enter CRNs"
        value={crn}
        onChange={handleChange}
      />
      <div type="submit" ></div>
    </form>
    </div>
  );
}

export default CRNForm;