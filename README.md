# NodeJs-AI-Live-Face-Recognition-Voice-Controlled
Its a Voice Controlled AI(Natural Language Processing) with some live face recognition and person detection, with user system(the ai recognize the user logged in) integrated and db.

(1)- Install It!

(A)To install it is simple first need node js and npm installed in your computer, links:

  https://nodejs.org
  https://www.npmjs.com/get-npm

(B)Before opening the project we must install some dependencies that the project will need and these are:

  GENERAL:

  - cmake (unless you are using a prebuilt OpenCV release) --> https://cmake.org/ 
  - MongoDB (its optional but its the one that i will show you this example) --> https://www.mongodb.com/download-center#atlas 

  WINDOWS:

  - !!! If you are on Windows type in the terminal --> "npm install --global windows-build-tools"
  -these are for be able to install opvencv image processing basic its VS2015 or VS2017 build tools --> https://www.visualstudio.com/de/downloads/ 

  LINUX and OSX:

  - libx11 (XQuartz on OSX) for the dlib GUI --> "sudo apt-get install libx11-dev"
  - libpng for reading images --> "sudo apt-get install libpng-dev"

  - cmake (unless you are using a prebuilt OpenCV release) --> https://cmake.org/ 

  THESE ARE REQUIRED MAINLY BY THESE LIBS WE ARE GOING TO USE (In case you got some errors check these links): 

  -For more info or diferent ways to install it or adapt to your project: 

    https://github.com/justadudewhohacks/face-recognition.js
    https://github.com/justadudewhohacks/opencv4nodejs

(2)- Now we have to configure everything for your personal use and I will tell you what you should change what is optional and what you can easily improve:

  - First of all after having installed all the dependencies that our project needs, it's time to go to the root folder(where package.json is) and write the following in cmd --> "npm install" 
  -It will take a while depending on your PC specs- 

  - Now we are using MongoDB here for the DB, once you installed its the folder for the DB its called "data" and its in the rute "./src/config" so for start the mongodb in that folder just use the follow comands in a new termnail:
  -This will start the DB storage in that folder and Listen in port 27017 --> "mongod --dbpath ./src/config/data"
  -For create a DB inside you have 2 options:
  2.1- Start new terminal and type "mongo" and there you can use the mongoDB commands to create a DB, collection etc...
  2.2- When you Install MongoDB install also MongoDb Compass its a GUI for control your DB, there also can create DB and etc..
  -Now that we have a DB and the mongod DB started its time to go to --> "./src/config and inside database.js change yourDBname for the name of the DB you created inside mongoDB.


  - Now if we start in the main root --> "npm run dev" , it should work, but there is one thing left to configure, because if we try to start the face recognition everything will fall apart.
  So that thing its the Face-Recognition, it start his working in the "./src/fsocket.js" there check if exist a trained json .data, wich exist! but its the one i left with my face recognition data.
  For start training your own face its simple frist read the readme inside "./src/public/imgs/users/Name" it explains how to input your face data, then change the name of "faceRecognition2Model_150.json" and you just have to run it once --> "npm run dev" go http://localhost:3000 say into the micro "open face detector"
  it will train your face and then just restart the HOLE SERVER "(its a bug that i not solved yet and there are many but its a demo)" well now restart the browser too and try it again now it should open your webcam and start recognize your face.


  - Now it detects faces, but before I would like it to find out what a person and detect him (What in the future will become a joint system first a person is detected and then the face-recongnize if what is detected is a person) well this its more easy he uses only one thing apart his own script, that is 
  a cascade trained by me to detect persons (its not the most accuracy but its not bad he do his job) and that cascade its called "myhaar4.xml ubicated in "./src/app".
  you can find youtube videos about how to train your own (for cars, dogs, cats... whatever) its easy.


