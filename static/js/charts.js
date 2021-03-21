function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    console.log(data);
   
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1.1. Create the buildCharts function.
function buildCharts(sample) {
  // 1.2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 1. 3. Create a variable that holds the samples array. 
    var sampleData = data.samples;
    // 1.4. Create a variable that filters the samples for the object with the desired sample number.
    var desiredSample = sampleData.filter(sampleObj => sampleObj.id == sample);
    
    // 3.1. Create a variable that filters the metadata array for the object with the desired sample number.
    var sampleMetaData = data.metadata.filter(sampleObj => sampleObj.id == sample);
    

    //  1.5. Create a variable that holds the first sample in the array.
    dSample = desiredSample[0];

    // 3.2. Create a variable that holds the first sample in the metadata array.
    var demInfo = sampleMetaData[0];

    // 1.6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = dSample.otu_ids;
    var otuLabels = dSample.otu_labels;
    var sampleValues = dSample.sample_values;
    

    // 3.3. Create a variable that holds the washing frequency.
    var wFreq = parseFloat(demInfo.wfreq);

     // // 1.7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var top10otuIds = otuIds.slice(0,10).reverse();
    var top10otuLabels = otuLabels.slice(0,10).reverse();
    var top10sampleValues = sampleValues.slice(0,10).reverse();

    var yticks = top10otuIds.map(id => "OTU" + id);

    // // 1.8. Create the trace for the bar chart. 
    var barData = [{
      x: top10sampleValues,
      y: yticks,
      text: top10otuLabels,
      type:'bar',
      orientation: 'h'
    }];


    // // 1.9. Create the layout for the bar chart. 
    var barLayout = {
    
      title: "Top 10 Bacteria Culture Found",
      yaxis: {tickmode: 'liner'},
      paper_bgcolor: 'rgb(238,238,238)',
      plot_bgcolor: 'rgb(250,250,250)',
      
    };
    // 1.10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);



     // 2.1. Create the trace for the bubble chart.
     var bubbleData = [{
      y: sampleValues,
      x: otuIds,
      text: otuLabels,
      mode: 'markers',
      marker:{
          size: sampleValues,
          color: otuIds 
        },
    }];

    // 2.2 Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis:{title:"OTU ID"},
      hovermode: 'closest',
      margin: {
        l: 100,
        r: 20,
        t: 100,
        b: 70
      },
      plot_bgcolor: 'rgb(250,250,250)',
      paper_bgcolor: 'rgb(238,238,238)',
    };

    // 2.3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble",bubbleData,bubbleLayout);
   



        // 4. Create the trace for the gauge chart.
        var gaugeData = [
          {
            value: wFreq,
            title: "Belly Button Washing Frequency<br><span style='font-size:0.8em;color:gray'>Scrubs per Week</span>",
            type: "indicator",
            mode: "gauge+number",
            
            gauge: {
              axis: { range: [null, 10 ], nticks: 10 },
              nticks: 4,
              bar: {color: "black" },
              steps: [
                { range: [0, 2], color: "red" },
                { range: [2, 4], color: "orange" },
                { range: [4, 6], color: "yellow" },
                { range: [6, 8], color: "lightgreen" },
                { range: [8, 10], color: "green" }
              ]}
          }
        ];
        
        // 5. Create the layout for the gauge chart.
        var gaugeLayout = { 
          width: 470, height: 450, margin: { t: 0, b: 0 }, 
          
          plot_bgcolor: 'rgb(250,250,250)',
          paper_bgcolor: 'rgb(238,238,238)',
        };
    
        // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);        

  });
}
