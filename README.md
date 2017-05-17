[![Build Status](https://travis-ci.org/andela-rhenshaw/Ace-DMS.svg?branch=chore%2F%23142416561-integrate-travisCI)](https://travis-ci.org/andela-rhenshaw/Ace-DMS)
[![Coverage Status](https://coveralls.io/repos/github/andela-rhenshaw/Ace-DMS/badge.svg?branch=chore%2F%23142416561-integrate-travisCI)](https://coveralls.io/github/andela-rhenshaw/Ace-DMS?branch=chore%2F%23142416561-integrate-travisCI)
[![Code Climate](https://codeclimate.com/github/andela-rhenshaw/Ace-DMS/badges/gpa.svg)](https://codeclimate.com/github/andela-rhenshaw/Ace-DMS)
# Ace-DMS
Ace-DMS is a full stack document management system, complete with roles and privileges . Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.
Users are categorized by roles. Users with access to specific documents can edit and update their documents but will not be granted access to read or write to a document with unathourized access role, only a view access.


## Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/79158ea63ffdea6731dd)

## Features

1. **Authentication**
  - It uses JWT for authentication.  
  - It generates and returns a token on successful login or creation of a user.
  - It saves users tokens to be used to manage sessions  
  - It verifies the token on every request to authenticated endpoints.

2. **Users**
  - It allows creation of new users. 
  - It ensures no other user can be assigned the admin role (there are only two admin roles)
  - It sets a newly created user's role category to `regular` by default.  
  - It allows created user to edit/update their information.
  - Only the admin user can update/edit other users information.
  - All registered users can be retrieved by the admin user or other registered users (it doesn't return sensitive information(passwords, tokens) of the users retrieved).

3. **Roles**
  - It makes sure  that created users have a role defined.
  - It ensures new roles can be created, updated and deleted by only the admin user.   
  - It does not currently allow the admin user carry out CRUD operations on the roles but that could be easily enabled.

4. **Documents**
  - It allows new documents to be created/saved by users.  
  - It ensures all documents have an access type defined (default access type is `public`).  
  - It allows only admin users retrieve all documents regardless of the document required access type.  
  - It ensures document retrieval by their owners, public access typed documents can be retrieved by all users and role access typed documents can be retrieved by ONLY users with the same role level as the document owner.     
  - It ensures only authenticated users can delete, edit and update documents they own and users cannot delete documents they do not own (with the exception of the admin). 

## Technologies
Ace-DMS is implemented using a number of technologies, these include:
* material-ui - Material design components for react
* material-css - Material design components for react
* react-materialize - Material design components for react
* react.js - Open-source JavaScript library for building user interfaces
* [node.js] - evented I/O for the backend
* [babel-cli] - Babel Command line interface 
* [babel-core] - Babel Core for javascript transpiling
* [babel-loader] - Adds Babel support to Webpack
* [babel-preset-es2015] - Babel preset for ES2015
* [babel-preset-react] - Add JSX support to Babel
* [babel-preset-react-hmre] - Hot reloading preset for Babel
* [babel-register] - Register Babel to transpile our Mocha tests]
* [eslint] - Lints JavaScript
* [expect] - Assertion library for use with Mocha
* [express] - Serves development and production builds]
* [mocha] - JavaScript testing library
* [npm-run-all] - Display results of multiple commands on single command line
* [webpack] - Bundler with plugin system and integrated development server
* [webpack-dev-middleware] - Adds middleware support to webpack
* [webpack-hot-middleware] - Adds hot reloading to webpack


   [mocha]: <https://mochajs.org>
   [node.js]: <http://nodejs.org>
   [React]: <http://gulpjs.com>
   [babel-cli]: <https://babeljs.io/>
   [babel-core]: <https://babeljs.io/>
   [babel-loader]: <https://babeljs.io/>
   [babel-preset-es2015]: <https://babeljs.io/>
   [babel-preset-react]: <https://babeljs.io/>
   [babel-preset-react-hmre]: <https://babeljs.io/>
   [babel-register]: <https://babeljs.io/>
   [eslint]: <http://eslint.org/>
   [expect]: <http://chaijs.com/api/bdd/>
   [express]: <http://expressjs.com/>
   [mocha]: <https://mochajs.org/>
   [npm-run-all]: <https://www.npmjs.com/package/npm-run-all>
   [webpack]: <https://webpack.github.io/>
   [webpack-dev-middleware]: <https://webpack.github.io/>
   [webpack-hot-middleware]: <https://webpack.github.io/>

## Contributing
1. Fork this repository to your GitHub account
2. Clone the forked repository and cd into it
3. Create a .env file in the root of the project using the sample .env.sample in the root directory

5. Install all dependencies by running this command below in your terminal/shell
    ````
    npm install
    ````
6. Run the command below in your terminal/shell (initializes and seeds the database tables)
    ```` 
    sequelize db:migrate && sequelize db:seed:all
    ````
7. To run the development server enter the command below in your terminal/shell
    ````
    npm run start:server
    ````
    You should also explore the scripts section of the package.json to gain familiarity with other npm commands available 
    for this app.
8. Create your feature branch
9. Commit your changes
10. Push to the remote branch
11. Open a Pull Request

## Task List
- [x] Setup Version Control System
- [x] Integrate Hound CI service
- [x] Integrate Travis CI service
- [x] Integrate Code Coverage and Code Quality service
- [x] ORM (Sequelize) setup
- [x] Create specified API endpoints
- [x] Implement Feedback from API defense
- [ ] Set up Webpack to run mundane tasks for development of the Client side
- [ ] create a frontend/client side interface using React with Redux architecture