(3)- About, Tips And Known Errors:

  3.1 - About:

    - You may wonder and what does it do and what does it do? Well it is a kind of assistant that with this base (maybe organized better and more optimized but eh a base) 
    can give many uses since it can hear you answer (all by voice) identify you as a user, reproduce music, search for you information, 
    up of guardian to use the detector of people and creating new systems to alert you that they have entered individuals, enumararlas etc ... 
    recognize facially with new systems could recognize or even start session just recognizing the face, in order has many applications only you have to give them.

    - Well this is a project made over NodeJs Environment, with the follow libs used:
      3.1.1 - bcrypt-nodejs": "0.0.3",
      3.1.2 - body-parser": "^1.18.2",
      3.1.3 - connect": "^3.6.6",
      3.1.4 - connect-flash": "^0.1.1",
      3.1.5 - cookie-parser": "^1.4.3",
      3.1.6 - cookie-session": "^2.0.0-beta.3",
      3.1.7 - ejs": "^2.5.8",
      3.1.8 - express": "^4.16.3",
      3.1.9 - express-session": "^1.15.6",
      3.1.10 - face-recognition": "^0.9.0",
      3.1.11 - fs": "0.0.1-security",
      3.1.12 - http": "0.0.0",
      3.1.13 - https": "^1.0.0",
      3.1.14 - jdom": "^2.0.3",
      3.1.15 - jquery": "^3.3.1",
      3.1.16 - jsdom": "^11.7.0",
      3.1.17 - mongoose": "^5.0.12",
      3.1.18 - morgan": "^1.9.0",
      3.1.19 - natural": "^0.5.6",
      3.1.20 - opencv4nodejs": "^4.3.0",
      3.1.21 - passport": "^0.4.0",
      3.1.22 - passport-local": "^1.0.0",
      3.1.23 - path": "^0.12.7",
      3.1.24 - say": "^0.14.0",
      3.1.25 - socket.io": "^2.1.0",
      3.1.26 - ssl-root-cas": "^1.2.5"
  
  3.2- Tips:

    - Well Well, of course there are things to improve to start doing these are my tips:

     3.2.1 - Clean this mess a little bit if you have time, where more its needed its in these archives:
      "./src/app/routes.js"
      "./src/public/jslib/letsrock.js"
      "./src/public/jslib/jarvisIT.js" (these last 2 in this order because if you look in the view engine ejs footer.js they called in this order to be able to work)
      "./src/public" (here its a little bit messy the structure)
      
     3.2.2 - Well in the view engine footer part "./src/views/partials/footer.ejs" finish saving all the framework dependences in the "jslib" folder
     because as you observe some are still CDN LINKS.
     
     3.2.3 - Inside "./src/public/jslib/jarvisIT.js" i use an AJAX to can send the Speech Recognition to server to interact with the natural language process network to make the AI work
     well i think it would be just better if you do with sockets, and another 2 problems with this AI are frist you better improve the dataset ubicated in "./src/app/models/dataset.js" its very poor accuracy
     and the second problem its the commands recognition and the AI speech recognition conflict sometimes (Or its my microphone a livig crap IDK).
     
     3.2.3 - Think better ways to link the diferent systems of recognition, detection, user system and database saves, its a little bit like modules separated right now.
     
     3.2.4 - The used cv.VideoCapture() from the Opencv4Nodejs done in fsocket.js and psocket.js "./src/app" its capturing the webcam device from server side if you notticed
     so it capture the webcam where the server its running and stream it to browser so hope your find a cool way to send it from browser to server use it in cv.videocapture() and return the
     result with the face detection or object detection back to browser.BTW: also works with a video like cv.VideoCapture(./myvideo.wav or .mp4...)
     
     3.2.5 - The HTTP server... as you see in server.js you are runing a HTTP server but i have also the module of HTTPS well in order to make the cam permision
     work in public your app should have a HTTPS secure SSL certificate so to do that i let some tips inside server.js near where i define "server" to guide you how 
     to enable HTTPS very easy
     
     3.2.6 - Do not take my definitions seriously and some unprofessional methods when defining and naming things I recommend changing them for something more recognizable and meaningful, 
     again this is a demo so while testing I was frustrated and put unorthodox definitions, these are mainly in the following routes --> 
     "./src/server.js" the "sockets words to stop and start the detections"
     "./src/public/jslib/jarvisIT.js" well here its just ugly the code but it can be done better
     "./src/public/jslib/letsrock.js" here its ugly and definitions and method used can be optimized alot more the "socket" ones
     
     3.2.7 - As you see the interface when you open index "http://localhost:3000" looks like empty but everything appears when its called
     by the commands wich you guys can find all and also delete or create new ones in "./src/public/jslib/jarvisIT.js" i made it cleanest possible.
     And an importat thing the circle sippining in the center its acctually 3D that i created myself and its uses a lot of resources to work 
     if you want a better optimized function just remove it from the index.ejs and delete it from the footer.ejs and from 
     "./src/public/jslib/jarvisface.js" and the folders "./src/public/webgl" and "./src/public/objects" have these 3d things or if you want test cool 3D in browser
     thing just take a look at  "./src/public/jslib/jarvisface.js" and take a look about webgl in google.

     3.2.8 - Well it works great ALL In Google Chrome and Android Google Chrome or Samsung Android Browser, but if we go to Firefox (And Probably Opera & Safari PC) 
     then to start with issues Speech Recognition wont work because of the microphone permissions and especially because the plugin that uses annyang to capture the microphone is not yet very responsive 
     with Firefox or any browser in IOS (And Probably Opera & Safari PC again...) my tip here its to include a text area to can talk with ia or action the commands another way
     and for the camera uses like as face recognition and person detect you better have an SSL HTTPS certificate to made it work as far as i test it works ont only in "Chrome, Firefox PC Browser" also in "Android Chrome and Samsung Browser" and "IOS Safari Browser"
     
     3.2.9 - The Security, There is not! beyond the session and connection to the database(in which it is not mentioned but you can configure a user so that not all those in your local network can access without auth also search in Google), 
     luckily this account with integrated methods in the libraries still do not help if when you inspect the source code is all naked there..., to improve this I recommend using Webpack, 
     search in Google tutorial how to integrate it together with nodejs.
     
     And for sure there are more, if you guys find them just tell me in the comments.
 


  3.3- Known Errors & Bugs:

    - Hmm where i should begin, ah yes if you find more and can solve them or need help for solve it just open an issue
      once sayed that i put here the bugs and erros i know and are still there -->
      
       3.3.1 - Well its not a secret the register inteface its very ugly and bugged and around this rudimentar login / register system for sure there are leaks
       
       3.3.2 - When you Open face recognition or person detection if you dont stop them (for this reason there are voice comands to stop these process) the server freaks out 
               so it can be fix with a better logic for what you want to use recognition and detect and then deal the proper way with them.
               
       3.3.3 - The server restart if you dont have a trained .json file for charge and the system have to create one with the input photos in the "./src/public/imgs/users/Name/faceIMG"
               so he do it good... but he restart the hole server instead of browser(client) i dont know why i suspect about nodemon ... and BTW there are better ways than nodemon to implement.
               
       3.3.4 - The Speech Recognition sometimes freaks out in the sense that sometimes he stops listening or does not respond, I imagine that because of the poor logic I gave him 
               at the time of taking the same speech recognition input to execute the commands if the case occurred in the imput and at the same time use it together with ajax to send it to the server to process it in the neural networks of the "natural" library,
               I say it because in theory the microphone is active at all times unless you give the microphone mute button.(OR AS I SAY ALLREDY MY MICROPHONE ITS CRAP)
               
       3.3.5 - In Android Devices the synthesization of the voice of the text to speech that i use change the voice with what AI responds to us(to female and the original in any browser its a male the var "defaultLanguage = 5;" "./src/public/jslib/letsrock.js")
       
       Sure there are more even that ones i have forgot anyway if you guys find new ones comment it in an Issue post.
   
