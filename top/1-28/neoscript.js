
am4core.ready(function() {
  // Create chart instance
  
  var chart = am4core.create("wordCloudChart", am4plugins_wordCloud.WordCloud);
  
  // Load news data
  fetch('topword.csv')
    .then(response => response.text())
    .then(data => {
      // Process news CSV data
      var newsData = Papa.parse(data, { header: true }).data;
      
      // Concatenate isi berita into a single string
      var contentText = newsData.map(item => item['Word']).join(" ");
      
      // Split text into words
      var words = contentText.split(/\s+/);
      
      // Count word frequencies
      var wordCounts = {};
      words.forEach(word => {
        word = word.toLowerCase();
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
      
      // Convert word frequencies to amCharts-compatible format
      var wordCloudData = Object.keys(wordCounts).map(word => {
        return { word: word, frequency: wordCounts[word] };
      });
      
      // Set data for word cloud series
      var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
      series.data = wordCloudData;
      series.dataFields.word = "word";
      series.dataFields.value = "weight";
      series.set("heatRules", [{
        target: series.labels.template,
        dataField: "value",
        min: am5.color(0xFFD4C2),
        max: am5.color(0xFF621F),
        key: "fill"
      }]);
      series.labels.template.events.on("click", function(ev) {
        const category = ev.target.dataItem.get("category");
        window.open("https://www.google.com/search?q=" + encodeURIComponent(category));
      });
    });

  // Load top word data
  fetch('topword.csv')
    .then(response => response.text())
    .then(data => {
      // Process top word CSV data
      var topWordData = Papa.parse(data, { header: true }).data;
      
      // Convert data to amCharts-compatible format
      var topWordCloudData = topWordData.map(item => {
        return { word: item.Word, weight: parseFloat(item.P) }; // Parsing probability as float
      });
      // Set data for top word cloud series (if needed)
      // var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
      // series.data = topWordCloudData;
      // series.dataFields.word = "word";
      // series.dataFields.value = "frequency";
    });
});