import axios from "axios";
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
            }).filter((crn_obj) => crn_obj.status != "failure");
          // filter crns that failed
          });    
        }).catch((error) => {
          setCrns((state) => {
            return state.filter((crn_obj) => crn_obj.crn != crn);
          });
        });
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