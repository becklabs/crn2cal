//import nextId from "react-id-generator";
import axios from "axios";
//import moment from "moment-timezone";

import {toICSEvents} from "./data/events";
import { buildClassPayload, class_headers } from "./data/classes";
import { validCRN } from "./data/crn";

// Form where you can enter a crn and it submits when you press enter

function CRNForm({ crn, setCrn, crns, setCrns, termid}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validCRN(crn, crns)) {
      setCrns([...crns,
        {crn: crn,
        status: "pending",
        events: null}]);

      axios.post(
        "https://api.searchneu.com/",
        buildClassPayload(crn, "202310"),
        {headers: class_headers}).then((response) => {

          const first_result = response.data.data.search.nodes[0];
          const events_ICS = toICSEvents(first_result, crn);
          console.log(events_ICS);
          setCrns((state) => {
            return state.map((crn_obj) => {
              if (crn_obj.crn == crn) {
                return {
                  crn: crn,
                  status: events_ICS ? "success" : "failure",
                  events: events_ICS
                }
              }
              return crn_obj;
            });
          });    
        }).catch((error) => {
          console.log(error);
        });
      setCrn("");
    }
  }

  function handleChange(event) {
    setCrn(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a CRN"
        value={crn}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default CRNForm;