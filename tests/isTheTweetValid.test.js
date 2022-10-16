import { TwitterApi } from 'twitter-api-v2';
import isTheTweetValid from '../functions/isTheTweetValid.js';
import 'dotenv/config';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET
});

// this test does not work as I do not have a tweet to use that is
// wrong
test(`It should return false if the tweet is invalid`, async () => {
  const result = await isTheTweetValid(twitterClient, '23:56');
  expect(result).toBeFalsy();
});

test(`It should return true if the tweet is valid`, async () => {
  const result = await isTheTweetValid(twitterClient, '23:55');
  expect(result).toBeTruthy();
});
