Feature: Testing Single Page Application (SPA) functionalities
    Background:
    - User verify the Single Page Application (SPA) diary view and navigations
    - User verify the creation and deletion of diary events
    - User verify Catendar / CatFact Ninja Integration


    Scenario: User Story 1: Verify the Single Page Application diary view and navigations
    Given User launch the Single Page Application
		When User navigate to the header section of homepage and verify the icon is displayed
		Then User verify the Catendar name is displayed in the homepage
        And User verify whether the current month and year are displayed by default in the homepage
		Then User verify that all the days of the month are visible
		And User navigate to the current date and verify that the date is highlighted
		Then User verify the label text, Create button and Today button are displayed in the homepage
		When User navigate to the previous month by clicking on the left arrow 
        Then User verify whether the Previous month and year are displayed in the homepage
		And User verify that all the days of the month are visible
		When User click on Today button
		Then User verify that it is taking to the current date and month
		When User navigate to the next month by clicking on the right arrow
        Then User verify whether the Next month and year are displayed in the homepage
		And User verify that all the days of the month are visible
		When User click on Today button
		Then User verify that it is taking to the current date and month


    Scenario Outline: User Story 2a: Verify SPA application diary event creation for screening call
        Given User launch the Single Page Application with "<Username>" and "<Password>"		
		When User create event with "<EventName>" on "<Date>" with "<EventColour>"
		Then User verify the created event "<EventName>" is displayed in the diary with "<EventColour>"
    Examples:
    | Username  | Password      | EventName                     | Date | EventColour |
    | testuser  | testPassword  | Saravanakumar Interview (DONE)|  14  |     indigo  |

    Scenario Outline: User Story 2b & User Story 3: Verify SPA application diary event creation for final interview call and deletion of diary events
        Given User launch the Single Page Application with "<Username>" and "<Password>"		
		When User create event with "<EventName1>" on "<Date>" with "<EventColour>"
		Then User verify the created event "<EventName1>" is displayed in the diary with "<EventColour>"
        When User create event with "<EventName2>" on "<Date>" with "<EventColour>"
		Then User verify the created event "<EventName2>" is displayed in the diary with "<EventColour>"
        When User create event with "<EventName3>" on "<Date>" with "<EventColour>"
		Then User verify the created event "<EventName3>" is displayed in the diary with "<EventColour>"
        When User delete "<EventName1>" 
        Then User verify that the "<EventName1>" is not displayed in homepage
        When User delete "<EventName2>" 
        Then User verify that the "<EventName2>" is not displayed in homepage
        And User verify the created event "<EventName3>" is displayed in the diary with "<EventColour>"
    Examples:
    | Username  | Password      | EventName1                               | EventName2                               | EventName3                               |  Date | EventColour | 
    | testuser  | testPassword  | Final Interview Slot 10:00 pm – 11:00 pm | Final Interview Slot 02:00 pm – 03:00 pm | Final Interview Slot 03:00 pm – 04:00 pm |  29   |     red     |

    Scenario Outline:: Verify the Single Page Application bonus question (Catendar / CatFact Ninja Integration)
        Given User launch the Single Page Application
        When User retrives fun fact using "<API_Method>" API call 
        Then User verify the fun fact is displayed in SPA application header
        And User verify the name "<HeaderName>" is displayed in SPA application header
    Examples:
    | API_Method  | HeaderName |
    | GET         | Catendar   |