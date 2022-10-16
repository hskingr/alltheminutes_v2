import countAmountOfTweetsInDb from './countAmountOfTweetsInDb.js';

export default function updateBio(twitterClient) {
  try {
    const amount = countAmountOfTweetsInDb();
    const description = `Currently retweeting all the minutes. I have found ${amount} tweets out of ${60 * 24} minutes in the day.`;
    // twitterClient.v1.post(`account/update_profile.json`, { description });
    console.log(`Updated Bio with current Statistics: \n ${description}`);
  } catch (error) {
    console.log(`updateBio Error: ${error}`);
  }
}
