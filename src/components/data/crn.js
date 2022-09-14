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