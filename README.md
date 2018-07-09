WEB NOTIFIER
------------

Node.js web application written in ES6 that provides real-time web notifications thru Socket.IO. The front-end part or the client sends a keep-alive signal (thru socket.io) to backend which the backend server monitors to determine if the user is inactive for a while. If threshold is met, client will display a notification.

[This tutorial](https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o) is used to incorporate ES6 in Node.js.

## Prerequisites

- Developed using Node **v9.8.0** and NPM **5.6.0**
- Developed using Mac OSX environment but is expected to work on Linux systems

## Installation

- Clone this repository

```
$> git clone https://github.com/eapesa/web_notifier.git
```

- Run `npm install`

```
$> npm install
```

- To deploy server app, run the following command:

```
$> npm run-script start
```
