window.onload = function() {
    // Function to convert CSV data to HTML table
    function csvToTable(csvData) {
        const rows = csvData.split('\n');
        let tableHTML = '<thead>';
        rows.forEach((row, rowIndex) => {
            tableHTML += '<tr>';
            const cells = row.split(',');
            for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                const cell = cells[cellIndex];
                if (rowIndex === 0) {
                    // Add the header row with th elements
                    tableHTML += `<th>${cell.trim()}</th>`;
                } else {
                    // Add the rest of the rows with td elements
                    const classAttribute = (cellIndex === 0) ? ' class="first-cell"' : '';
                    tableHTML += `<td${classAttribute}>${cell.trim()}</td>`;
                }
            }
            tableHTML += '</tr>';
            if (rowIndex === 0) {
                tableHTML += '</thead><tbody>';
            }
        });
        tableHTML += '</tbody>';
        return tableHTML;
    }

    // Fetch CSV data
    fetch('covid.csv')
        .then(response => response.text())
        .then(csvData => {
            // Convert CSV data to HTML table
            const tableHTML = csvToTable(csvData);
            // Display HTML table in table-container div
            document.getElementById('csv-table').innerHTML = tableHTML;
            // Add sorting functionality after the table is rendered
            addSorting();
        })
        .catch(error => console.error('Error:', error));

    // Function to sort table columns
    function sortTable(table, columnIndex, isAscending) {
        const direction = isAscending ? 1 : -1;
        const rowsArray = Array.from(table.querySelector('tbody').rows);

        // Sort rows in the array
        rowsArray.sort((rowA, rowB) => {
            const cellA = rowA.cells[columnIndex].textContent.trim();
            const cellB = rowB.cells[columnIndex].textContent.trim();

            // Check if comparing dates
            if (columnIndex === 0) {
                // Convert date strings to date objects for comparison
                const dateA = new Date(cellA), dateB = new Date(cellB);
                return (dateA - dateB) * direction;
            }

            // Check if comparing numbers
            const numA = parseFloat(cellA.replace(/,/g, ''));
            const numB = parseFloat(cellB.replace(/,/g, ''));
            if (!isNaN(numA) && !isNaN(numB)) {
                return (numA - numB) * direction;
            }

            // Compare strings
            return cellA.localeCompare(cellB) * direction;
        });

        // Append rows in their sorted order
        rowsArray.forEach(row => table.querySelector('tbody').appendChild(row));
    }

    // Function to add sorting feature to the table headers
    function addSorting() {
        const table = document.getElementById('csv-table');
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.addEventListener('click', () => {
                const isAscending = header.classList.contains('th-sort-asc');
                // First remove all the previous classes
                headers.forEach(h => {
                    h.classList.remove('th-sort-asc', 'th-sort-desc', 'active');
                });
                // Toggle the direction of sorting
                header.classList.add('active');
                header.classList.toggle('th-sort-asc', !isAscending);
                header.classList.toggle('th-sort-desc', isAscending);
                // Sort the table
                sortTable(table, index, !isAscending);
            });
        });
    }
};