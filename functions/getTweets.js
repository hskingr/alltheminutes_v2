import { lightFormat } from 'date-fns';
import axios from 'axios';

export default async function getTweets() {
  const twentyFourHourTime = lightFormat(new Date(), `HH:mm`);
  const twelveHourTime = lightFormat(new Date(), `h:mm`);
  const amPm = lightFormat(new Date(), `a`);
  const query = `("It's ${twentyFourHourTime} and" OR "It's ${twelveHourTime}${amPm} and" OR "It's ${twelveHourTime} ${amPm} and") lang:en -is:retweet`;
  //   console.log(query);
  const results = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${query}&start_time=2022-06-10T01:00:00Z`, {
    headers: { Authorization: `Bearer ${process.env.TWITTER_API_BEARER_TOKEN}` }
  });
  return results.data;
}
