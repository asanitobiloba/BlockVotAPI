var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const passport = require('passport');


// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
var cors = require('cors')
// const db = require('./app/db.config');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
// use Cors middleware
app.use(cors());

//passport middleware 
app.use(passport.initialize());

require('./config/passportAdmin')(passport);
require('./config/passportUser')(passport);



app.options('*', cors());
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

// require('./routes/main.route')(app);

/** set up routes {API Endpoints} */
app.use(require('./routes'));

// app.get("*", (req,res)=>{
// 	res.sendFile(path.join(__dirname, 'public/index.html'))
// })


// Create a Server
var server = app.listen(process.env.PORT || 3000, function () {

  var host = 'localhost'
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})