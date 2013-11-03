## Prerequisites

* [git](http://git-scm.com/) - Optionally you may want to install a [GUI Client](http://git-scm.com/downloads/guis).
* [Node.js](http://nodejs.org/) - The installer will also install [npm](https://npmjs.org/).
* [bower](http://bower.io/) - After you have npm, simply run `npm install -g bower`.
* [Apache Cordova](http://cordova.apache.org/) - After you have npm, simply run `npm install -g cordova`.
* [MongoDB](http://www.mongodb.org/) - Optionally you may want install [additional tools](http://mongodb-tools.com/) to, for example, view the contents of the database using a GUI.
* Text Editor or IDE: [Sublime Text](http://www.sublimetext.com/), [Brackets](http://brackets.io/), [WebStorm](http://www.jetbrains.com/webstorm/), [VIM](http://www.vim.org/), [GNU Emacs](http://www.gnu.org/software/emacs/) or other.

## Node.js Hello World

The application inside will show a simple `'Hello World'` Node.js application.

* `cd 1NodeHelloWorld/` - Go into the main folder.
* `node hello.js` - Run the Node.js application.
* Open your favorite web browser (e.g. Chrome, Firefox, Safari, IE) and visit: http://127.0.0.1:1337/.

## Node.js HTTP

The application inside will show a simple [Web Server](http://en.wikipedia.org/wiki/Web_server) using Node.js.

* `cd 2NodeHTTP/` - Go into the main folder.
* `node rest.js` - Run the Node.js application.
* Open your favorite browser and visit: http://127.0.0.1:1338/api/contacts to see the [Web API](http://en.wikipedia.org/wiki/Web_API) returning a list of contact objects. Visit any other URL (e.g. http://127.0.0.1:1338/) to see the 'Hello World' message.
 
## Node.js + Express + Mongo + jQuery

The application inside will show a working [REST API](http://en.wikipedia.org/wiki/Representational_state_transfer) that returns contact objects (e.g. `{name: 'carlos', age: 25}`). It will also show a jQuery [single page application](http://en.wikipedia.org/wiki/Single-page_application) that will show the contact objects, filter them and allow the end-user to add new contact objects.

* `cd 3NodeExpressMongojQuery` - Go into the main folder.
* `npm install` - Install the right dependencies for the server ([express](http://expressjs.com/) and [mongoose](http://mongoosejs.com/)).
* `cd 3NodeExpressMongojQuery/public/` - Go into the public folder.
* `bower install` - Install the right dependencies for the client ([jquery](http://jquery.com/)).
* `cd ..` - Go back to the main folder (`3NodeExpressMongojQuery`).
* `mongod` - Start the MongoDB daemon. 
* You may want to change the port from `80` to something else in `server.js`. Otherwise, you must run the next command with `sudo`. I will assume it will run on port `80`.
* `[sudo] node server.js` - Run the server.
* If you have contacts in your database you should see them by visiting: http://localhost/api/contacts
* Visit the jQuery single page application here: http://localhost/.

## Node.js + Express + Mongo + AngularJS

This application is similar to the jQuery Single Page application above. However, this one uses a higher level framework that allows the code to be more structured using the [Model View Controller](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern.

* `cd 4NodeExpressMongoAngular` - Go into the main folder.
* `npm install` - Install the right dependencies for the server ([express](http://expressjs.com/) and [mongoose](http://mongoosejs.com/)).
* `cd 4NodeExpressMongoAngular/public/` - Go into the public folder.
* `bower install` - Install the right dependencies for the client ([angular](http://angularjs.org/) and [bootstrap](http://getbootstrap.com/)).
* `cd ..` - Go back to the main folder (`4NodeExpressMongoAngular`).
* `mongod` - Start the MongoDB daemon. 
* You may want to change the port from `80` to something else in `server.js`. Otherwise, you must run the next command with `sudo`. I will assume it will run on port `80`.
* `[sudo] node server.js` - Run the server.
* Visit the Angular single page application here: http://localhost/.

## Node.js + Express + Mongo + AngularJS + Apache Cordova

This application uses the Node.js + Express REST API we have been using get get the contact objects to the client. These contact objects are still being saved using MongoDB. Angular is still used to provide structure to our application. The difference is this application is packaged as a mobile application. You could submit it to one of the Mobile Application Stores (Apple's App Store, Google Play, etc). 

* `cd 4NodeExpressMongoAngular` - Go into the main folder.
* Make sure `www/scripts/app.js` (line 38) is pointing to your local IP address (not `'localhost'`).
* `cd wwww` and `bower install` - Install the right dependencies for the client ([angular](http://angularjs.org/) and [bootstrap](http://getbootstrap.com/)).
* `cordova emulate ios` will open the application in the iOS simulator. You must be running on a Mac and have [Xcode](https://itunes.apple.com/us/app/xcode/id497799835) installed.
* `cordova emulate android` will open the application in the Android emulator. You must have the `ANDROID_SDK` in your path, get it [here](http://developer.android.com/sdk/index.html). If you have issues getting geolocation information on android, it could be [an issue with cordova](http://stackoverflow.com/q/19567798/186909).






