import runTheTweetByRegex from '../functions/runTheTweetByRegex.js';

test(`Return True: It's 08:16am and`, async () => {
  const result = await runTheTweetByRegex('08:16', {
    data: {
      text: `It's 08:16am and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 08:16 am and`, async () => {
  const result = await runTheTweetByRegex('08:16', {
    data: {
      text: `It's 08:16 am and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 08:16 and`, async () => {
  const result = await runTheTweetByRegex('08:16', {
    data: {
      text: `It's 08:16 am and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 8:16am and`, async () => {
  const result = await runTheTweetByRegex('08:16', {
    data: {
      text: `It's 08:16 am and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 12:16am and`, async () => {
  const result = await runTheTweetByRegex('00:16', {
    data: {
      text: `It's 12:16 am and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 12:16 am and`, async () => {
  const result = await runTheTweetByRegex('00:16', {
    data: {
      text: `It's 12:16 am and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 8:34 pm and`, async () => {
  const result = await runTheTweetByRegex('20:34', {
    data: {
      text: `It's 8:34 pm and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 08:34 pm and`, async () => {
  const result = await runTheTweetByRegex('20:34', {
    data: {
      text: `It's 08:34 pm and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 8:34pm and`, async () => {
  const result = await runTheTweetByRegex('20:34', {
    data: {
      text: `It's 08:34 pm and the weather is a dose of few clouds at 12.47°C. Based on that (Energy: 0.4, Valence: 0.8), I think you might like:  Squabble by HA SUNG WOON. Here is a link! https://t.co/pdIXifB5Pp.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 2:22pm and`, async () => {
  const result = await runTheTweetByRegex('14:22', {
    data: {
      text: `It’s 2:22pm and The late Queen Elizabeth II has left Buckingham Palace for the final time.`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 2.25 pm and `, async () => {
  const result = await runTheTweetByRegex('14:25', {
    data: {
      text: `It's 2.25 pm and feels like evening 7 pm`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: It's 2:42 PM and`, async () => {
  const result = await runTheTweetByRegex('14:42', {
    data: {
      text: `It's 2:42 PM and Texas still sucks`
    }
  });
  expect(result).toBe(true);
});

test(`Return True: it’s 4.44pm and that’s important`, async () => {
  const result = await runTheTweetByRegex('16:44', {
    data: {
      text: `it’s 4.44pm and that’s important`
    }
  });
  expect(result).toBe(true);
});
