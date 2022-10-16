import JSONdb from 'simple-json-db';

export default function countAmountOfTweetsInDb() {
  try {
    const db = new JSONdb(`db/storage.json`);
    const json = db.JSON();
    return Object.keys(json).length;
  } catch (error) {
    console.log(`countAmountOfTweetsInDb error: ${error}`);
  }
}

countAmountOfTweetsInDb();
