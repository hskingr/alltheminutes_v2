import JSONdb from 'simple-json-db';
import { lightFormat } from 'date-fns';

export default function checkIfEntryExists(id) {
  try {
    console.log(id);
    const db = new JSONdb(`db/storage.json`);
    const timeNow = `${lightFormat(new Date(), `HHmm`)}`;
    if (db.has(timeNow)) {
      // entry exists so send true (unretweet)
      return true;
    }
    // entry does nto exists to send false
    db.set(timeNow, id);
    return false;
  } catch (error) {
    console.error(error);
    console.error(`CheckIfEntryExists Error`);
    return true;
  }
}
