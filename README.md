# Cypress Test Automation Framework with Cucumber
This Automation Framework made in JavaScript for testing Web functionality, API verification with BDD and page object pattern libraries to run tests.

## Setup
CypressIO doesn't support BDD directly as it is developed based on Mocha, hence mainly the tests are mocha based specs. To integrate BDD test developement we need a preprocessor. One such pluin is [cypress-cucumber-preprocessor]

### Pre-Requisite
##### Node version > 12 required
##### IDE (VS code) 

### Install the dependencies
##### npm install --save-dev

### Launching Cypress
#### npx cypress open   


### Running the script
##### Headed mode: 
###### npx cypress run --spec cypress/e2e/SinglePageApplication/spa_tests.feature --headed --browser chrome
##### Headless mode:
###### npx cypress run --spec cypress/e2e/SinglePageApplication/spa_tests.feature --browser chrome

### Reporting
###### mochawesome report will be generated in report folder (cypress\reports\html\index.html) when the test run in headless mode

###
