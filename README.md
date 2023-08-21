# Anti-cheat system for students and examiners.

* This web system enables students to sit a proctored exam and examiners to maintain academic integrity.

# Run Application Locally

* Clone this repository.
* Open the 41127-Software-Design-Studio folder in VS Code/similar IDE. Once we employ further security measures, you may need to run your IDE as administrator.
* Ensure you have MongoDB (create a free account) and Node.js (LTS v18.17.1 - to check which version you have run "node --version" in the Terminal). Node.js download link: https://nodejs.org/en/download. Express.js and React.js should be downloaded when running "npm install".
* The server will start in localhost:3000.

```sh
npm install
```
Run this command in both the client and server folder. This will create a node_modules folder (do not commit).

```sh
npm run build
```
This can be run in the client folder to ensure all components are properly built. This will create a local build folder (do not commit).

```sh
npm run start
```
Run in the client folder to view the site in your browser. 

```sh
nodemon
```
Run this in the server folder to start the backend. You can also write "npm run start" in server to achieve the same result.

```sh
npm run test
```
Run in client folder to execute unit tests. See App.test.js for an example.

# Troubleshooting

* Node.js can be quite sensitive when it comes to versions. To check which version you have run "node --version" in the Terminal. To change versions, type "nvm use [version number]". If this doesn't work, you may need to delete the older Node version before trying again.
* Sometimes packages will not update cleanly. To fix this, delete the "node_modules" folder and run "npm install" again.
* The browser site may produce 404 or 500 errors if the backend is not running. Ensure "nodemon" has been run alongside the client start before refreshing.
* Firefox may encounter produce console errors around content security. Consider switching to Chrome if issues persits.
* As I discovered the hard way, there are existing issues around CommonJS and ESM compatability. Please import using = require() as opposed to import if you receive linting errors or issues with modules being unreadable. For more information: https://masteringjs.io/tutorials/node/html-to-pug. 
