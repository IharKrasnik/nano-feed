## Commands
`npm run build:dev` - builds project and put it into `web` project.
`npm run build:prod` - builds prod version of project.
`npm run test` - runs lint.
`npm run test:full` - runs unit tests in all installed browsers on your system.

## FAQ 
Q: On the web app script sends data to wrong api.
S:
  1) Open `src/config.js` and change `API_URL` to your api adress.(e.g. `http://localhost:3001/track`).
  2) run `npm run build:dev` inside the `tracker` project.
