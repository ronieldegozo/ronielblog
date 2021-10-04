const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const passport = require('passport');
const bodyParser = require('body-parser');
const multer = require('multer');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const csrf = require('csurf');
dotenv.config({path: './config/config.env'});
const connectDB = require('./util/database');
connectDB();

// passport config
require('./config/passport')(passport);


// mongostore

//home ROUTES 
const homeRoute = require('./routes/home');
const storyRoute = require('./routes/user-story');
//404 no page fond
// const {get404} = require('./controller/404');
const errorController = require('./controller/error');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)

    cb(null, + Date.now() + '-' + file.originalname );

  }
})

const fileFilter = (req,file, cb) =>{
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage: storage, fileFilter: fileFilter}).single('image'));
app.use(express.json())

// method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
}))

// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images'))); //IMAGES PATH

//EJS
const {formatDate,truncate,stripTags,editIcon} = require('./helper/ejs');
// ejs engine
// app.engine('ejs', ejs({helper: {formatDate}}))
const csrfProtection = csrf();
app.set('view engine', 'ejs', ({helper: {formatDate,truncate,stripTags,editIcon}}));

// session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://roniel:roniel@blog.rdmjs.mongodb.net/mystory?retryWrites=true&w=majority' })
}))

//passport middleware
app.use(csrfProtection);
app.use(passport.initialize());
app.use(passport.session());


//set global variables
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    res.locals.csrfToken = req.csrfToken();
    next();
})



//ROUTE
app.use(homeRoute);
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

// news
app.use('/new', require('./routes/news'));
// about me
app.use('/user', require('./routes/me'));

app.use('/user',storyRoute );

app.use('/500', errorController.get500);
//error code 404
app.use(errorController.get404);
//SYSTEM PROBLEM ERROR
app.use((error, req, res, next) => { //ERROR MIDDLEWARE
    res.redirect('/500'); //throwing a 500 page error
  });
  


app.listen(PORT, console.log(`Server running on port 3000`));
