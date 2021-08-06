const { utils } = require("../utils")

export class GooglePage {

    getSearchInput() {
        return cy.get('input[name="q"]').eq(0);
    }

    getCurrencyConverterArea() {
        return cy.get('#knowledge-currency__updatable-data-column')
    }

    search(text) {
        onGooglePage.getSearchInput().clear()
        onGooglePage.getSearchInput().type(text + '{enter}')
    }

}

export const onGooglePage = new GooglePage()