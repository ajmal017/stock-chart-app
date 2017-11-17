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

## Credits

Copyright 2017 Andrej Stupar - andr.stup@gmail.com under the MIT Licence

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.