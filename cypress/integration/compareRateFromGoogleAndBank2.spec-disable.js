/// <reference types="cypress" />

import { onGooglePage } from "../support/page_object/GooglePage"
import { dict } from "../support/const/Dict"
import { utils } from "../support/utils"

describe('google a currency rate and compare with rate from the bank of Canada [2]', () => {

    const currenciesTo = [dict.CURRENCY.AUD.name, 
                dict.CURRENCY.BRL.name,
                dict.CURRENCY.JPY.name]

    const currencyFrom = dict.CURRENCY.CAD.name

    beforeEach('open Google page', () => {
        cy.visit("/");
        onGooglePage.getSearchInput().should('be.visible')
    })

    afterEach('remove cookies', () => {
        utils.removeAllCookies()
    })

    // validate that exchange rate from Google and from Bank of Canad
    // differ by no more than 1 percent
    currenciesTo.forEach(currencyTo => {
        it("from " + currencyFrom + " to " + currencyTo, () => {
            onGooglePage.search("rate " + currencyFrom + " to " + currencyTo)
            onGooglePage.getCurrencyConverterArea().should('be.visible')

            onGooglePage.getCurrencyConverterArea().find('div').eq(2).find('span').eq(0).then( 
                (rateFromGoogle) => {
                cy.log('rate from Google: ' + currencyFrom + " to " + currencyTo + ": " + rateFromGoogle.text())
                cy.request('GET', Cypress.env('rateAPI').replace("{FROMTO}", currencyFrom + currencyTo)).then(
                    (response) => {
                        expect(response.status).to.eq(200)
                        var len = response.body.observations.length
                        var rateFromBank = response.body.observations[len - 1]['FX' + currencyFrom + currencyTo].v
                        cy.log("rate from bank: " + currencyFrom + " to " + currencyTo + ": " + rateFromBank)
                        rateFromBank = parseFloat(rateFromBank.replace(",", "."))
                        rateFromGoogle = parseFloat(rateFromGoogle.text().replace(",", "."))
                        var diff = Math.abs(rateFromBank - rateFromGoogle)
                        var diffPerc = diff*100.0/Math.max(rateFromBank, rateFromGoogle)
                        cy.log("Difference for " + currencyFrom + " to " + currencyTo + " is " + diff + ", what is " + diffPerc + "%")
                        expect(diffPerc).to.be.lessThan(1)
                    }
                )
            });
        })
    })
})