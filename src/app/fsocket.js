const path = require('path')
const fs = require('fs')
const cv = require('opencv4nodejs'/*'opencv'*/)
const fr = require('face-recognition').withCv(cv)

//requiring face Register
var faceRegisters = require("./commons");
const appdataPath = path.resolve(__dirname, '../public/imgs/users/Name')

//trained file charge
const trainedModelFile = 'faceRecognition2Model_150.json'
const trainedModelFilePath = path.resolve(appdataPath, trainedModelFile)

//face-recognition libs actions
const detector = fr.FaceDetector()
const recognizer = fr.FaceRecognizer()

//camera properties
var camFps = 60;
var camInterval = 1000 / camFps;

if (!fs.existsSync(trainedModelFilePath)) {
  faceRegisters.registerFace();
  console.log("Registerd completed and Charged")
} else {
  console.log("Face Allredy registered... Charging face AND RESTARTING THE SERVER FOR SOME REASON ...bug...")
}

//charging the registered face
recognizer.load(require(trainedModelFilePath))


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

//face detector and recognition socket player
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
      var puting = valhalla.commandface;
      var key = puting;
      if(key == "CameraStops"){
        valhalla.commandface = null;
        clearInterval(intvl);
        console.log('End of Face Detection-Recognition.');
        return false;
      }
    }, camInterval);
  };

  //detection player
  bbtThemeImgs = (src, recogniteFaces, detectFaces) => grabFrames(src, (frame) =>{
    const frameResized = frame.resizeToMax(500);
    //face detection starts
    const detections = detectFaces(frameResized, 150)
    if (detections.length) {
      // mark faces with distance > 0.6 as unknown
      const unknownThreshold = 0.6
      detections.forEach((_img) => {
        const { rect, face } = _img
        const recongnitions = recogniteFaces(face)  
        const blue = new cv.Vec(255, 0, 0)
        var text = recongnitions
        drawRectWithText(frameResized, rect, text, blue)
      })
    }else{
      //console.log('No face here... searching')
    }
    sendToWeb();
    function sendToWeb(err,im) {
      if(err){ console.log("Cant Send the Frames")}
      im = cv.imencode('.png',frameResized)
      socket.emit('frame', { im });      
    };
    //cv.imshow(`JarviEye`, frameResized)  
  })

  // opencv way to detect faces, faster but not as precise
  const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
  const minDetections = 5
  const webcamPort = 0;
  
  //face detection
  function detectFaces(img, faceSize) {
    const options = {
      minSize: new cv.Size(100, 100),
      scaleFactor: 1.2,
      minNeighbors: 10,    
    }
    const { objects, numDetections } = classifier.detectMultiScale(img.bgrToGray(), options);
    //console.log('detection')
    return objects
      .map(rect => ({
        rect,
        face: img.getRegion(rect).resize(faceSize, faceSize)
      }))
  }
  
  //face recognition
  function recogniteFaces(face){
    // mark faces with distance > 0.6 as unknown
    const unknownThreshold = 0.6
    const cvFace = fr.CvImage(face)
    const prediction = recognizer.predictBest(cvFace, unknownThreshold)
    const text = `${prediction.className} (${prediction.distance})`
    return text
  }
  bbtThemeImgs(webcamPort, recogniteFaces, detectFaces)
};