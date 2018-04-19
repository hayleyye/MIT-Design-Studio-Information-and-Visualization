var canvas4 = document.getElementById("plot4");
//var canvas4 = d3.select("#plot4").append("canvas").node();
//var widthCanvas4 = d3.select("#plot4").node().clientWidth;
//var heightCanvas4 = d3.select("#plot4").node().clientHeight;
//canvas4.width = 2 * widthCanvas4;
//canvas4.height = 2 * heightCanvas4;
canvas4.width=412;
canvas4.height=736; //495.2

var ctx4 = canvas4.getContext("2d");

var currentTime = new Date();
var currentHours = currentTime.getHours();
var currentMinutes = currentTime.getMinutes();
var currentSeconds = currentTime.getSeconds();
currentHours=currentHours%12;
if (currentHours==0){
    currentHours=12;
}

var square_len_hr=(canvas4.width-24-(currentHours-1)*8)/currentHours;
if (square_len_hr>225){
    square_len_hr=225;
}
var square_len_ms=(canvas4.width-24-72)/10;
var spacing=8;
var margin=12;
var margin_y=15;

var minutes_y=margin_y*2+square_len_hr;
var minutes_rows=Math.ceil(currentMinutes/10);
var seconds_y=minutes_y+minutes_rows*square_len_ms+(minutes_rows-1)*spacing+margin_y;
var seconds_rows=Math.ceil(currentSeconds/10);

//hour squares
for (i=0; i<currentHours; i++) {
    ctx4.fillStyle="#D3C2CE";
    ctx4.fillRect(i*(square_len_hr+spacing)+margin,margin_y,square_len_hr,square_len_hr);
}

//minute squares
for (i=0;i<minutes_rows;i++){
    ctx4.fillStyle="#B7B2C4";
    if (i<minutes_rows-1){
        for (j=0;j<10;j++){
            ctx4.fillRect(j*(square_len_ms+spacing)+margin,minutes_y+i*(square_len_ms+spacing),square_len_ms,square_len_ms);
        }
    }
    else {
        for (j=0;j<currentMinutes%10;j++){
            ctx4.fillRect(j*(square_len_ms+spacing)+margin,minutes_y+i*(square_len_ms+spacing),square_len_ms,square_len_ms);
        }
    }
}

//second squares
for (i=0;i<seconds_rows;i++){
    ctx4.fillStyle="#A397A2";
    if (i<seconds_rows-1){
        for (j=0;j<10;j++){
            ctx4.fillRect(j*(square_len_ms+spacing)+margin,seconds_y+i*(square_len_ms+spacing),square_len_ms,square_len_ms);
        }
    }
    else {
        for (j=0;j<currentSeconds%10;j++){
            ctx4.fillRect(j*(square_len_ms+spacing)+margin,seconds_y+i*(square_len_ms+spacing),square_len_ms,square_len_ms);
        }
    }
}