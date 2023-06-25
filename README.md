# All The Minutes

```bash
cp .env.example .env
```

fill out the values for proper volume mappings to the json db

currently in the process of adding functionality to check if the tweet has been retweeted in error. I need to figure out the logic how and where to implement the feature in the logic of the program.

5/10/22 update

added validity checker in the process. Made the program more verbose.

16/10/2022 update

Validity checker is working well. Added more edge cases for the regex.
Added a bio updater but currently do not have the correct access privileges to update the twitter bio via the api (v1).
I am considering using one object which includes the twitterClient which can be passed along the different functions.

25/06/2023 update

it seems that API access has changed in twitter and I am not able to search for retweets anymore unless I pay $100 a month. For now, this bot no longer works.