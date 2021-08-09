# cypress_demo

## Before test run

```
git@github.com:aabramenko/cypress_demo.git
cd cypress_demo
npm install
```

## Run tests using the Cypress Test Runner

```
npx cypress open
```

and then run tests using UI of the cypress test runner.

## Run tests from a command line without docker container

```
npm run cy:run
```

## Run tests from a command line in a docker container

```
docker build -t cypress-demo .
docker-compose up
```

## Run tests using GitHub actions

Tests are started on every push here: https://github.com/aabramenko/cypress_demo/actions


## Reports

The "Mochawesome report" is created after each run on a local instance and saved as an html file in the folder "cypress_demo/mochawesome-report/"

Each run (including GitHub actions) are logged on the Cypress Dashboard https://dashboard.cypress.io/projects/9eiexc