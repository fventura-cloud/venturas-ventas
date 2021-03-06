const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
// Initialization
const app = express();
require('./database');
require('./config/passport')
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

app.use(passport.initialize()); //comes after use session
app.use(passport.session());  //comes after use session
app.use(flash());  //comes after passport
// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;  //variable global del usuario
    next();
});
// Routes

app.use(require('./routes/index'));
app.use(require('./routes/prods'));
app.use(require('./routes/users'));

// Static Files *********
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening ********

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})