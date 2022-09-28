import React from 'react';
import "./App.css";
// Import components
import CRNForm from './components/CRNForm';
import CRNList from './components/CRNList';
import TermSelect from './components/TermSelect';
import DownloadButton from './components/DownloadButton';
import UploadSchedule from './components/UploadSchedule';
import Spinner from './components/Spinner';

const App = () => {
  const [crn, setCrn] = React.useState("");
  const [crns, setCrns] = React.useState([]);
  const [termID, setTermID] = React.useState("");
  const [termInfo, setTermInfo] = React.useState([]);

  return (
    <div className="App">
      <h1 className="title">
        CRNs to Calendar for NEU
      </h1>
      <div className="parent">
      <div className="child">
        <div>
        <UploadSchedule
        crns={crns}
        setCrns={setCrns}
        setTermID = {setTermID}
        termID = {termID}
        termInfo = {termInfo} />
         your <a className="link-dark" href="https://prod-web.neu.edu/wasapp/bn/AdmittedCourseSchedule/secure/index.jsp" target="_blank" rel="noreferrer">Schedule</a>
        </div>
        <div>
        (right-click then save-as)
        </div>
      </div>
      <div className="child">
      <b>or</b>
      </div>
      <div className="child">
      <TermSelect
        termID={termID}
        setTermID={setTermID}
        setCrns = {setCrns}
        termInfo = {termInfo}
        setTermInfo = {setTermInfo}
        />
      <CRNForm
        crn = {crn}
        setCrn = {setCrn}
        crns = {crns}
        setCrns = {setCrns}
        termID = {termID}/>
      <CRNList
        crns = {crns}
        setCrns = {setCrns} />
      </div>

      <div className="child">
      <DownloadButton crns = {crns} setCrns = {setCrns} termID = {termID}/>
      </div>
      </div>
    <div className="footer">
      <a href="https://www.github.com/becklabs/crn2cal" target="_blank" rel="noreferrer">Github</a>
    </div>
    </div>
  );
}

export default App;
