// Function to display CSV data as table
function displayCSV() {
    const fileInput = document.getElementById('csv-file');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const csvData = event.target.result;
            const tableHTML = csvToTable(csvData);
            const tableContainer = document.getElementById('table-container');
            tableContainer.innerHTML = tableHTML;
        };
        reader.readAsText(file);
    }
}

// Function to convert CSV data to HTML table
function csvToTable(csvData) {
    const rows = csvData.split('\n');
    let tableHTML = '<table border="1">';
    rows.forEach(row => {
        tableHTML += '<tr>';
        row.split(',').forEach(cell => {
            tableHTML += `<td>${cell.trim()}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</table>';
    return tableHTML;
}