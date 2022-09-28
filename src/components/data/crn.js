import { getClassInfo } from "./classes";
import { toICSEvents } from "./events";

// Check if the crn is valid (5 digit number) and not already in the list
const regex = new RegExp("^[0-9]{5}$");
export const validCRN = (crn, crns) => {
  if (regex.test(crn)) {
    for (let i = 0; i < crns.length; i++) {
      if (crns[i].crn === crn) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const addCRN = (termID, crn, crns, setCrns) => {
  if (validCRN(crn, crns)) {
    setCrns((state) => {return [...state,
      {crn: crn,
      status: "pending",
      events: null}]});

    getClassInfo(crn, termID).then((classOccurrence) => {
        const events_ICS = toICSEvents(classOccurrence, crn);

        // Set crn statuses then filter out the failed ones
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

        });    
      }).catch((error) => {
        setCrns((state) => {
          return state.filter((crn_obj) => crn_obj.crn != crn);
        });
      });
  }
};

  export const addAllCRNs = (termID, newcrns, crns, setCrns) => {
    newcrns.forEach((crn) => {
      addCRN(termID, crn, crns, setCrns);
    });
}

