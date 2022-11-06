import JSONdb from 'simple-json-db';

// Stores tweet in json file
export default function addTweetIdToJson(timeNow, tweetId, tweetText) {
  try {
    const db = new JSONdb(`db/storage.json`);
    db.set(timeNow, tweetId);
    const dbTwo = new JSONdb(`db/storageTweetText.json`);
    dbTwo.set(timeNow, tweetText);
  } catch (error) {
    console.error(error);
    console.error(`CheckIfEntryExists Error`);
  }
}
