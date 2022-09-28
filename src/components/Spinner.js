
// A bootstrap spinner that is enabled when a crn is pending
const Spinner = ({crns}) => {
  const enabled = crns.some((crn) => crn.status === "pending");
  return (
    <div className="spinner">
      <div className="spinner-border text-secondary" role="status" style={{display: enabled ? "block" : "none"}}>
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Spinner;