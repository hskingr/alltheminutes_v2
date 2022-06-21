import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';
import checkIfEntryExists from './checkIfEntryExists.js';

// finish this by addding the time as a key and the tweet_id as a value
// this function should return true if there is an entry at this time.
// If there is, then the tweet should be untweeted and retweeted

export default async function retweetTheTweet({ id }) {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_KEY_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      accessSecret: process.env.ACCESS_TOKEN_SECRET
    });
    if (checkIfEntryExists(id) === true) {
      await client.v2.unretweet(process.env.TWITTER_USER_ID, id);
    }
    const result = await client.v2.retweet(process.env.TWITTER_USER_ID, id);
    console.log(result.data);
    return result;
  } catch (error) {
    console.error(error);
    console.error(`retweetTheTweetError`);
    return null;
  }
}

// retweetTheTweet('1537171206364864512');
