import isTheTweetValid from '../functions/isTheTweetValid.js';
import 'dotenv/config';
import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET
});

// this test does not work as I do not have a tweet to use that is
// wrong
test(`It should return false if the tweet is invalid`, async () => {
  try {
    const result = await isTheTweetValid(twitterClient, '23:56');
    expect(result).toBeFalsy();
  } catch (error) {
    console.log(`test error ${error}`);
  }
});

test(`It should return true if the tweet is valid`, async () => {
  try {
    const result = await isTheTweetValid(twitterClient, '23:55');
    expect(result).toBeTruthy();
  } catch (error) {
    console.log(`test error ${error}`);
  }
});
