var canvas4 = document.getElementById("plot4");
var canvas4 = d3.select("#plot4").append("canvas").node();
var widthCanvas4 = d3.select("#plot4").node().clientWidth;
var heightCanvas4 = d3.select("#plot4").node().clientHeight;
canvas4.width = 2 * widthCanvas4;
canvas4.height = 2 * heightCanvas4;

var ctx4 = canvas4.getContext("2d");


var currentTime = new Date ( );
var currentHours = currentTime.getHours ( );
var currentMinutes = currentTime.getMinutes ( );
var currentSeconds = currentTime.getSeconds ( );

var square_len = 50;
var spacing = 20;

ctx4.fillStyle = "#000099";

for (i=0; i<currentHours; i++) {
    ctx4.fillRect(i*(square_len+spacing),0,square_len,square_len);
}

for (i=0; i<currentMinutes; i++) {
    ctx4.fillRect(i*(square_len+spacing),square_len+spacing,square_len,square_len);
}

for (i=0; i<currentSeconds; i++) {
    ctx4.fillRect(i*(square_len+spacing),(square_len+spacing)*2,square_len,square_len);
}

