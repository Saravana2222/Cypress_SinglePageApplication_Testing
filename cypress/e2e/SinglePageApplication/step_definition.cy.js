import {Given, When, And, Then} from 'cypress-cucumber-preprocessor/steps';
import spa_homepage from '../../support/pages/spa_homepage.js';
import spa_eventpage from '../../support/pages/spa_eventpage.js';
                                     //Cypress intellisence feature

const homepage = new spa_homepage();
const eventpage = new spa_eventpage();
let urls;
let funFact;


before(()=> {
    cy.fixture('urls.json').then((data) => {
        urls = data;
    });

    cy.fixture('fact.txt').then((data) => {
        funFact = data;
    });
});

Given('User launch the Single Page Application', () => { 
    cy.visit(urls.spa_url);
});

When('User navigate to the header section of homepage and verify the icon is displayed', () => {
    homepage.isIconDisplayed();        
});

Then('User verify the Catendar name is displayed in the homepage', () => {
    homepage.isCalendarTextDisplayed();
});

And('User verify whether the current month and year are displayed by default in the homepage', () => {
    homepage.isCurrentMonthYearDisplayed();
});

Then('User verify that all the days of the month are visible', () => {
    homepage.isAllDaysDisplayed();                                          //verify the month has all days dispalyed
    homepage.isSevenDaysDisplayed();                                        //verify 7 (SUN to SAT) days are displayed in each month
});

And('User navigate to the current date and verify that the date is highlighted', () => {
    homepage.isCurrentDateHighlighted();
});

Then('User verify the label text, Create button and Today button are displayed in the homepage', () => {
    homepage.isLabel_Create_TodayDisplayed();
});

When('User navigate to the previous month by clicking on the left arrow', () => {
    homepage.navigateToPrevMonth();
});

Then('User verify whether the Previous month and year are displayed in the homepage', () => {
    homepage.verifyPrevMonthNavigations();
});

When('User click on Today button', () => {
    homepage.clickOnTodayBtn();
});

Then('User verify that it is taking to the current date and month', () => {
    homepage.verifyTodayButton();
});

When('User navigate to the next month by clicking on the right arrow', () => {
    homepage.navigateToNxtMonth();    
});

Then('User verify whether the Next month and year are displayed in the homepage', () => {
    homepage.verifyNxtMonthNavigations();    
})



Given(/^User launch the Single Page Application with "([^"]*)" and "([^"]*)"$/, (username, password) => {
    cy.visit('http://localhost:3000/');
        // Below steps can be used to perform login
        // cy.get('#username').type(username);
        // cy.get('#password').type(password);
        // cy.get('#login').click();

})

And(/^User create event with "([^"]*)" on "([^"]*)" with "([^"]*)"$/, (eventName, eventDate, eventColour) => {
    eventpage.createDiaryEvent(eventName, eventDate, eventColour);
})

Then(/^User verify the created event "([^"]*)" is displayed in the diary with "([^"]*)"$/, (eventName, eventColour) => {
    eventpage.verifyDiaryEvent(eventName, eventColour);
})

When(/^User delete "([^"]*)"$/, (eventName) => {
    eventpage.deleteDiaryEvent(eventName);
})

Then(/^User verify that the "([^"]*)" is not displayed in homepage$/, (eventName) => {
    eventpage.EventNotExists(eventName);
})

When(/^User retrives fun fact using "([^"]*)" API call$/, (apiMethod) => {
    homepage.retriveFunFact(apiMethod);
})

Then(/^User verify the fun fact is displayed in SPA application header$/, () => {
    homepage.verifyFunFactText(funFact);
})

And(/^User verify the name "([^"]*)" is displayed in SPA application header$/, (headerName) => {
    homepage.verifyHeaderText(headerName);
})