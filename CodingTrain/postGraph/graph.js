// Data is Zonal Annual Means 1880-present, Land-Surface-Air and Sea-Surface-Water temperature
// Data from https://data.giss.nasa.gov/gistemp/
// Global average is calculated at 14° C but data is deviation from this average

createChart();

async function createChart() {
	// This function asynchronously loads the data, generates the chart, and displays it

	// Calls function to load data (returns data in obj)
	const data = await getData()
		.catch(error => console.error(error));

	// Returns reference to html canvas element as defined above
	const canvas = document.getElementById('chart');
	// Returns 2d drawing/rendering context on canvas
	const ctx = canvas.getContext('2d');
	// Generates chart in 'chart' with obj being the data to add to ctx
	const myChart = new Chart(ctx, {
		// Line graph
		type: 'line',
		data: {
			// Sets x-axis as years
			labels: data.years,
			datasets: [{
				label: 'Combined Land-Surface-Air and Sea-Surface-Water Temperature in C°',
				// Sets y-axis as temps
				data: data.temps,
				// Sets each dot to red
				backgroundColor: 'rgba(255, 0, 0, 0.5)',
				// Sets line between dots to red
				borderColor: 'rgba(255, 0, 0, 1)',
				borderWidth: 1
			}]
		},
		// Complicated system to choose chart options
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							// Defines tick marks of y-axis with celcius degrees
							callback: function (value, index, values) {
								return value + '°';
							}
						}
					}
				]
			}
		}
	});
}

async function getData() {
	// Function to asynchronously get/parse data and return it in obj

	// Empty arrays to store data and eventually return
	const years = [];
	const temps = [];

	// This section fetches data, cleans it, and puts into array
	// Each element in array is string of year and temperature representing row in table
	// Fetch data from file - returns a promise
	const response = await fetch('graph.csv');
	// Converts promise response to text string
	const data = await response.text();
	// Each year is on different line separated by newline
	// First line is header so don't need it - slice off
	const table = data.split('\n').slice(1);

	// This section parses array table on each row
	table.forEach(row => {
		// csv = comma-separated values so can just split on comma
		// Note: this is good clean data so don't need to clean much
		// Note: only need first two columns (year and temperature)
		const column = row.split(',');
		// First column is year of data
		const year = column[0];
		// Add each year to array that will be used on x-axis
		years.push(year);
		// Second column is variation from average
		const temp = column[1];
		// Add each temp to array that will be used on y-axis
		// Because temp is stored as string, convert to float
		// Add 14 because this data is stored as deviation from average which is 14° C
		temps.push(parseFloat(temp) + 14);
	});

	// Now that data is parsed, return in obj
	return { years, temps };
}
