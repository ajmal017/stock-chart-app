# Stock chart app

Usage:

* View a graph displaying the recent trend lines for each added stock
* Add new stocks by their symbol name
* Remove stocks
* See changes in real-time when any other user adds or removes a stoc


### This project is using the following technologies: 

* Angular 4
* Node ExpressJs
* Highcharts
* Web sockets (through socket.io)
* Mongodb database
* see package.json for full list of dependencies

## Server

Run `npm start` for server. Server will serve the compiled distributuon app. Navigate to `http://localhost:3000/`.

## Dev server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Note

You have to set up your own mongo database either local either from an outside service. This project is set for mLab free hosting service. Modify the mongoose.connect url parameters in db/db.js to setup your own. 