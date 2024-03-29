import { set, format } from 'date-fns';

export default function runTweetByRegex(timeNow, { data: { text } }) {
  try {
    const hours = timeNow.slice(0, 2);
    const minutes = timeNow.slice(3, 5);

    const dateOpts = {
      hours,
      minutes
    };
    const date = set(new Date(), dateOpts);
    // const timeOptionOne = formatInTimeZone(date, 'Europe/London', 'HH:mm');
    const timeOptionTwoHours = format(date, 'h');
    const timeOptionTwoMinutes = format(date, 'mm');
    const amPm = format(date, 'a');

    // With 24 hour and 12 hour options
    // const regex = new RegExp(`^It['’]s\\s(?:(?:${timeOptionOne})|(?:0?${timeOptionTwoHours}[:.]${timeOptionTwoMinutes}(?:\\s${amPm}|${amPm})))\\sand.+?`, `gi`);
    // Just with 12 hour option
    const regex = new RegExp(`^It['’]s\\s(?:0?${timeOptionTwoHours}[:.]${timeOptionTwoMinutes}(?:\\s${amPm}|${amPm}))\\sand.+?`, `gi`);
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
