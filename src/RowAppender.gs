var BET = '€2.50';
var SHEET_EDIT_URL = PropertiesService.getScriptProperties().getProperty('SHEET_EDIT_URL');

//Append a row, if prize is defined that means we won something, if not append a row with 0 as a result
function appendRow(prize) {
    if(!prize) {
        prize = '0.00';
    } else {
        //RapidAPI may return a few cents higer than actual prize, round down to nearest 10th
        prize = Math.floor(prize * 10) / 10;
    }
    var ss = SpreadsheetApp.openByUrl(SHEET_EDIT_URL);
    var resultsSheet = ss.getSheets()[0];

    Logger.log("Appending row with prize" + '€' + prize);
    resultsSheet.appendRow([Utilities.formatDate(new Date(), 'CST+1', 'dd/MM/yyyy'), BET, '€' + prize]);
}