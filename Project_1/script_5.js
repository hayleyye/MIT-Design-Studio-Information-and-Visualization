var canvas5 = document.getElementById("plot5");
var canvas5 = d3.select("#plot5").append("canvas").node();
var widthCanvas5 = d3.select("#plot5").node().clientWidth;
var heightCanvas5 = d3.select("#plot5").node().clientHeight;
canvas5.width = 2 * widthCanvas5;
canvas5.height = 2 * heightCanvas5;

var ctx5 = canvas5.getContext("2d");


var currentTime = new Date();
var currentHours = currentTime.getHours();
var currentMinutes = currentTime.getMinutes();
var currentSeconds = currentTime.getSeconds();

ctx5.fillStyle = "#000099";

var min_unit = 20;
var bar_width = 20;
var spacing=15;

for (i=0; i<currentHours-1; i++){
    ctx5.fillRect(i*(bar_width+spacing),0,bar_width,min_unit*60);
}

ctx5.fillRect(currentHours*(bar_width+spacing),(60-currentMinutes)*min_unit,bar_width,min_unit*currentMinutes);
