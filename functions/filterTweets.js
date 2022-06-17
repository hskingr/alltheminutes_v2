export default function filterTweets({ data }) {
  const regex = /^It['’]s\s.+$/gi;
  const filteredResults = data.filter((item) => regex.test(item.text));
  // console.log(filteredResults);

  if (filteredResults.length === 0) {
    return null;
  }
  return filteredResults;
}
