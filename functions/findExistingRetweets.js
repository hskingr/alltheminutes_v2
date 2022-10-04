import doesARetweetExist from './doesARetweetExist.js';
import addTweetIdToJson from './addTweetIdToJson.js';
import getRetweetId from './getRetweetId.js';
import isTheTweetValid from './isTheTweetValid.js';
import removeEntryFromDB from './removeEntryFromDB.js';

export default async function findExistingRetweets(twitterClient, timeNow) {
  try {
    // the retweet exists in the database
    if (doesARetweetExist(timeNow)) {
      // For viewabillity purposes. Disable when pushing to production as the call is unnecessary
      const value = getRetweetId(timeNow);
      const tweet = await twitterClient.v2.singleTweet(value);
      console.log(`Existing Tweet in Question: ${tweet.data.text}`);
      // the existing tweet is valid
      if (isTheTweetValid(twitterClient, timeNow) === true) {
        const tweetId = getRetweetId(timeNow);
        await twitterClient.v2.unretweet(process.env.TWITTER_USER_ID, tweetId);
        await twitterClient.v2.retweet(process.env.TWITTER_USER_ID, tweetId);
        addTweetIdToJson(timeNow, tweetId);
        console.log(`Retweeting Existing Retweet For ${timeNow}`);
      } else {
        // remove the tweet from the DB
        console.log(`Existing Retweet was an Error...Removing at ${timeNow}`);
        removeEntryFromDB(timeNow);
      }
    } else {
      console.log(`No Existing Retweets Found For ${timeNow}`);
    }
  } catch (error) {
    console.error(error);
    console.error(`findExistingRetweets Error`);
  }
}
