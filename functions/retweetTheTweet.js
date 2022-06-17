import axios from 'axios';

export default async function retweetTheTweet({ id }) {
  try {
    console.log('retweeting');
    const result = await axios.post(`https://api.twitter.com/2/users/:id/retweets`, {
      params: {
        id: 1535850802010591232
      },
      headers: { Authorization: `Bearer ${process.env.TWITTER_API_BEARER_TOKEN}` },
      data: {
        tweet_id: id
      }
    });
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error.response);
    return null;
  }
}
