import getTweets from '../functions/getTweets.js';

const results = [
  {
    id: '1536753810370007043',
    text: "it's 12:53AM and i'm craving for salmon sashimi 🥲"
  }
];

const noResults = { meta: { result_count: 0 } };

jest.mock('axios');

test('returns some results', async () => {
  axios.get.mockResolvedValue({ data: results });

  const returnedData = await getTweets();
  expect(returnedData).toHaveLength(1);
});

test('returns no results', async () => {
  axios.get.mockResolvedValue({ data: noResults });

  const returnedData = await getTweets();
  expect(returnedData.meta.result_count).toBe(0);
});
