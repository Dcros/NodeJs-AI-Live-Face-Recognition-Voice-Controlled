const path = require('path')
const fs = require('fs')
const cv = require('opencv4nodejs'/*'opencv'*/)

//camera properties
var camFps = 60;
var camInterval = 1000 / camFps;

//draw in the image detector
function drawRectWithText(image, rect, text, color) {
    const thickness = 2
    image.drawRectangle(
      new cv.Point(rect.x, rect.y),
      new cv.Point(rect.x + rect.width, rect.y + rect.height),
      color,
      cv.LINE_8,
      thickness
    )
  
    const textOffsetY = rect.height + 20
    image.putText(
      text,
      new cv.Point(rect.x, rect.y + textOffsetY),
      cv.FONT_ITALIC,
      0.6,
      color,
      thickness
    )
  }

//Person detector and recognition socket player
module.exports = function (socket) {
grabFrames = (videoFile, onFrame) => {
    const cap = new cv.VideoCapture(videoFile);
    let done = false;
    const intvl = setInterval(() => {
    let frame = cap.read();
    // loop back to start on end of stream reached
    if (frame.empty) {
        cap.reset();
        frame = cap.read();
    }
    onFrame(frame);
    var valhalla = require('../server');
    var puting = valhalla.commandper;
    var key = puting;
    if(key == "comsStopPer"){
        valhalla.commandper = null;
        clearInterval(intvl);
        console.log('End of Person Detection.');
        return false;
    }
    }, camInterval);
};

//detection player
bbtThemeImgs = (src, detectPerson) => grabFrames(src, (frame) =>{
    const frameResized = frame.resizeToMax(500);
    //Person detection starts
    const detections = detectPerson(frameResized)
    if (detections.length) {
    // mark faces with distance > 0.6 as unknown
    //const unknownThreshold = 0.6
    detections.forEach((_img, i) => {
        const { rect, person } = _img
        var ppsn = "Person_%d"
        var preparpsn = ppsn.replace('%d', i)
        //const recongnitions = recogniteFaces(face)  
        const blue = new cv.Vec(255, 0, 0)
        var text = preparpsn
        drawRectWithText(frameResized, rect, text, blue)
        console.log(text)
    })
    }else{
    console.log('No person here... searching')
    }
    sendToWeb();
    function sendToWeb(err,pm) {
    if(err){ console.log("Cant Send the Frames")}
    pm = cv.imencode('.png',frameResized)
    socket.emit('frame', { pm });      
    };
    //cv.imshow(`JarviPersonD`, frameResized)  
})

// opencv way to detect person, faster but not as precise
const pathTOXML = path.resolve('./src/app/myhaar4.xml')
const classifier = new cv.CascadeClassifier(pathTOXML)
const minDetections = 5
const webcamPort = 0;

//person detection
function detectPerson(img) {  
    const { objects, numDetections } = classifier.detectMultiScale(img.bgrToGray());
    return objects
    .map(rect => ({
        rect,
        person: img.getRegion(rect)
    }))
}
bbtThemeImgs(webcamPort, detectPerson)
};