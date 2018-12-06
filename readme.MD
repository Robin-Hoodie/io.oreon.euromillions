# Euromillions

Personal pet project of mine that I've decided to open source.

This project will run as a Google Apps Script that needs to be deployed as a webapp. 
The script will check for the drawing results of Euromillions and append a row to a Google sheet of your choosing with the date of the draw, the bet and the winnings.

The sheet could look as [follows](https://raw.githubusercontent.com/OreonRobin/io.oreon.euromillions/master/screenshots/screenshot.png)

Note that the cells in `#E2`, `#F2` and `#G2` are simple sum/subtraction formulas that were manually added to the sheet.

It works by retrieving the results by either:
- Checking your email and parsing the potential winnings
- Retrieving the results and checking those with your numbers/stars by using the (Rapid Euromillions API)[https://market.mashape.com/creativesolutions/euromillions] => **This is a legacy solution as this API has been returning 404s for more than a year now**

The default is retrieving the results by email. See below on how to change this.

## Getting started

- Clone project
- Upload files in `src/` folder to a new Google Apps Script project that uses the same Google account that is the owner of the sheet you will use as well as the owner of the inbox in which you receive the draw results.
- Set project properties
  - `SHEET_EDIT_URL`: the **editable** URL for a Google sheet to which the results should be appended
  - `FROM-EMAIL`: Required if you want to retrieve the results by email. This is the email address the the lottery uses to send you the result of a draw
  - `RAPID_API_KEY`: Required if you want to use the Rapid API to retrieve the results. Get it [here](https://rapidapi.com/). **As stated above, this API is not working at the moment of writing this**
  - `MAGIC_NUMBERS`: The numbers you use to play Euromillions, supply these as a comma separated string e..g. `1,2,3,4,5`. Note that there **can not be any spaces between the numbers**
  - `MAGIC_STARS`: The stars you use to play Euromillions, supply these as a comma separated string e.g. `4,9`. Spaces comment applies here as well
  - `CHECK_BY_RAPID_API`: Set this to `true` if you want to use the Rapd API
- Set project trigger to run `checkResults` twice a week. I would suggest a time that is a few hours after you receive the results by email, e.g. `Every Wednesday & Saturday between Midnight and 1 AM`
- Deploy as webbapp while granting the necessary permissions

## Issues

As stated before, this is a personal project of mine and has only been tested with my own Google Account.

If you find something doesn't work for you or you'd like to add a feature, please file an issue or create a PR.
