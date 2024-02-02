// //Code for the matrix digital background
// // geting canvas by Boujjou Achraf
// var c = document.getElementById("c");
// var ctx = c.getContext("2d");

// //making the canvas full screen
// c.height = window.innerHeight;
// c.width = window.innerWidth;

// //chinese characters - taken from the unicode charset
// var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
// //converting the string into an array of single characters
// matrix = matrix.split("");

// var font_size = 10;
// var columns = c.width/font_size; //number of columns for the rain
// //an array of drops - one per column
// var drops = [];
// //x below is the x coordinate
// //1 = y co-ordinate of the drop(same for every drop initially)
// for(var x = 0; x < columns; x++)
//     drops[x] = 1; 

// //drawing the characters
// function draw()
// {
//     //Black BG for the canvas
//     //translucent BG to show trail
//     ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
//     ctx.fillRect(0, 0, c.width, c.height);

//     ctx.fillStyle = "#f4427d";//green text
//     ctx.font = font_size + "px arial";
//     //looping over drops
//     for(var i = 0; i < drops.length; i++)
//     {
//         //a random chinese character to print
//         var text = matrix[Math.floor(Math.random()*matrix.length)];
//         //x = i*font_size, y = value of drops[i]*font_size
//         ctx.fillText(text, i*font_size, drops[i]*font_size);

//         //sending the drop back to the top randomly after it has crossed the screen
//         //adding a randomness to the reset to make the drops scattered on the Y axis
//         if(drops[i]*font_size > c.height && Math.random() > 0.975)
//             drops[i] = 0;

//         //incrementing Y coordinate
//         drops[i]++;
//     }
// }

// setInterval(draw, 35);
// //---------------------------------------End of Matrix -----------------------------------------------------------


// select the dropdown
let dropdown = d3.selectAll("#dropdown").attr("selected", "selected");

// add an event listener for a CHANGE
dropdown.on("change", function () {
  let selectedValue = dropdown.value;
  
  // on change, do work
  doWork();
});

// get the new data
function doWork() {
  let category = dropdown.property("value");

  // grab the data
  let url = `/api/v1.0/games/${category}`;

  // make request
  d3.json(url).then(function (data) {
    console.log(data);

    makeBar1(data,category);
    makeBar2(data,category);
    //make metadata chart
    // makeMeta(data);
  });
}



function makeBar1(data, category) {

  // Trace for the Data
  let trace = {
    x: data.bar1_data.map(row => row.values).reverse(),
    y: data.bar1_data.map(row => row.labels).reverse(),
    type: "bar",
    orientation: "h"
  };

  // Data array
  let traces = [trace];

  // Apply a title to the layout
  let layout = {
    title: `Top 10 ${category}`,
    margin: { l: 500 }};

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar1", traces, layout);

}

function makeMeta(data) {
  let panel = d3.select("#sample-metadata");
  panel.html("");

  //loop through each key in the dictionary 
 
  for (let i = 0; i < 5; i++){
    let row = data.map_data[i];
    panel.append("p").text(`Title: ${row["Title"]}`);
    panel.append("p").text(`Rating: ${row["Rating"]}`);   
    panel.append("p").text(`Publisher: ${row["Publisher"]}`);
  

    panel.append("hr")

  }
}

function makeBar2(data,category) {

    // Trace for the Data
    let trace = {
      x: data.bar2_data.map(row => row.values).reverse(),
      y: data.bar2_data.map(row => row.labels).reverse(),
      type: "bar",
      orientation: "h"
    };
  
    // Data array
    let traces = [trace];
  
    // Apply a title to the layout
    let layout = {
      title: `Bottom 10 ${category}`,
      margin: { l: 500 }};
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar2", traces, layout);
  
  }

// INITIALIZE plot on page load
doWork();