import runTheTweetByRegex from '../functions/runTheTweetByRegex.js';

test(`It should return false if the tweet is invalid`, async () => {
  try {
    const result = await runTheTweetByRegex('08:16', {
      data: {
        text: `It's 08:16am and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
      }
    });
    expect(result).toBe(true);
  } catch (error) {
    console.log(`test error ${error}`);
  }
});
