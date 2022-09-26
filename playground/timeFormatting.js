import { lightFormat } from 'date-fns';
import pkg from 'date-fns-tz';
const { formatInTimeZone } = pkg;

const main = () => {
  const date = new Date();
  const twentyFourHourTime = formatInTimeZone(date, 'Europe/London', 'HH:mm');
  const twelveHourTime = formatInTimeZone(date, 'Europe/London', 'h:mm');
  const amPm = lightFormat(new Date(), `a`);

  console.log(twelveHourTime, twentyFourHourTime, amPm);
};

main();
