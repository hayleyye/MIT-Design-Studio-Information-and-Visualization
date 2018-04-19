var canvas5 = document.getElementById("plot5");
//var canvas5 = d3.select("#plot5").append("canvas").node();
//var widthCanvas5 = d3.select("#plot5").node().clientWidth;
//var heightCanvas5 = d3.select("#plot5").node().clientHeight;
//canvas5.width = 2 * widthCanvas5;
//canvas5.height = 2 * heightCanvas5;
canvas5.width=412;
canvas5.height=736;

var ctx5 = canvas5.getContext("2d");


var currentTime = new Date();
var currentHours = currentTime.getHours();
var currentMinutes = currentTime.getMinutes();
currentHours=currentHours%12;
if (currentHours==0){
    currentHours=12;
}

var margin=20;
var minutes_y=canvas5.height/2+margin/2;
var width_hr=(canvas5.height/2-margin/2-margin)/(currentHours*2-1);
var length_hr=canvas5.width-(2*margin);
var width_min=(canvas5.width-2*margin)/(currentMinutes*2-1);
var length_min=(canvas5.height/2)-margin-(margin/2);

//hour bars
ctx5.fillStyle="#D3C2CE";
for (i=0; i<currentHours; i++){
    ctx5.fillRect(margin,i*(2*width_hr)+margin,length_hr,width_hr);
}

//minute bars
ctx5.fillStyle="#B7B2C4";
for (i=0;i<currentMinutes;i++){
    ctx5.fillRect(i*(2*width_min)+margin,minutes_y,width_min,length_min);
}

