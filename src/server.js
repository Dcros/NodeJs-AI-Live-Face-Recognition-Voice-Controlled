const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const assert = require('assert');
const https = require('https');
const fs = require('fs');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const app = express();
//save in a constant the database url
const { url } = require('./config/database')
//call passport.js here its ready!
require('./config/passport')(passport);
//setting port and view client web engine as ejs change it to !!!443 if you are using HTTPS SSL CERTIFICATE¡¡¡
app.set('port', 3000 );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//static files
app.use(express.static(path.join(__dirname, 'public')));
//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'yourSecretWordPass',
    resave: false,
    saveUninitialized: false
}))
//--passport.js runing every timeits requested
app.use(passport.initialize());
//--passaport session running everytime passaport activate it
app.use(passport.session());
app.use(flash());
//routes its called to operate here with the previous called passport.js and app wich its defined earlyer here
require('./app/routes')(app, passport, url, mongodb, MongoClient, bodyParser);
//Os detection
var itsWindows = process.platform === "win32";
var itsMac = process.platform === "darwin";
var itsLinux = process.platform === "linux";
//Database auth connect and server listen on port
mongoose.connect(url, (err, database) => {
    if(err){
       console.log('Cant connect to Auth Database!');
    }else if(itsWindows){
       console.log('Your Os its Windows--Auth');
       console.log('Auth Database Connected!');
    }else if(itsMac){
       console.log('Your Os its Mac--Auth');
       console.log('Auth Database Connected!');
    }else if(itsLinux){
        console.log('Your Os its Linux--Auth');
        console.log('Auth Database Connected!');
    }else{
        console.log('Auth Database Connected!');
    }
});
MongoClient.connect(url, (err, db) =>{
    if(err){
        console.log('Cant connect to Work Database!!');
    }else if(itsWindows){
        console.log('Your Os its Windows--Work');
        console.log('Work Database Connected!!');
    }else if(itsMac){
        console.log('Your Os its Mac--Work');
        console.log('Work Database Connected!!');
    }else if(itsMac){
        console.log('Your Os its Linux--Work');
        console.log('Work Database Connected!!');
    }else{
        console.log('Work Database Connected!!');
    }
});

//optinos of the https just create the directory www before in root folder and put there your certificates SSL
/*const optionsHTTPS = {
    key: fs.readFileSync("./www/keys/domain-key.pem"),
    cert: fs.readFileSync("./www/keys/domain-crt.pem")
};*/

//http server new, for https just change http to https(npm i -s https) and then add optionsHTTPS before app like (optionsHTTPS, app)
var server = http.createServer(app);
//server listen on port
server.listen(app.get('port'), () => {
  console.log('HTTP server listening on port ' + app.get('port'));
});

// WebSocket server
var io = require('socket.io')(server);
io.on('connection',function(socket){
    socket.on('commandAwayts',function(data){
        if(data.startfaceREye){
            //Require Start Face Detection Message
            require('./app/fsocket')(socket);
            console.log('Socket Face Detect-Recognition Start.');
        }else if(data.stopfaceREye){
            //recive Stop Face Detection-Recognition Message
            var msgStps = data.stopfaceREye;
            module.exports = {
                commandface: msgStps
            };
        }else if(data.startpersonDet){
            //Require Start Person Detection Message
            require('./app/psocket')(socket);
            console.log('Socket Person Detect Start.');
        }else if(data.stoppersonDet){
            //recive Stop Person Detection Message
            var msgPStps = data.stoppersonDet;
            module.exports = {
                commandper: msgPStps
            };
        }else{
            console.log("No Socket active found.");
        }
    });
});
