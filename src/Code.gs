/*
 * Check euroMillions results every Tuesday and Friday between 12 PM and 1 AM, add a new row to the specified sheet with the date
 */
function checkResults() {
    var shouldCheckByRapidAPI = JSON.parse(PropertiesService.getScriptProperties().getProperty('CHECK_BY_RAPID_API'));
    Logger.log('Checking by ' + (shouldCheckByRapidAPI ? 'Rapid API ' : 'email '));
    if (shouldCheckByRapidAPI) {
        checkByRapidAPI();
    } else {
        checkByEmail();
    }
}