img = "";
status = "" ;
objects = [];

function start()
{
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded) ;
    document.getElementById("status").innerHTML = "Status : Detecting Objects"

}

function preload() {
    img = loadImage("dog_cat.jpg")
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide()
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded) ;
    document.getElementById("status").innerHTML = "Status : Detecting Objects" }

function draw() {
    image(video, 50, 0, 400, 500);
   if(status != "")
   {
    for (i = 0; i< objects.length; i++)
    { 
       r = random(255)
       g = random(255)
       b = random(255)
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "Status : ObJeCT dEtEcTeD";
        document.getElementById("number_of_objects").innerHTML = "Number Of Objects detected -" + objects.length;
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + percent +"%" , objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x ,objects[i].y ,objects[i].width, objects[i].height)
    }
   }

}

function modelLoaded() 
{
    console.log("Model is not loaded!! jk it's loaded")
    status = true ;

}

function gotResult (error,result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}