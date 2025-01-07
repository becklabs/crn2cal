import moment from "moment-timezone";
import {createEvents} from "ics";
import { saveAs } from 'file-saver';
import nextId from "react-id-generator";

const rrule_day = {
  "1": "MO",
  "2": "TU",
  "3": "WE",
  "4": "TH",
  "5": "FR",
  "6": "SA",
  "7": "SU"
}

// Converts a ClassOccurrence to an array of ICS events
export const toICSEvents = (json, crn) => {

  // filter out the sections that dont have the crn we want
  const sections = json.sections.filter((section) => section.crn == crn);
  if (sections.length === 0) {
    return null;
  }

  const name = json["name"];

  let description;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(json["desc"], 'text/html');
    description = doc.body.textContent.trim();
  } catch (error) {
    console.warn("Failed to parse description:", error);
    description = json["desc"] || "";
  }

  const section_info = sections[0];

  // Convert each meeting to an event
  const events = section_info.meetings.map((meeting) => {
    const location = meeting.where;

    const start_date = moment(new Date("Jan 01 1970 GMT-0500")).add(meeting.startDate, 'days');
    const end_date = moment(new Date("Jan 01 1970 GMT-0500")).add(meeting.endDate, 'days');

    const start_time = Object.values(meeting.times)[0][0].start;
    const end_time = Object.values(meeting.times)[0][0].end;

    const days = Object.keys(meeting.times).map(day => rrule_day[day]);

    const deltas = Object.keys(meeting.times).map(day => ((7-start_date.day())%7+parseInt(day)) % 7);
    const first_start = moment(start_date).add(Math.min(...deltas), 'days').add(start_time, 'seconds');
    const first_end = moment(first_start).add(end_time - start_time, 'seconds');

    const event = {
      uid: nextId(),
      title: name,
      description: description,
      location: location,
      start: first_start.format('YYYY-M-D-H-m').split("-").map((x) => parseInt(x)),
      startOutputType:"local",
      end: first_end.format('YYYY-M-D-H-m').split("-").map((x) => parseInt(x)),
      endOutputType:"local",
      recurrenceRule: `FREQ=WEEKLY;BYDAY=${days.join(",")};UNTIL=${end_date.format("YYYYMMDDThhmmss")}`,
    }
    return event;
  });
  return events;
}

// Converts an array of event objects to a calendar
export const eventsToCal = (events, term) => {
  createEvents(events, (error, value) => {
    if (error) {
      console.log(error);
    } else {
      console.log(value);
      const blob = new Blob([value], {type: "text/calendar;charset=utf-8"});
      console.log(blob);
      saveAs(blob, `neu-${term}.ics`);
    }
  });
}