// This is not in use

import getRetweetId from './getRetweetId.js';
import runTweetByRegex from './runTheTweetByRegex.js';

export default async function isTheTweetValid(twitterClient, timeNow) {
  try {
    const value = getRetweetId(timeNow);
    // run checks and return true if valid
    // return false if invalid
    const tweet = await twitterClient.v2.singleTweet(value);
    console.log(`Running Validity Checker on: ${tweet.data.text}`);
    const result = runTweetByRegex(timeNow, tweet);
    console.log(`Validity Checker has returned ${result}`);
    // console.log(value);
    return result;
  } catch (error) {
    console.error(`isTheTweetValid Error: ${error}`);
    return null;
  }
}
