import JSONdb from 'simple-json-db';

export default function removeEntryFromDB(timeNow) {
  try {
    const db = new JSONdb(`db/storage.json`);
    if (db.has(timeNow)) {
      db.delete(timeNow);
    }
  } catch (error) {
    console.error(error);
    console.error(`removeEntryFromDB Error`);
  }
}
