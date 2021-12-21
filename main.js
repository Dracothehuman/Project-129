var song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;


function preload(){
    song = loadSound("The-Avengers-Theme-Song.mp3");
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();


    video= createCapture(VIDEO);
    video.hide()


    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on("pose", gotPoses);
}

function modalLoaded(){
    console.log("posenet has successfully loaded.");

    
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);

       
        scoreLeftWrist = results[0].pose.keypoints[9].score;


        console.log(scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log(leftWristX);
        console.log(leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log(rightWristX);
        console.log(rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 500, 500);

    fill("#d02bd2");
    stroke("#d02bd2");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);

        infloorleftwristy = Number(leftWristY);
        remove_decimals = floor(infloorleftwristy);
    
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }


}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
