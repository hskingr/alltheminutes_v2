import 'dotenv/config';
import { lightFormat } from 'date-fns';
import filterTweets from './functions/filterTweets.js';
import getTweets from './functions/getTweets.js';

async function main() {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Development Environment`);
    const results = await getTweets();
    // console.log(results);
    if (results.meta.result_count === 0) {
      console.log(`No Results for ${lightFormat(new Date(), `HH:mm`)}`);
    } else {
      //   filter tweets that don't start with It's
      const filteredTweets = await filterTweets(results);
      console.log(filteredTweets);
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.log(`Production Environment`);
  }
}

main();

// curl --request GET 'https://api.twitter.com/2/tweets/search/recent?query=from:twitterdev' --header 'Authorization: Bearer $BEARER_TOKEN'
