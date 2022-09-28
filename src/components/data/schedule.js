import HtmlTableToJson from "html-table-to-json";

export const parseHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc;
}

export const getTermText = (doc) => {
  const header = doc.querySelector("table.header").rows[0];
  const termname = header.getElementsByTagName("td")[1].innerText;
  return termname;
}

export const getScheduleTable = (doc) => {
  const simple = doc.querySelector("table.simple").outerHTML;
  const jsonTables = HtmlTableToJson.parse(simple);
  const scheduleTable = jsonTables.results[0];
  return scheduleTable;
}


export const getCRNS = (doc) => {
  const scheduleTable = getScheduleTable(doc);
  const crns = scheduleTable.map((row) => row["Registration Number"]);
  return crns;
}

