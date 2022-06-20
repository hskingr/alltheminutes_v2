import axios from 'axios';
import retweetTheTweet from '../functions/retweetTheTweet.js';

jest.mock('axios');

const data = {
  id: '1535850802010591232',
  text: 'It’s 1:05am and I am this guy. #Auburn #WarEagle https://t.co/cWBh2nR61V'
};

const returnedResult = {
  data: {
    retweeted: true
  }
};

test('tweet is successfully retweeted', async () => {
  axios.post.mockResolvedValue(returnedResult);
  const returnedData = await retweetTheTweet(data);
  expect(returnedData).toStrictEqual(returnedResult);
});
