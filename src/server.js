const express = require("express");
const app = express();
const db = require('./database/index');

const session = require('express-session'); 
const store = require('express-mysql-session');
const MySQLStore = store(session);
const sessionStore = new MySQLStore({}, db);

const routes = require('./router');

app.use(
  session({
    key: 'regicssystem',
    secret: 'regicssystem',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    createDatabaseTable: true,
    checkExpirationInterval: 900000,
    expiration: 86400000
  })
);

app.use('/students', routes);
app.listen(3000);