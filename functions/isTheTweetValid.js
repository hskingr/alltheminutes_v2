// Regex is not working
// once this function is working
// i can use the results to either
// delete the entry in the db if invalid
// do nothing if valid

// if the entry is invalid then
// delete the entry in the db
// and search for a new entry -> retweet if exists.

import getRetweetId from './getRetweetId.js';
import { set } from 'date-fns';
import pkg from 'date-fns-tz';
const { formatInTimeZone } = pkg;

const runTweetByRegex = (timeNow, { data: { text } }) => {
  const hours = timeNow.slice(0, 2);
  const minutes = timeNow.slice(3, 5);

  const dateOpts = {
    hours,
    minutes
  };
  const date = set(new Date(), dateOpts);
  //   const timeZoneNow = formatInTimeZone(date, 'Europe/London', 'HH:mm');
  const timeOptionOne = formatInTimeZone(date, 'Europe/London', 'HH:mm');
  const timeOptionTwo = formatInTimeZone(date, 'Europe/London', 'h:mma');

  console.log(timeOptionOne, timeOptionTwo);
  // make sure regex can check for (case insensitive)
  // its  it's
  // 23:22 11:22pm
  // 01:44 1:44am 01:44am
  //   console.log(text);
  console.log(text);
  const oldRegex = /^It['’]s\s(?:(?:23:55)|(?:11:55pm))\sand.+$/gi;
  const regex = new RegExp(`/^It['’]s\\s(?:(?:${timeOptionOne})|(?:${timeOptionTwo}))\\sand.+$/gi`);
  console.log(oldRegex, regex);
  console.log(oldRegex.test(`It's 11:55 and I am`));
  return null;
};

export default async function isTheTweetValid(twitterClient, timeNow) {
  try {
    const value = getRetweetId(timeNow);
    // run checks and return true if valid
    // return false if invalid
    const tweet = await twitterClient.v2.singleTweet(value);
    runTweetByRegex(timeNow, tweet);
    // console.log(tweet);
    // console.log(value);
    return false;
  } catch (error) {
    console.error(`isTheTweetValid Error: ${error}`);
    return null;
  }
}
