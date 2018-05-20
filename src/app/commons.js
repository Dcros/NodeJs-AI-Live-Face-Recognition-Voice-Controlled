const path = require('path')
const fs = require('fs')
const fr = require('face-recognition')
const appdataPath = path.resolve(__dirname, '../public/imgs/users/Name')

/*drawRects = (win, rects) =>
rects.forEach(rect => win.addOverlay(rect))*/
ensureAppdataDirExists = () => {
  if (!fs.existsSync(appdataPath)) {
    fs.mkdirSync(appdataPath);
  }
}

ensureAppdataDirExists()

const trainedModelFile = 'faceRecognition2Model_150.json'
const trainedModelFilePath = path.resolve(appdataPath, trainedModelFile)
const dataPath = path.resolve('./src/public/imgs/users/Name')
const facesPath = path.resolve(dataPath, 'faceIMG')
const testy = path.resolve(dataPath, 'faceIMG')
const classNames = ['Name']
const detector = fr.FaceDetector()
const recognizer = fr.FaceRecognizer()
module.exports = {
  registerFace: function(){
    if (!fs.existsSync(trainedModelFilePath)) {
      console.log('%s not found, start training recognizer...', trainedModelFile)
      const allFiles = fs.readdirSync(facesPath)
      const imagesByClass = classNames.map(c =>
        allFiles
          .filter(f => f.includes(c))
          .map(f => path.join(facesPath, f))
          .map(fp => fr.loadImage(fp))
      )
      imagesByClass.forEach((faces, label) =>
      recognizer.addFaces(faces, classNames[label]))
      fs.writeFileSync(trainedModelFilePath, JSON.stringify(recognizer.serialize()));
      console.log(recognizer.getDescriptorState())
      console.log("Done Face Registered!")
    }else{
      recognizer.load(require(trainedModelFilePath))
      console.log(recognizer.getDescriptorState())
      console.log("Done Face Allready Registered!")
    }
    return false;
  }
}