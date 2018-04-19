var canvas6 = document.getElementById("plot6");
//var canvas6 = d3.select("#plot6").append("canvas").node();
//var widthCanvas6 = d3.select("#plot6").node().clientWidth;
//var heightCanvas6 = d3.select("#plot6").node().clientHeight;
//canvas6.width = 2 * widthCanvas6;
//canvas6.height = 2 * heightCanvas6;
canvas6.width=412;
canvas6.height=736;

var ctx6 = canvas6.getContext("2d");


var currentTime = new Date();
var currentHours = currentTime.getHours()%12;
if (currentHours==0){
    currentHours=12;
}
var currentMinutes = currentTime.getMinutes();
var currentSeconds = currentTime.getSeconds();

var x=canvas6.width/2;
var y=canvas6.height/2;
var line_w = 35;
var r_sec = 150;
var r_min = 100;
var r_hrs = 50;

var rad_per_sec=Math.PI/30;
var rad_per_min=Math.PI/30;
var rad_per_hr=Math.PI/6;

ctx6.strokeStyle = "#80aaff";
ctx6.lineWidth = line_w;

ctx6.strokeStyle="#A397A2";
if (currentSeconds<15) {
    ctx6.beginPath();
    ctx6.arc(x,y,r_sec,1.5*Math.PI,(1.5*Math.PI)+(currentSeconds*rad_per_sec));
    ctx6.stroke();
} else {
    ctx6.beginPath();
    ctx6.arc(x,y,r_sec,1.5*Math.PI, (currentSeconds-15)*rad_per_sec);
    ctx6.stroke();
}

ctx6.strokeStyle="#B7B2C4";
if (currentMinutes<15) {
    ctx6.beginPath();
    ctx6.arc(x,y,r_min,1.5*Math.PI,(1.5*Math.PI)+(currentMinutes*rad_per_min));
    ctx6.stroke();
} else {
    ctx6.beginPath();
    ctx6.arc(x,y,r_min,1.5*Math.PI, (currentMinutes-15)*rad_per_min);
    ctx6.stroke();
}

ctx6.strokeStyle="#D3C2CE";
if (currentHours<3) {
    ctx6.beginPath();
    ctx6.arc(x,y,r_hrs,1.5*Math.PI,(1.5*Math.PI)+(currentHours*rad_per_hr));
    ctx6.stroke();
} else {
    ctx6.beginPath();
    ctx6.arc(x,y,r_hrs,1.5*Math.PI, (currentHours-3)*rad_per_hr);
    ctx6.stroke();
}
if (currentHours==12){
    ctx6.beginPath();
    ctx6.arc(x,y,r_hrs,0,2*Math.PI);
    ctx6.stroke();
}
