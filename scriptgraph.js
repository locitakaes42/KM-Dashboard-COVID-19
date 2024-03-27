window.onload = function() {
    // Fetch CSV data
    fetch('covid3.csv')
        .then(response => response.text())
        .then(csvData => {
            // Parse CSV data
            const data = parseCSV(csvData);
            // Create chart
            createChart(data);
        })
        .catch(error => console.error('Error:', error));
};

// Function to parse CSV data into a format suitable for Chart.js
function parseCSV(csvData) {
    const rows = csvData.trim().split('\n');
    const labels = [];
    const cases = [];
    const deaths = [];
    const recovered = [];

    rows.forEach(row => {
        const columns = row.split(',');
        labels.push(columns[0]);
        cases.push(parseInt(columns[1]));
        deaths.push(parseInt(columns[2]));
        recovered.push(parseInt(columns[3]));
    });

    return { labels, cases, deaths, recovered };
}

// Function to create a chart using Chart.js
function createChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Cases',
                    data: data.cases,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Deaths',
                    data: data.deaths,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Recovered',
                    data: data.recovered,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
