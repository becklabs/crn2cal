import axios from "axios";

export const termID_headers = {
  'content-type': 'application/json',
  'Accept': '*/*',
  'Access-Control-Allow-Origin': '*'
}

 export const termID_payload = {
  'query': 'query getTermIDsByCollege($subCollege: String!) {\n  termInfos(subCollege: $subCollege) {\n    text\n    termId\n  }\n}\n',
  'variables': {
      'subCollege': 'NEU',
  },
  'operationName': 'getTermIDsByCollege',
}

const getTermInfo = async () => {
  const response = await axios.post("https://api.searchneu.com/", termID_payload, { headers: termID_headers });
  const items = response.data.data.termInfos;
  const termIDs = {};
   for (let i = 0; i < items.length; i++) {
     termIDs[items[i].text] = items[i].termId;
   }
   return termIDs;
}

export default getTermInfo;