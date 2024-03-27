am4core.ready(function() {
    // Create chart instance
    var chart = am4core.create("wordCloudChart", am4plugins_wordCloud.WordCloud);
    
    // Load top word data
    fetch('topword.csv')
      .then(response => response.text())
      .then(data => {
        // Process top word CSV data
        var parsedData = Papa.parse(data, { header: true }).data;
        
        // Convert data to amCharts-compatible format
        var wordCloudData = parsedData.map(item => {
          return { word: item.Word, frequency: parseFloat(item.P) }; // Parsing probability as float
        });
        
        // Create word cloud series
        var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        series.data = wordCloudData;
        series.dataFields.word = "word";
        series.dataFields.value = "frequency";
        series.labels.template.url = "https://www.inews.id/find?q={word}";
        series.labels.template.urlTarget = "_blank";
      });
    
  });