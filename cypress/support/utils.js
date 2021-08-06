export class Utils {

    saveTextToRunTimeFile(text, fileName) {
        cy.writeFile(Cypress.env('pathToDataFiles') + fileName + '.txt', text)
    }

    getTextFromRunTimeFile(fileName) {
        return cy.readFile(Cypress.env('pathToDataFiles') + fileName + '.txt')
    }

    removeAllCookies() {
        cy.getCookies().then(
            (cookies) => cookies.forEach(cookie => cy.clearCookie(cookie.name))
        )
    }

}

export const utils = new Utils()