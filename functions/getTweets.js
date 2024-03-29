import { lightFormat } from 'date-fns';
import pkg from 'date-fns-tz';
const { formatInTimeZone } = pkg;

export default async function getTweets(twitterClient) {
  try {
    /* example time accepted for 15:54 (24 hour clock)
    It's it's its Its
    03:54PM 03:54pm 15:54
    and
    */
    const date = new Date();
    const twentyFourHourTime = formatInTimeZone(date, 'Europe/London', 'HH:mm');
    const twelveHourTime = formatInTimeZone(date, 'Europe/London', 'h:mm');
    const amPm = lightFormat(new Date(), `a`);
    const query = `("It's ${twentyFourHourTime} and" OR "It's ${twelveHourTime}${amPm} and" OR "It's ${twelveHourTime} ${amPm} and") lang:en -is:retweet`;
    const results = await twitterClient.v2.search(query);
    return results.data;
  } catch (error) {
    console.error(error);
    console.error(`getTweets Error`);
    return null;
  }
}
