import isTheTweetValid from '../functions/isTheTweetValid.js';
import 'dotenv/config';
import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET
});

test(`It should return false if the tweet is invalid`, async () => {
  const result = await isTheTweetValid(twitterClient, '23:55');
  expect(result).toBeFalsy();
});
