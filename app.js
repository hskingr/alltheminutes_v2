import pkg from 'date-fns-tz';
import 'dotenv/config';
import { TwitterApi } from 'twitter-api-v2';
import { scheduleJob } from 'node-schedule';
import { addTweetIdToJson, findExistingRetweets, getTweets } from './functions/index.js';
import runTweetByRegex from './functions/runTheTweetByRegex.js';
import updateBio from './functions/updateBio.js';

const { formatInTimeZone } = pkg;

async function main(timeNow) {
  try {
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_KEY_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      accessSecret: process.env.ACCESS_TOKEN_SECRET
    });

    // get tweets
    // if there is a tweet check if valid
    // if valid >> add to db >> retweet
    // if not valid >> check if existing tweet exists
    // if existing tweet exists >> check if valid
    // if valid >> unretweet & retweet
    // if not valid >> remove from db

    const results = await getTweets(twitterClient);
    // If there are no results
    if (results.meta.result_count === 0 || results === null) {
      console.log(`--> No New Tweets Results For ${timeNow}`);
      // find a retweet and if it exists, unretweet it and retweet it
      findExistingRetweets(twitterClient, timeNow);
    } else {
      //   filter tweets that don't start with It's
      // const filteredTweets = await filterTweets(results);
      // console.log(results.data);
      const filteredTweets = results.data.filter((item) => runTweetByRegex(timeNow, { data: item }));
      if (filteredTweets === null || filteredTweets.length === 0) {
        console.log(`--> No Applicable Filtered Results For ${timeNow}`);
        // find a retweet and if it exists, unretweet it and retweet it
        findExistingRetweets(twitterClient, timeNow);
      } else {
        // retweet the tweet that matches It's xx:xx and
        const tweetText = filteredTweets[0].text;
        const tweetId = filteredTweets[0].id;
        console.log(`--> Found Original Tweet To Retweet At ${timeNow}`);
        console.log(`----> ${tweetText.substring(0, 30)}...`);
        await twitterClient.v2.retweet(process.env.TWITTER_USER_ID, tweetId);
        addTweetIdToJson(timeNow, tweetId, tweetText);
        // retweet the tweet
      }
    }
    updateBio(twitterClient);
  } catch (error) {
    console.error(`error ${error}`);
  }
}

scheduleJob('* * * * *', () => {
  const date = new Date();
  const timeNow = formatInTimeZone(date, 'Europe/London', 'HH:mm');
  console.log(`Running Job for ${timeNow}`);
  main(timeNow);
});
