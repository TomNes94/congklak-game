# Mancala

This is the repository for the game hosted at mancala.tomvannes.dev. It uses NodeJS and ExpressJS for the backend. All backend code is written in Typescript. Communication between frontend and backend is done through sockets (and partly HTTP requests). For now, all state is saved in memory. This doesn't scale very well, but given the low volume of the website there's no immediate need to move all state to a SQL database.

The frontend is built using VueJS.

Further possiblitiies include amongst others a native mobile app, a login-system as well as moving all state to a database.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```
