var margin2 = {t: 0, r: 40, b: 65, l: 40}; //this is an object
var width2 = d3.select('#mobile1').node().clientWidth - margin2.r - margin2.l,
    height2 = (d3.select('#mobile1').node().clientHeight / 2) - margin2.t - margin2.b;

var plot2 = d3.select('#plot2') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width2 + margin2.r + margin2.l)
    .attr('height', height2 + margin2.t + margin2.b);


var margin3 = {top: 0, right: 0, bottom: 0, left: 0},
    width3 = d3.select('#mobile2').node().clientWidth - margin3.left - margin3.right,
    height3 = d3.select('#mobile2').node().clientHeight - margin3.top - margin3.bottom;

var plot3 = d3.select("#plot3")
    .append('svg')
    .attr('width',width3 + margin3.left + margin3.right)
    .attr('height',height3+margin3.top+margin3.bottom);

d3.json("../data/boston_weather.json",draw);

function draw(error,data){
    //FIRST DASHBOARD CURRENT AND NEXT 12 HOURS WEATHER
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
    var todayNow = new Date ().getTime()/1000;
    var next12hr = new Date ().getTime()/1000 + 12 * 3600;
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
    var scaleY = d3.scaleLinear().domain([extentTodayWeather[0],extentTodayWeather[1]]).range([height2,0]);
    
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
        
    plot2.select('.todayWeather')
        .datum(data12h) //select the data
        .append("path")
        .attr("class", "weather") // this is the same class that we have selected before
        .attr("d",lineWeather);
    
    // fill in under line
    var areaWeather = d3.area()
        .x(function(d) { return scaleX(new Date (d.time*1000)); })
        .y1(function(d) { return scaleY(d.temperature); })
        .y0(function(d) { return scaleY(32); });
    
    plot2.select('.todayWeather')
        .datum(data12h) //select the data
        .append("path")
        .attr("class", "weatherArea") // this is the same class that we have selected before
        .attr("d",areaWeather);
    
    
    
    
    //SECOND DASHBOARD WEEKLY WEATHER
    //get data and summary for the week
    var weekWeather = data.daily.data;

    //x axis extent, time(days)
    var extentWeek = d3.extent(weekWeather,function(d){
        return new Date (d.time*1000)
    });
    
    //y axis extent, highs and lows of temperature
    var maxHigh = d3.max(weekWeather,function(d){
        return d.temperatureHigh
    });
    var minLow = d3.min(weekWeather,function(d){
        return d.temperatureMin
    });
    
    //create scales
    var scaleX3 = d3.scaleTime().domain(extentWeek).range([0,width3]);
    var scaleY3 = d3.scaleLinear().domain([minLow,maxHigh]).range([height3,0]);
    
    //create groups
    plot3.append('g').attr('transform','translate('+margin3.left+','+margin3.top+')').attr('class','axis axis-y');
    plot3.append('g').attr('transform','translate('+margin3.left+','+(margin3.top+height3)+')').attr('class','axis axis-x');
    plot3.append('g').attr('transform','translate('+margin3.left+','+margin3.top+')').attr('class','weekWeather');
    
    //make line for highs
    var highLine = d3.line()
        .x(function(d){ return scaleX3(new Date (d.time*1000));})
        .y(function(d){ return scaleY3(d.temperatureHigh);});
    
    plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","weatherHigh").attr("d",highLine);
    
    //fill in beneath line for highs
    var highArea = d3.area()
        .x(function(d){ return scaleX3(new Date (d.time*1000));})
        .y1(function(d){ return scaleY3(d.temperatureHigh);})
        .y0(function(d){ return scaleY3(0)});
    
    plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","weatherAreaHigh").attr("d",highArea);
    
    //make line for lows
    var lowLine = d3.line()
        .x(function(d){ return scaleX3(new Date (d.time*1000));})
        .y(function(d){ return scaleY3(d.temperatureMin);});
    
    plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","weatherLow").attr("d",lowLine);
    
    //fill in beneath line for lows
    var lowArea = d3.area()
        .x(function(d){ return scaleX3(new Date (d.time*1000));})
        .y1(function(d){ return scaleY3(d.temperatureMin);})
        .y0(function(d){ return scaleY3(0)});
    
    plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","weatherAreaLow").attr("d",lowArea);
    
    //fill in above line for highs (sky)
    var skyArea = d3.area()
        .x(function(d){ return scaleX3(new Date (d.time*1000));})
        .y0(function(d){ return scaleY3(d.temperatureHigh);})
        .y1(function(d){ return scaleY3(50)});
    
//    plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","skyRain").attr("d",skyArea);

    //fill in sky based on current weather
    if (data.currently.icon.includes("clear")) {
        plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","skyClear").attr("d",skyArea);
    }
    else if (data.currently.icon.includes("partly-cloudy")) {
        plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","skyPartlyCloudy").attr("d",skyArea);
    }
    else if (data.currently.icon.includes("cloudy")){
        plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","skyCloudy").attr("d",skyArea);
    }
    else if (data.currently.icon.includes("sunny")) {
        plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","skySunny").attr("d",skyArea);
    }
    else if (data.currently.icon.includes("sunny")) {
        plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","skySnow").attr("d",skyArea);
    }
    else if (data.currently.icon.includes("snow")) {
        plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","skyRain").attr("d",skyArea);
    }
    else {
        plot3.select('.weekWeather').datum(weekWeather).append("path").attr("class","skyArea").attr("d",skyArea);
    }
    
}
