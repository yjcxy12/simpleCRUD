# Simple CRUD

This project is a frontend-focused single page application that contains very simple Express.js server act as an api server.
Client tech stack is React, Redux and Webpack and is the main showcase of the project.

## Starting

After cloning the repository (or download it), install dependancies.
```bash
npm install
```
Install babel-cli to build this project
```bash
npm install -g babel-cli
```
Test Command
```bash
npm run test
```
Start server in develop mode (source-map). 
Then go to url http://localhost:3000
```bash
npm run start:dev
```
Start server in production mode (minified and uglified). 
Then go to url http://localhost:3000
```bash
npm run start
```

## Functionality

"database" file is in "dist/data.json".

### Create User

Click on Create New button on the Header. A form will show and fill in first name, surname and choose category and click Submit Button.
If the action is successful the user list would show the new added user.

### Edit User

Click on Edit button for coresponding person. A form will show and amend any field.
If the action is successful the user information would be updated.

### Remove User

Click on Remove button for coresponding person.
If the action is successful the user would be removed from the list.

### Error handling

If any of the action is unsuccessful, a popup will show on the bottom of the screen.

## Tests

The tests are not exhaustive. Using Mocha, Chai and jsdom to test actions, async actions and reducers. Components testing is missing due to webpack conflicts with css files. Further research would be needed.