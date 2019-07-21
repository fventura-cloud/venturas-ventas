const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
// Initializations

const app = express();
// ME QUEDE EN 0:24:43
// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); //config vistas

// Middlewares
app.use(express.urlencoded({extended:false}));  //Para recibir los datos de usuario: email, pwd
app.use(methodOverride('_method')); //truco para enviar put y delete
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

// Global Variables

// Routes

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files *********

// Server is listening ********

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})