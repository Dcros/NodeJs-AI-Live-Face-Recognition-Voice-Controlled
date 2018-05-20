//Defining Things
var noteTextarea = $('#note-textarea');
var labelresp = $('#talkMessageApi');
var micronof = $('#micOnOff');
//theMicActionBtn
var activates = true;
//User details
var userIsOn = $('#userTeitor');
//Youtube Api Key, (Recomend you to get your own boi)
var gkey = 'AIzaSyD0yLf5lZ__5yI2zfJ3GJJIiVEDyPwS9TY';
//END CONFIG START CALLS

//------------------------------------------------Warming Up Brain-------------------------------------------------//

//Strat the Speech Recog
if (annyang) {
    //mute or not the mic
    micronof.click(function(){
        if(activates == true){
            $('#micOnOff').html('<i class="fas fa-microphone-slash"></i>');
            annyang.pause();
            activates = false;
        }else {
            $('#micOnOff').html('<i class="fas fa-microphone"></i>');
            annyang.resume();
            activates = true;
        }
    });

    // Let's define a command.
    var x;        
    var commands = {

        //Ask kindly if Jarvis can paly some rock!
        'can you play *tag': function(tag) {
            $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+tag+'&key='+gkey,
            dataType: "jsonp",
            success: function (response) {
                if (response.items) {
                    $.each(response.items, function (i, data) {
                        var video_id = data.id.videoId;
                        x = video_id;
                        openRNav();
                        $('#video').attr('style','display:block;');
                        myPlayer();
                    });
                }
            }
        });
        },
        'play *tag': function(tag) {
            $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+tag+'&key='+gkey,
            dataType: "jsonp",
            success: function (response) {
                if (response.items) {
                    $.each(response.items, function (i, data) {
                        var video_id = data.id.videoId;
                        x = video_id;
                        openRNav();
                        $('#video').attr('style','display:block;');
                        myPlayer();
                    });
                }
            }
        });
        },

        //Stop the rock time
        'stop music': function() { 
        $('#video').attr('style','display:none!important;');
        window.location.reload(false); 
        },

        //Ask for some translator
        'translate': function() { 
        var urlg = 'https://www.bing.com/search?q=translate';
        mySearchGui(urlg);
        },

        //Ask for something
        'what is *obj': function (obj) { 
        var urlg = 'https://www.bing.com/search?q=what+is+'+obj;
        mySearchGui(urlg);
        },
        'what are *obj': function (obj) { 
        var urlg = 'https://www.bing.com/search?q=what+are+'+obj;
        mySearchGui(urlg);
        },
        'who is *obj': function (obj) { 
        var urlg = 'https://www.bing.com/search?q=who+is+'+obj;
        mySearchGui(urlg);
        },

        //reload bug page
        'reload page': function() { 
        window.location.reload(false); 
        },

        //Ask for identify your self
        'identify': function() { 
        abrauthcabra(); 
        },
        'identification': function() { 
        abrauthcabra(); 
        },
        'id': function() { 
        abrauthcabra(); 
        },
        'open face detector': function() { 
        eyeItsOn()
        },
        'close face detector': function() { 
        eyeItsOff()
        },
        'open camera': function() { 
        personItsOn();
        },
        'close camera': function() { 
        personItsOff();
        }

    };

    //Person Detector On
    function personItsOn(){
        if($('#dronCameraP').css('display') == 'block'){
            var camerashown = "Camera its allready shown %s"
            var messageShown = camerashown.replace('%s', authQuest);
            voicesGeneral = window.speechSynthesis.getVoices();
            msgSpeaker.rate = 10 / 10;
            msgSpeaker.pitch = 1;
            msgSpeaker.text = messageShown;
            msgSpeaker.voice = voicesGeneral[defaultLanguage];                
            speechSynthesis.speak(msgSpeaker);
        }else{
            openBNav();        
            $('#dronCameraP').attr('style','display:block;');        
            startScanPer();
        }
    }

    //Face Detector Off
    function personItsOff(){
        if($('#dronCameraP').css('display') == 'none'){
            var cameraclosed = "Camera Its allready Off %s"
            var messageCloses = cameraclosed.replace('%s', authQuest);
            voicesGeneral = window.speechSynthesis.getVoices();
            msgSpeaker.rate = 10 / 10;
            msgSpeaker.pitch = 1;
            msgSpeaker.text = messageCloses;
            msgSpeaker.voice = voicesGeneral[defaultLanguage];                
            speechSynthesis.speak(msgSpeaker);
        }else{
            sendStopPer();
            closeBNav();        
            $('#dronCameraP').attr('style','display:none;');        
            window.location.reload(false);
        }
    }

    //Face Detector On
    function eyeItsOn(){
        if($('#dronCamera').css('display') == 'block'){
            var camerashown = "Camera its allready shown %s"
            var messageShown = camerashown.replace('%s', authQuest);
            voicesGeneral = window.speechSynthesis.getVoices();
            msgSpeaker.rate = 10 / 10;
            msgSpeaker.pitch = 1;
            msgSpeaker.text = messageShown;
            msgSpeaker.voice = voicesGeneral[defaultLanguage];                
            speechSynthesis.speak(msgSpeaker);
        }else{
            openRNav();        
            $('#dronCamera').attr('style','display:block;');        
            startScan();
        }
    }

    //Face Detector Off
    function eyeItsOff(){
        console.log("cacas")
        if($('#dronCamera').css('display') == 'none'){
            var cameraclosed = "Camera Its allready Off %s"
            var messageCloses = cameraclosed.replace('%s', authQuest);
            voicesGeneral = window.speechSynthesis.getVoices();
            msgSpeaker.rate = 10 / 10;
            msgSpeaker.pitch = 1;
            msgSpeaker.text = messageCloses;
            msgSpeaker.voice = voicesGeneral[defaultLanguage];                
            speechSynthesis.speak(msgSpeaker);
        }else{
            sendStopEye();
            closeRNav();        
            $('#dronCamera').attr('style','display:none;');        
            window.location.reload(false);
        }
    }

    //searchForthings
    function mySearchGui(urlc){
        var seachDiv = $('#searchGUI iframe');
        seachDiv.attr('src', urlc);
        $('#searchGUI').fadeIn(1000);
        openRNav();
    };

    //Youtube Player //Start of youtube video popup----------------------------------------------------
    function myPlayer() {
        document.getElementById("video").innerHTML = "<div id='player'></div>";
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '350',
            width: '100%',
            videoId: x,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        player.stopVideo();
        event.target.playVideo();
    }
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }

    //end of youtube video popup--------------------------------------------------------------------/

    // Start listening.
    annyang.start({continuous: true});
    annyang.addCommands(commands);        
    annyang.addCallback('result', function(phrases) {
        var said = phrases[0];
        $('#note-textarea').html(said);                   
        noteTextarea.val(said);
        messagesend();        
    });

    //Send-Respond Answer-Question
    function messagesend(){
        $.ajax({
            type: 'POST',
            url: '/getjson',
            crossDomain: true,
            data: {"inputmessage": noteTextarea.val()},
            success: function(data) {
                var cacate = $("#cojonambre");
                cacate =  cacate[0].textContent;
                var resp = data.replace('%s', cacate);
                //labelresp.html("Jarvi say: "+resp);
                voicesGeneral = window.speechSynthesis.getVoices();
                msgSpeaker.rate = 10 / 10;
                msgSpeaker.pitch = 1;
                msgSpeaker.text = resp;
                msgSpeaker.voice = voicesGeneral[defaultLanguage];                
                speechSynthesis.speak(msgSpeaker);
            }
        });
    };
}