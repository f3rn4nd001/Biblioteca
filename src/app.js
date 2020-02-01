const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session')
const path = require('path');
const monsgoose = require('mongoose');
const router = express.Router();
require('./database');


app.set('port', process.env.PORT || 7000);

app.use(bodyParser.json());

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));



app.use(require('./routes/principal'));
app.use(require('./routes/index'));
app.listen(app.get('port'), () => {
    console.log('el servidor esta activo', app.get('port'));
});