require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');

const path = require('path');

const handlebarsEngine = require('./app/configs/handleBars.config');
const handleRoute = require('./routes');

const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 30 * 60000 },
  }),
);

handlebarsEngine(app);
handleRoute(app);

app.listen(4001, () => {
  console.log('Server is running on port 4001');
});
