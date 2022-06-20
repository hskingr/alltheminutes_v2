import axios from 'axios';
import 'dotenv/config';

export default async function getOAuth2Credentials() {
  try {
    const apiKey = encodeURI(process.env.TWITTER_API_KEY);
    const apiKeySecret = encodeURI(process.env.TWITTER_API_KEY_SECRET);
    const credentials = `${apiKey}:${apiKeySecret}`;
    const base64BearerTokenCredentials = Buffer.from(credentials).toString('base64');
    const res = await axios.post(`https://api.twitter.com/oauth2/token?grant_type=client_credentials`, {
      headers: { Authorization: `Basic ${base64BearerTokenCredentials}` }
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error.config.data);
    console.error(error.response.data);
    console.log(`getOAuth2 Function Error`);
    return null;
  }
}

getOAuth2Credentials();
