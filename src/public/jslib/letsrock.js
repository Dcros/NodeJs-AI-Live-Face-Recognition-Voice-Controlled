//Defining things
var botonEdito = $('#botEdit');
var userIsnotHere = $('#userisNoteitor');
var navys = $('#navy');
var userIsHere = $('#userTeitor');
//Jarvis Voice
var msgSpeaker = new SpeechSynthesisUtterance();
var voicesGeneral = window.speechSynthesis.getVoices();
var defaultLanguage = 5;
//just asking youknow
var authQuest = $('#cojonambre');
authQuest =  authQuest[0].textContent;
//socket Opened    
var socket = io.connect('//localhost',{ 'forceNew': true }); 

//Choose subshockets
function openIfSocket(sockToOpen){
    //check What subsocket to open
    if(sockToOpen == "StartEye"){
        var sstrtEye = {
            startfaceREye: "comsStartEye",
            userHere: authQuest
        };
        socket.emit('commandAwayts', sstrtEye)
    }else if(sockToOpen == "StopsEye"){
        var sstopEye = {
            stopfaceREye: "CameraStops"
        };
        socket.emit('commandAwayts', sstopEye)
    }else if(sockToOpen == "StartPer"){
        var sstartPer = {
            startpersonDet: "comsStartPer"
        };
        socket.emit('commandAwayts', sstartPer)
    }else if(sockToOpen == "StopsPer"){
        var sstopPer = {
            stoppersonDet: "comsStopPer"
        };
        socket.emit('commandAwayts', sstopPer)
    }
    return socket
}

//------------------------------------------------STARTING THINGS-------------------------------------------------//

//sidebar toggle
/* Open Left Sidenav */
function openLNav(){
    document.getElementById("myLeftMenu").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
/* Close Left Sidenav */
function closeLNav(){
    document.getElementById("myLeftMenu").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

/* Open Right Sidenav */
function openRNav(){
    document.getElementById("myRightMenu").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
}
/* Close Right Sidenav */
function closeRNav(){
    document.getElementById("myRightMenu").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
}

/* Open Bottom Sidenav */
function openBNav(){
    document.getElementById("myBottomMenu").style.height = "250px";
    document.getElementById("main").style.marginTop = "250px";
}
/* Close Bottom Sidenav */
function closeBNav(){
    document.getElementById("myBottomMenu").style.height = "0";
    document.getElementById("main").style.marginTop = "0";
}

//checkLogin user
function checkLogin(){
    if(authQuest !== null && authQuest !== ''){
        var helloMessage = "Wellcome back %s"
        var helloMsay = helloMessage.replace('%s', authQuest);
        voicesGeneral = window.speechSynthesis.getVoices();
        msgSpeaker.rate = 10 / 10;
        msgSpeaker.pitch = 1;
        msgSpeaker.text = helloMsay;
        msgSpeaker.voice = voicesGeneral[defaultLanguage];                
        speechSynthesis.speak(msgSpeaker);
        openLNav();
    }else{
        var authPl = "Say Identify to login"
        var authPlease = authPl.replace('%s', authQuest);
        voicesGeneral = window.speechSynthesis.getVoices();
        msgSpeaker.rate = 10 / 10;
        msgSpeaker.pitch = 1;
        msgSpeaker.text = authPlease;
        msgSpeaker.voice = voicesGeneral[defaultLanguage];                
        speechSynthesis.speak(msgSpeaker); 
    } 
}

//authTriger
function abrauthcabra(){
    if(authQuest !== null && authQuest !== ''){
        var youAre = "You are indentificated %s"
        var sayYoua = youAre.replace('%s', authQuest);
        voicesGeneral = window.speechSynthesis.getVoices();
        msgSpeaker.rate = 10 / 10;
        msgSpeaker.pitch = 1;
        msgSpeaker.text = sayYoua;
        msgSpeaker.voice = voicesGeneral[defaultLanguage];                
        speechSynthesis.speak(msgSpeaker);
        openLNav();
    }else{
        openLNav(); 
    } 
}

//image video frames buffer to Base64
function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return binary;
}

//start scan face detector and face recognition
function startScan(){
    if ($('#dronCamera').css('display') == 'none') {
        alert('Camera Hidden');
    }else{
       var sstr = "StartEye"
       openIfSocket(sstr);
       var canvass = document.getElementById('canvas-fDR');
       var context = canvass.getContext('2d');
       var img = new Image();
       // show loading notice
       context.fillStyle = '#333';
       context.fillText('Loading...', canvass.width/2-30, canvass.height/3);
       socket.on('frame', function (data) {
       var b64encoded = btoa(_arrayBufferToBase64(data.im));
       img.onload = function () {
           context.drawImage(this, 0, 0, canvass.width, canvass.height);
       };
       img.src = 'data:image/png;base64,' + b64encoded;
       });
    };
};

//stop face detector and face recognition scan
function sendStopEye(){
    var sstr = "StopsEye"
    openIfSocket(sstr);
    return false;
}

//start scan person detector Phase 1
function startScanPer(){
    if ($('#dronCameraP').css('display') == 'none') {
        alert('Camera Hidden');
    }else{
       var sstr = "StartPer"
       openIfSocket(sstr);
       var canvass = document.getElementById('canvas-per');
       var context = canvass.getContext('2d');
       var img = new Image();
       // show loading notice
       context.fillStyle = '#333';
       context.fillText('Loading...', canvass.width/2-30, canvass.height/3);
       socket.on('frame', function (data) {      
       var b64encoded = btoa(_arrayBufferToBase64(data.pm));
       img.onload = function () {
           context.drawImage(this, 0, 0, canvass.width, canvass.height);
       };
       img.src = 'data:image/png;base64,' + b64encoded;
       });
    };
};

//stop scan person detector Phase 1
function sendStopPer(){
    var sstr = "StopsPer"
    openIfSocket(sstr);
    return false;
}