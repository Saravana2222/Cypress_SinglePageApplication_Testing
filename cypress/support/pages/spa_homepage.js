class spa_homepage {

    get spa_elements() {
        return require('../locators/spa_locators.js')
    }

    isIconDisplayed(){
        cy.get(this.spa_elements.calendar_icon).should('exist'); 
    }

    isCalendarTextDisplayed(){
        cy.get(this.spa_elements.calendar_txt).then(($el)=> {
            expect($el.text()).eq('Catendar');                            
        })
    }

    isIcon_TextDisplayed(){
        
        ////*** TBC removed */
    }
    verifyCurrentMonthYear(locator){
        const d = new Date();
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let currentMonthYear = months[d.getMonth()] + ' ' + d.getFullYear();
        
        cy.get(locator).then(($el)=> {
            expect($el.text()).eq(currentMonthYear);                         //verify header current month and year
        });

        cy.get(this.spa_elements.leftPane_currentMonth_txt).then(($el)=> {
            expect($el.text()).eq(currentMonthYear);                         //verify left pane current month and year
        });
    }

    navigateToPrevMonth(){
        cy.xpath(this.spa_elements.header_left_nav).click();
    }

    verifyPrevMonthYear(){
        
        const d = new Date();
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let prevMonth_Year = months[d.getMonth()-1] + ' ' + d.getFullYear();

        cy.get(this.spa_elements.currentMonth_txt).then(($el)=> {
            expect($el.text()).eq(prevMonth_Year);                          //verify header Previous month and current year
        });

        cy.get(this.spa_elements.leftPane_currentMonth_txt).then(($el)=> {
            expect($el.text()).eq(prevMonth_Year);                          //verify left pane Previous month and current year
        });
    }

    clickOnTodayBtn(){
        cy.xpath('//button[text()="Today"]').click();
    }

    navigateToNxtMonth(){
        cy.xpath(this.spa_elements.header_right_nav).click();
    }
    
    verifyNxtMonthYear(){
        const d = new Date();
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let nextMonth_Year = months[d.getMonth() + 1] + ' ' + d.getFullYear();
        cy.get(this.spa_elements.currentMonth_txt).then(($el)=> {
            expect($el.text()).eq(nextMonth_Year);                          //verify header next month and current year
        });

        cy.get(this.spa_elements.leftPane_currentMonth_txt).then(($el)=> {
            expect($el.text()).eq(nextMonth_Year);                          //verify left pane next month and current year
        });  
    }

    isCurrentMonthYearDisplayed(){
        this.verifyCurrentMonthYear(this.spa_elements.currentMonth_txt);
    }

    isCurrentDateHighlighted(){
        const d = new Date();
        const allDate = ['00', '01', '02','03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        let currentDate = allDate[d.getDate()];
        cy.xpath('//p[text()="' + currentDate + '"]').then((el) => {    
            let classAttribute = el.prop('class');
            expect(classAttribute).contains('text-white rounded-full');     
        });
    }

    isLabel_Create_TodayDisplayed(){
        cy.get(this.spa_elements.label_txt).should('exist');                //Verify Label text in homepage
        cy.xpath(this.spa_elements.create_btn).should('exist');             //Verify Create button in homepage
        cy.get(this.spa_elements.today_btn).should('exist');                //Verify Today button in homepage
    }

    isSevenDaysDisplayed(){ 
        cy.xpath(this.spa_elements.weekdays_txt + '[1]').invoke('text').should('eq', 'SUN');
        cy.xpath(this.spa_elements.weekdays_txt + '[2]').invoke('text').should('eq', 'MON');
        cy.xpath(this.spa_elements.weekdays_txt + '[3]').invoke('text').should('eq', 'TUE');
        cy.xpath(this.spa_elements.weekdays_txt + '[4]').invoke('text').should('eq', 'WED');
        cy.xpath(this.spa_elements.weekdays_txt + '[5]').invoke('text').should('eq', 'THU');
        cy.xpath(this.spa_elements.weekdays_txt + '[6]').invoke('text').should('eq', 'FRI');
        cy.xpath(this.spa_elements.weekdays_txt + '[7]').invoke('text').should('eq', 'SAT');
    }

    isAllDaysDisplayed(){
        cy.get('div[class="flex-1 grid grid-cols-7 grid-rows-5"]').find('div[class="border border-gray-200 flex flex-col"]').its('length').should('eq', 35);
    }

    verifyPrevMonthNavigations(){
        this.verifyPrevMonthYear();
        this.isAllDaysDisplayed();                                          
        this.isSevenDaysDisplayed();                                        
        }
    
    verifyTodayButton(){
        this.verifyCurrentMonthYear(this.spa_elements.currentMonth_txt);
        this.isAllDaysDisplayed();                              
        this.isSevenDaysDisplayed(); 
        this.isCurrentDateHighlighted();
        }
    
    verifyNxtMonthNavigations(){
        this.verifyNxtMonthYear();        
        };

    retriveFunFact(apiMethod){
        // Fun fact will be extracted from API response and saved to fixtures/fact.txt
        // And the extracted fact will be compared with the homepage fun fact
        
        cy.request({
            method  : apiMethod,
            url     : 'https://catfact.ninja/fact',
            headers :   {
                "Accept": "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log('Fun fact: ' + response.body.fact);
            cy.writeFile('cypress/fixtures/fact.txt', response.body.fact);
        })
    }

    verifyFunFactText(fact){
        // Fun fact text will be fetched from fixtures/fact.txt to match with homepage header text
        // Since the backend integration is not there, the test will pass only for the first time.
        cy.get(this.spa_elements.fun_fact_txt).then(($el)=> {
            expect($el.text()).eq(fact);                          
        })
    }

    verifyHeaderText(headerName){
        cy.get(this.spa_elements.calendar_txt).then(($el)=> {
            expect($el.text()).eq(headerName);                          
        })
    }

}
export default spa_homepage;