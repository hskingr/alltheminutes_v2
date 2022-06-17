import 'dotenv/config';
import { lightFormat } from 'date-fns';
import filterTweets from './functions/filterTweets.js';
import getTweets from './functions/getTweets.js';
import retweetTheTweet from './functions/retweetTheTweet.js';

async function main() {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Development Environment`);
      const results = await getTweets();
      // console.log(results.data);
      // If there are no results
      if (results.meta.result_count === 0) {
        console.log(`No Results for ${lightFormat(new Date(), `HH:mm`)}`);
      } else {
        //   filter tweets that don't start with It's
        const filteredTweets = await filterTweets(results);
        // console.log(filteredTweets[0]);
        if (filteredTweets === null) {
          console.log(`No Applicable Filtered Results`);
        } else {
          const retweeted = await retweetTheTweet(filteredTweets[0]);
          // retweet the tweet
          console.log(retweeted);
        }
      }
    } else if (process.env.NODE_ENV === 'production') {
      console.log(`Production Environment`);
    }
  } catch (error) {
    console.log(`error ${error.code}`);
  }
}

main();

// curl --request GET 'https://api.twitter.com/2/tweets/search/recent?query=from:twitterdev' --header 'Authorization: Bearer $BEARER_TOKEN'
