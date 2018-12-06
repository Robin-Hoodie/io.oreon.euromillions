var MAGIC_NUMBERS = PropertiesService.getScriptProperties().getProperty('MAGIC_NUMBERS').split(',');
var MAGIC_STARS = PropertiesService.getScriptProperties().getProperty('MAGIC_STARS').split(',');
var EUROMILLIONS_API_BASE_URL = 'https://euromillions.p.rapidapi.com/ResultsService';
var EUROMILLIONS_API_FINDLAST_URL = EUROMILLIONS_API_BASE_URL + '/FindLast';
var OPTIONS = {
    'method': 'GET',
    'headers': {
        'X-RapidAPI-Key': PropertiesService.getScriptProperties().getProperty('RAPID_API_KEY')
    }
};

var jsonResponse;

function checkByRapidAPI() {
    var httpResponse = UrlFetchApp.fetch(EUROMILLIONS_API_FINDLAST_URL, OPTIONS);
    if(httpResponse.getResponseCode() !== 200) {
        Logger.log("Something went wrong! Response returned was " + httpResponse.getContentText());
    }
    jsonResponse = JSON.parse(httpResponse.getContentText());
    var winningNumbers = [jsonResponse.Num1, jsonResponse.Num2, jsonResponse.Num3, jsonResponse.Num4, jsonResponse.Num5];
    var winningStars = [jsonResponse.Star1, jsonResponse.Star2];
    checkWinningCombinationWithMagicCombination(winningNumbers, winningStars);
}

function checkWinningCombinationWithMagicCombination(winningNumbers, winningStars) {
    var numbersCorrect = 0;
    var starsCorrect = 0;

    checkWinningNumbersWithMagicNumbers();
    checkWinningStarsWithMagicStars();

    function checkWinningNumbersWithMagicNumbers() {
        for(var i = 0; i < winningNumbers.length; i++) {
            if(MAGIC_NUMBERS.indexOf(winningNumbers[i]) > -1) {
                numbersCorrect++;
            }
        }
    }

    function checkWinningStarsWithMagicStars() {
        for(var i = 0; i < winningStars.length; i++) {
            if(MAGIC_STARS.indexOf(winningStars[i]) > -1) {
                starsCorrect++;
            }
        }
    }

    checkHowMuchWeWon(numbersCorrect, starsCorrect);
}

function checkHowMuchWeWon(numbersCorrect, starsCorrect) {
    //Check reverse since the prize combinations are sorted by highest combinations first
    for(var i = jsonResponse.PrizeCombinations.length - 1; i > -1; i--) {
        var prize = getPrize(jsonResponse.PrizeCombinations[i]);
        if(prize) {
            break;
        }
    }

    appendRow(prize);

    function getPrize(prizeCombination) {
        if(prizeCombination.Numbers === numbersCorrect && prizeCombination.Stars === starsCorrect) {
            return prizeCombination.Prize;
        }
    }
}