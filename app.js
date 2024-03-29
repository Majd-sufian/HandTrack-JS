navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}
      

const canvas = document.getElementById('canvas');
const video = document.getElementById('video');
const audio = document.getElementById('audio');
const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video)
    .then(status => {
        if(status){
            navigator.getUserMedia({video: {}}, stream => {
                video.srcObject = stream
                setInterval(runDetecotion, 10)
            },
            err => console.log(err)
        )
    }
})



function runDetecotion() {
    model.detect(video).then(predictions => {
        model.renderPredictions(predictions, canvas, context, video)
        if (predictions.length > 0) {
            audio.play()
        } 
    })
}



handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel;
    // model.detect(img).then(predictions => {
    //   console.log('Predictions: ', predictions); 
    // });
    });