var canvas6 = document.getElementById("plot6");
var canvas6 = d3.select("#plot6").append("canvas").node();
var widthCanvas6 = d3.select("#plot6").node().clientWidth;
var heightCanvas6 = d3.select("#plot6").node().clientHeight;
canvas6.width = 2 * widthCanvas6;
canvas6.height = 2 * heightCanvas6;

var ctx6 = canvas6.getContext("2d");


var currentTime = new Date();
var currentHours = currentTime.getHours()%12;
var currentMinutes = currentTime.getMinutes();
var currentSeconds = currentTime.getSeconds();


var line_w = 10;
var r_sec = 75;
var r_min = 50;
var r_hrs = 25;

ctx6.strokeStyle = "#80aaff";
ctx6.lineWidth = line_w;
ctx6.beginPath();

if (currentSeconds<15) {
    ctx6.arc(100,100,r_sec,1.5*Math.PI,(1.5*Math.PI)+(currentSeconds*Math.PI/30));
} else {
    ctx6.arc(100,100,r_sec,1.5*Math.PI, (currentSeconds-15)*Math.PI/30);
}

if (currentMinutes<15) {
    ctx6.arc(100,100,r_min,1.5*Math.PI,(1.5*Math.PI)+(currentMinutes*Math.PI/30));
} else {
    ctx6.arc(100,100,r_min,1.5*Math.PI, (currentMinutes-15)*Math.PI/30);
}

if (currentHours<3) {
    ctx6.arc(100,100,r_hrs,1.5*Math.PI,(1.5*Math.PI)+(currentHours*Math.PI/6));
} else {
    ctx6.arc(100,100,r_hrs,1.5*Math.PI, (currentHours-15)*Math.PI/6);
}