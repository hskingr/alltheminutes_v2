import doesARetweetExist from './doesARetweetExist.js';
import addTweetIdToJson from './addTweetIdToJson.js';
import runTweetByRegex from './runTheTweetByRegex.js';
import getRetweetId from './getRetweetId.js';
import isTheTweetValid from './isTheTweetValid.js';
import removeEntryFromDB from './removeEntryFromDB.js';

export default async function findExistingRetweets(twitterClient, timeNow) {
  try {
    // the retweet exists in the database
    if (doesARetweetExist(timeNow)) {
      // For viewabillity purposes. Disable when pushing to production as the call is unnecessary
      console.log(`----> A retweet already exists`);
      const tweetId = getRetweetId(timeNow);
      const tweet = await twitterClient.v2.singleTweet(tweetId);
      console.log(tweet);
      if (tweet.data === null) {
        throw new Error();
      }
      const tweetText = tweet.data.text;
      console.log(`----> Existing Tweet in Question: ${tweetText}`);
      // A retweet already exists in the database, but is the existing tweet is valid?
      if (runTweetByRegex(timeNow, { data: { text: tweetText } })) {
        // unretweet the tweet and retweet it to bring it up to the latest in the feed.
        await twitterClient.v2.unretweet(process.env.TWITTER_USER_ID, tweetId);
        await twitterClient.v2.retweet(process.env.TWITTER_USER_ID, tweetId);
        console.log(`------> Retweeting Existing Retweet For ${timeNow}`);
      } else {
        // remove the tweet from the DB
        console.log(`----> Existing Retweet was an Error...Removing at ${timeNow}`);
        removeEntryFromDB(timeNow);
      }
    } else {
      console.log(`----> No Existing Retweets Found For ${timeNow}`);
    }
  } catch (error) {
    console.error(error);
    console.error(`findExistingRetweets Error`);
  }
}
