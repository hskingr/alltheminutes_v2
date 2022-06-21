import { TwitterApi } from 'twitter-api-v2';
import { scheduleJob } from 'node-schedule';
import 'dotenv/config';
import { lightFormat } from 'date-fns';
import filterTweets from './functions/filterTweets.js';
import getTweets from './functions/getTweets.js';
import addTweetIdToJson from './functions/addTweetIdToJson.js';
import doesARetweetExist from './functions/doesARetweetExist.js';
import getRetweetId from './functions/getRetweetId.js';

async function findExistingRetweets(twitterClient, timeNow) {
  try {
    if (doesARetweetExist(timeNow)) {
      const tweetId = getRetweetId(timeNow);
      await twitterClient.v2.unretweet(process.env.TWITTER_USER_ID, tweetId);
      await twitterClient.v2.retweet(process.env.TWITTER_USER_ID, tweetId);
      addTweetIdToJson(timeNow, tweetId);
      console.log(`Retweeting Existing Retweet For ${timeNow}`);
    } else {
      console.log(`No Existing Retweets Found For ${timeNow}`);
    }
  } catch (error) {
    console.error(`findExistingRetweets Error`);
  }
}

async function main(timeNow) {
  try {
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_KEY_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      accessSecret: process.env.ACCESS_TOKEN_SECRET
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Development Environment`);
      const results = await getTweets(twitterClient);
      // If there are no results
      if (results.meta.result_count === 0 || results === null) {
        console.log(`No Tweets Results For ${timeNow}`);
        // find a retweet and if it exists, unretweet it and retweet it
        findExistingRetweets(twitterClient, timeNow);
      } else {
        //   filter tweets that don't start with It's
        const filteredTweets = await filterTweets(results);
        if (filteredTweets === null) {
          console.log(`No Applicable Filtered Results For ${timeNow}`);
          // find a retweet and if it exists, unretweet it and retweet it
          findExistingRetweets(twitterClient, timeNow);
        } else {
          // rewteet the tweet that matches It's xx:xx and
          console.log(`Found Original Tweet To Retweet At ${timeNow}`);
          await twitterClient.v2.retweet(process.env.TWITTER_USER_ID, filteredTweets[0].id);
          addTweetIdToJson(timeNow, filteredTweets[0].id);
          // retweet the tweet
        }
      }
    } else if (process.env.NODE_ENV === 'production') {
      // console.log(`Production Environment`);
    }
  } catch (error) {
    console.error(`error ${error}`);
  }
}

scheduleJob('* * * * *', () => {
  const timeNow = lightFormat(new Date(), `HH:mm`);
  console.log(`Running Job for ${timeNow}`);
  main(timeNow);
});
