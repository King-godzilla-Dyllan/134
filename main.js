img = "";
status = "";
object = [];

function preload() {
    img = loadImage('dog_cat.jpg')
}

function setup() {
    canvas = createCanvas(360, 360)
    canvas.center();
    video = createCapture(VIDEO)
    video.size(360, 360)
    video.hide()
    
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function draw() {
    image(video, 0, 0, 360, 360)

    if(status != "")
    {
        objectDetector.detect(video, gotresults)
        for (i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of object detected are : "+ object.length;            

            fill("#91ff00")
            percent = floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15)
            noFill()
            stroke("#00bfff")
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
        }
    }


}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}

function gotresults(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    object = results
}
