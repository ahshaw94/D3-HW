// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//create svg wrapper, append svg group to hold chart and shift margins
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

//import
d3.csv("assets/data/data.csv")
    .then(function(peopleData){

        //parse data
        peopleData.forEach(function(data){
            data.poverty = +data.poverty;
            data.obesity = +data.obesity;
        });

        //create scale functions
        var xLinearScale = d3.scaleLinear()
            .domain([0,d3.max(peopleData,d=>d.poverty)])
            .range([0,width]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(peopleData,d => d.obesity)])
            .range([height,0]);

        //axis
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        //append to chart
        chartGroup.append("g")
            .attr("transform",`translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        //circles
        var circlesGroup = chartGroup.selectAll()
        .data(peopleData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r","15")
        .attr("fill","blue")
        .attr("opacity",".5")

        var textGroup = chartGroup.selectAll()
        .data(peopleData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.obesity))
        .text(d => d.abbr)
     
        //axes labels
        chartGroup.append("text")
            .attr("transform","rotate(-90)")
            .attr("y",0 - margin.left + 40)
            .attr("x",0 - (height/2))
            .attr("dy","1em")
            .attr("class","axisText")
            .text("Obesity Level")

        chartGroup.append("text")
            .attr("transform",`translate(${width/2},${height + margin.top +30})`)
            .attr("class","axisText")
            .text("Poverty Levels")

    });

