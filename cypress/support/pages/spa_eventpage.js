/// <reference types= "cypress" /> 
class spa_eventpage {

    get spa_elements() {
        return require('../locators/spa_locators.js')
    }

    createDiaryEvent(eventName, eventDate, eventColour){
        cy.xpath('//span[text()="' + eventDate + '"]').click();
        cy.xpath(this.spa_elements.create_btn).click();
        cy.get(this.spa_elements.add_title).type(eventName);
        cy.get('span.bg-' + eventColour +'-500').click();
        cy.get(this.spa_elements.save_btn).click();
    }

    verifyDiaryEvent(eventName, eventColour){
        cy.xpath('//div[text()="' + eventName + '"]').should('exist')
        .then((el) => {                  
            let classAttribute = el.prop('class');
            expect(classAttribute).to.contains('bg-' + eventColour + '-200');                                 // verify the event colour                         
        })
        .click();

        cy.get(this.spa_elements.add_title).then((el) => {                  
            let valueAttribute = el.prop('value');
            expect(valueAttribute).eq(eventName);                           
        });
        cy.get('span.bg-' + eventColour +'-500').invoke('text').should('eq', 'check') ; //Verify the selected label
        cy.xpath(this.spa_elements.close_event).click();
        cy.xpath('//span[text()="' + eventColour + '"]').should('exist');
    };

    deleteDiaryEvent(eventName){
        cy.xpath('//div[text()="' + eventName + '"]').should('exist')
        .click();
        cy.xpath(this.spa_elements.delete_event).click();
        cy.xpath('//div[text()="' + eventName + '"]').should('not.exist');
    };

    EventNotExists(eventName){
        cy.xpath('//div[text()="' + eventName + '"]').should('not.exist');
    };


}
export default spa_eventpage;