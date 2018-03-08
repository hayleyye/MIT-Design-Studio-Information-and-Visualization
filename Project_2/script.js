//plot
var margin2 = {t: 0, r: 40, b: 20, l: 30}; //this is an object
var width2 = d3.select('#mobile1').node().clientWidth - margin2.r - margin2.l,
    height2 = (d3.select('#mobile1').node().clientHeight / 4) - margin2.t - margin2.b;

var xValue = function(d) {return d.hourly.data}

var plot2 = d3.select('#plot2') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width2 + margin2.r + margin2.l)
    .attr('height', height2 + margin2.t + margin2.b);
// var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083'

d3.json("data/boston_weather.json",draw);


function draw(error,data){
    //get current hour
    var d = new Date(data.currently.time*1000);
    var currenthour = d.getHours();
    
    //SECTION 1 - current weather
    var currentWeatherFeelsLike = "Feels like "+ Math.round(data.currently.apparentTemperature)+"\xB0";
    var currentWeatherTemp = Math.round(data.currently.temperature)+"\xB0";
    var currentWeatherSummary = data.currently.summary;
    
    //displays current weather info into top half of screen
    d3.select("#feelslike").html(currentWeatherFeelsLike);
    d3.select("#currenttemp").html(currentWeatherTemp);
    d3.select("#currentsummary").html(currentWeatherSummary);
    
    //PLOT 2 - hourly weather data
    
    //get x-axis data, time from now to next 12 hours
    var todayWeather = data.hourly.data;
    //data from seconds to milliseconds, get max and min using .extent
    var extentTimeWeather = d3.extent(todayWeather,function(d){
        return new Date (d.time*1000)
    });
    //filter data so only next 12 hours
    var todayNow = new Date (data.currently.time*1000);
    var next12hr = new Date (data.currently.time*1000+(12*3600));
    var data12h = todayWeather.filter(function(d){
        return d.time>= todayNow && d.time<= next12hr
    });
    //get min and max time of next 12 hr
    var extentdata12h = d3.extent(data12h,function(d){
        return new Date (d.time*1000)
    });
    
    //get y-axis data, temperature
    //get min and max temperature
    var extentTodayWeather = d3.extent(data12h,function(d){
        return d.temperature
    });
    
    //create scales to put data in domain element
    var scaleX = d3.scaleTime().domain(extentdata12h).range([0,width2]);
    var scaleY = d3.scaleLinear().domain([32,extentTodayWeather[1]]).range([height2,0]);
    
    //create groups to put content inside them
    plot2.append('g').attr('transform', 'translate(' + margin2.l + ',' + margin2.t + ')').attr('class', 'axis axis-y');
    plot2.append('g').attr('transform', 'translate(' + margin2.l + ',' + (margin2.t+height2) + ')').attr('class', 'axis axis-x');
    plot2.append('g').attr('transform', 'translate(' + margin2.l + ',' + margin2.t + ')').attr('class', 'todayWeather');
    
    //create axes
    var formatHours = d3.timeFormat("%H:00");
    var formatDate = d3.timeFormat("%A");
    
    var axisHourX = d3.axisBottom().scale(scaleX).ticks().tickFormat(formatHours), 
        axisHourY = d3.axisLeft().scale(scaleY).tickSizeInner(-width2).tickPadding([10]).ticks(5);
    
    plot2.select(".axis-x").call(axisHourX);
    plot2.select(".axis-y").call(axisHourY);


    //1.5 create graphical form - line
    var lineWeather = d3.line()
        .x(function(d) { return scaleX(new Date (d.time*1000)); })
        .y(function(d) { return scaleY(d.temperature); });
    
    // background
    var areaWeather = d3.area()
        .x(function(d) { return scaleX(new Date (d.time*1000)); })
        .y1(function(d) { return scaleY(d.temperature); })
        .y0(function(d) { return scaleY(32); });
    
    plot2.select('.todayWeather')
        .datum(data12h) //select the data
        .append("path")
        .attr("class", "weatherArea") // this is the same class that we have selected before
        .attr("d",areaWeather);
    
    plot2.select('.todayWeather')
        .datum(data12h) //select the data
        .append("path")
        .attr("class", "weather") // this is the same class that we have selected before
        .attr("d",lineWeather);
    
    plot2
        .select('.todayWeather')
        .append("line")
        .attr("class","meanWeather")
        .attr("x1",scaleX(extentdata12h[0]))
        .attr("x2",scaleX(extentdata12h[1]))
        .attr("y1",scaleY(extentTodayWeather[0]))
        .attr("y2",scaleY(extentTodayWeather[1]));

    var plotDots = plot2.select('.todayWeather')
        .append("g")
        .attr("class","dots");
    //
    // var plotNumbers = plot1.select('.todayWeather')
    //     .append("g")
    //     .attr("class","numbers");

    plotDots
        .selectAll(".weatherDots")
        .data(data12h) //select the data
        .enter()
        .append("circle")
        .attr("class", "weatherDots") // this is the same class that we have selected before
        .attr("cx",function(d) { return scaleX(new Date (d.time*1000)); })
        .attr("cy",function(d) { return scaleY(d.temperature); })
        .attr("r",3);

    d3.select("#date").html(formatDate(extentdata12h[0]))
}
