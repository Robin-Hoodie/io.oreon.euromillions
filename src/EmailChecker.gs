var FROM_EMAIL = PropertiesService.getScriptProperties().getProperty('FROM_EMAIL');

function checkByEmail() {
    var searchQuery = "after: " + Utilities.formatDate(new Date(), "CST+1", "yyyy/MM/dd") + " from: " + FROM_EMAIL;
    Logger.log('Search query ' + searchQuery);
    var threads = GmailApp.search(searchQuery);
    if (threads.length) {
        threads.forEach(function (thread) {
            Logger.log('Thread ' + thread);
            thread.getMessages().forEach(function (message) {
                var amountWonString = message.getPlainBody().match(/\d+,\d{2}/).join(".");
                var amountWon = parseInt(amountWonString);
                appendRow(amountWon);
            });
        });
    } else {
        appendRow();
    }
}

function parseDate(euroMillionsDateString) {
    euroMillionsDateString = euroMillionsDateString.substring(7, 15);
    return new Date(parseFloat(euroMillionsDateString));
}