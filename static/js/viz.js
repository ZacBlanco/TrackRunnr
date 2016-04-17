console.log("hello");
var dataHolder = document.getElementById('data-holder');
var data = JSON.parse(dataHolder.innerText);
console.log(data);


var svgContainer = d3.select("#chart1").append("svg")
								.attr("width", 400)
								.attr("height", 400);

var circles = svgContainer.selectAll("circle")
						.data(data)
						.enter()
						.append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) { return d.distance*10; })
                       .attr("cy", function (d) { return d.totalTime*10; })
                       .attr("r", function (d) { 
						   if(d.difficulty !== undefined) 
							   return (d.difficulty+50)/60;
						   else 
							   return 20;
					   })
						.style("fill", function(d) { return "#777"; });