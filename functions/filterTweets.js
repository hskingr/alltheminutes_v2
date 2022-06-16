export default async function filterTweets({ data }) {
  console.log(data);
  const regex = /^It's\s.+$/;
  const filteredResults = data.filter((item) => regex.test(item.text));
  return filteredResults;
}
