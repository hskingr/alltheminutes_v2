import { set } from 'date-fns';
import pkg from 'date-fns-tz';

const { formatInTimeZone } = pkg;

export default function runTweetByRegex(timeNow, { data: { text } }) {
  try {
    const hours = timeNow.slice(0, 2);
    const minutes = timeNow.slice(3, 5);

    const dateOpts = {
      hours,
      minutes
    };
    const date = set(new Date(), dateOpts);
    const timeOptionOne = formatInTimeZone(date, 'Europe/London', 'HH:mm');
    const timeOptionTwoHours = formatInTimeZone(date, 'Europe/London', 'h');
    const timeOptionTwoMinutes = formatInTimeZone(date, 'Europe/London', 'mm');
    const amPm = formatInTimeZone(date, 'Europe/London', 'a');

    // console.log(timeOptionOne, timeOptionTwo);
    // make sure regex can check for (case insensitive)
    // its  it's
    // 23:22 11:22pm
    // 01:44 1:44am 01:44am
    // console.log(text);
    // const oldRegex = /^It['’]s\s(?:(?:23:55)|(?:11:55pm))\sand.+?/gi;
    // I have to create the regex this way to add dynamic time variables in.
    const regex = new RegExp(`^It['’]s\\s(?:(?:${timeOptionOne})|(?:0?${timeOptionTwoHours}[:.]${timeOptionTwoMinutes}(?:\\s${amPm}|${amPm})))\\sand.+?`, `gi`);
    // console.log(oldRegex);
    console.log(regex);
    if (regex.test(text) === true) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(`runTweetByRegex error ${error}`);
    return false;
  }
}
