const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json()); //this middleware will turn json files into js objects
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
// set the DBname before this "?retryWrites"
const dbURL = 'mongodb+srv://shuhatdev:shuhat3231@practisecluster.z9vmu1n.mongodb.net/jwtDB?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render(`home`));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes)

//cookies
app.get('/set-cookies',(req,res)=>{

  res.cookie('newUser', false, {maxAge: 100000, httpOnly: true, secure: true})
  res.send('You got the cookies!')

});

app.get('/read-cookies',(req,res)=>{

  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);

});