THE HOLE BASE ITS COMPATIBLE WITH -->

  Last Version avalible 20/05/2018 - PC BROWSER:

    - Chrome - Works everything from the Speech Recognition to Webcam Request(in public need SSL Certificate - HTTPS).
    - Firefox - The Speech Recognition and text to speech dont work, can be fixed if you finde or create server side libs and serve to client, everything else works.
    --NOT TESTED IN-- SAFARI, OPERA, Internet Explorer, MAXTHON...

  Last Version avalible 20/05/2018 - Android BROWSER:

    - Chrome - Works everything from the Speech Recognition to Webcam Request(in public need SSL Certificate - HTTPS).
    - Firefox - The Speech Recognition and text to speech dont work, can be fixed if you finde or create server side libs and serve to client, everything else works.
    - Samsung Browser - Works everything better even than Chrome Browser.
    --NOT TESTED IN-- OPERA, Internet Explorer...

  Last Version avalible 20/05/2018 - IOs BROWSER (I know for this one the solution its made an app on Xcode with a browser base of Chrome and use the URL of a private server and made it look like an app):

    - Chrome - The Speech Recognition and text to speech dont work, can be fixed if you finde or create server side libs and serve to client, everything else works.
    - Firefox - The Speech Recognition and text to speech dont work, can be fixed if you finde or create server side libs and serve to client, everything else works.
    - Safari - The Speech Recognition and text to speech dont work, can be fixed if you finde or create server side libs and serve to client, everything else works
    --NOT TESTED IN-- OPERA, Internet Explorer...

I only have the basic license that github provides and it is open source, you can use it for whatever you want under your clear responsibility!

Special Thanks to the Wonderfull Developers that made that libs possible you save a lot of work to a lot of people thanks!

Anything that you think let me know in the comments!

By Daniel Florean.
