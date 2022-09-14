import React from 'react';

// Import components
import CRNForm from './components/CRNForm';
import CRNList from './components/CRNList';
import TermSelect from './components/TermSelect';
import DownloadButton from './components/DownloadButton';
 
const App = () => {
  const [crn, setCrn] = React.useState("");
  const [crns, setCrns] = React.useState([]);
  const [termID, setTermID] = React.useState("");
  return (
    <div className="App">
      <div>
        CRN to Calendar for NEU
      </div>
      <TermSelect
        termID={termID}
        setTermID={setTermID}
        setCrns = {setCrns}/>
      <CRNForm
        crn = {crn}
        setCrn = {setCrn}
        crns = {crns}
        setCrns = {setCrns}
        termID = {termID}/>
      <CRNList
        crns = {crns}
        setCrns = {setCrns} />
      <DownloadButton crns = {crns} setCrns = {setCrns} termID = {termID}/>
    </div>
  );
}

export default App;
