/* NAVIGATION
	1. On window load
	2. Generate Data
	3. Add to DOM
		- renderWithStrings
		- renderWithCreateElement
		- renderWithJQStrings
		- renderWithJQElements
	4. Timing DOM Manipulation
		- handleRenderWithStrings
		- handleRenderWithCreateElement
		- handleRenderWithJQString
		- handleRenderWithJQElements
*/


/*** 1. ON WINDOW LOAD ***/

window.onload = () => {
	dataList = genDataList(n);

	// using jQuery for event handlers to save lines
	$('#btn_withStrings').click(handleRenderWithStrings);
	$('#btn_createElement').click(handleRenderWithCreateElement);
	$('#btn_jqueryStrings').click(handleRenderWithJQString);
	$('#btn_jqueryElements').click(handleRenderWithJQElements);
};



/*** 2. GENERATE DATA ***/

// Global variables for generating/handling/timing
let n = 1000;
let dataList;
let timerStart;
let timerEnd;


function genDataList(n) {
	// Use Faker.js library to create/format placeholder data
	return [...Array(n).keys()].map((i) => ({
		id: i,
		title: faker.lorem.sentence(),
		text: faker.lorem.paragraph()
	}))
}



/*** 3. ADD TO DOM ***/


/* renderWithStrings
   ============================= */

function renderWithStrings(dataList) {
	// Update DOM using Element.innerHTML += string
	// @dataList: array of items to render
	// pros - easy to read/write-- you can just copy/paste HTML
	// cons - slow af for large updates
	// reference - https://developer.mozilla.org/en-US/docs/Web/API/Element/append

	function buildList() {
		// setting innerHTML from string
		const elemStr = '<ul id="results"></ul>';
		document.getElementById('results_wrapper').innerHTML = elemStr;
	}

	function addListItem(data) {
		// convert structured data JSON to HTML string
		const elemStr = `<li>
				<span><b>${data.title}</b> - ${data.id}</span>
				<span><p>${data.text}</p></span>
				</li>`;
		// get DOM Element <ul> to append new `elemStr`
		const resultsList = document.getElementById('results');
		resultsList.innerHTML += elemStr;
		// expensive function, but pretty, clean code
		// has to parse HTML string before calling [browser magic] to render new DOM
	}

	// build list and render data
	buildList();
	dataList.forEach(data => addListItem(data))
}


/* renderWithCreateElement
   ============================= */

function renderWithCreateElement(dataList) {
	// Update DOM using Element.appendChild(Element)
	// @dataList: array of items to render
	// pros - super fast!
	// cons - not fun to read/write, hard to think in DOM structure
	// reference - https://developer.mozilla.org/en-US/docs/Web/API/Element/append

	function buildList() {
		// create element & set ID (2 lines)
		const elem = document.createElement('ul');
		elem.id = 'results';
		// call document.body.appendChild(elem:Element)
		document.getElementById('results_wrapper').appendChild(elem);
	}

	function addListItem(data) {
		// grab properties from data
		const { title, id, text } = data;

		// create HTML Elements for new <li> & its contents
		const LI = document.createElement('li');
		const SPAN_title = document.createElement('span');
		const B_title = document.createElement('b');
		const SPAN_body = document.createElement('span');
		const P_body = document.createElement('p');

		// build new piece of DOM from HTML Elements
		// make SPAN_title = `<span><B_title>({id})</span>`
		B_title.innerText = title;
		SPAN_title.appendChild(B_title);
		SPAN_title.append(` - ${data.id}`);

		// make SPAN_body = `<span><p>{text}</p></span>`
		P_body.innerText = text;
		SPAN_body.appendChild(P_body);

		// make LI = `<li><SPAN_title><SPAN_body></li>`
		LI.appendChild(SPAN_title);
		LI.appendChild(SPAN_body);

		// finally, we can appendChild new `LI` to ul#results
		document.getElementById('results').appendChild(LI);
		// fast AF function, horrible to write and maintain
		// everything stays structured -- no unnecessary stringify-ing/parsing
		// directly calls to [browser magic] from JS to render new DOM
	}

	// build list and render data
	buildList();
	dataList.forEach(data => addListItem(data))
}


/* renderWithJQStrings
   ============================= */

function renderWithJQStrings(dataList) {
	// Update DOM using JQuery.append(string)
	// @dataList: array of items to render
	// pros - tiny functions, follows HTML patterns, fast
	// cons - still not React
	// reference - https://api.jquery.com/append/

	function buildList() {
		const elemStr = '<ul id="results"></ul>';
		// call JQuery.append(string)
		$('#results_wrapper').append(elemStr);
	}

	function addListItem(data) {
		const elemStr = `<li>
					<span><b>${data.title}</b> - ${data.id}</span>
					<span><p>${data.text}</p></span>
				</li>`;
		$('#results').append(elemStr);
	}

	// build list and render data
	buildList();
	dataList.forEach(data => addListItem(data))
}


/* renderWithJQElements
   ============================= */

function renderWithJQElements(dataList) {
	// Update DOM using JQuery.append(JQuery)
	// @dataList: array of items to render
	// pros - tiny functions, follows HTML patterns
	// cons - slightly slower than renderWithJQStrings, but more inline
	// reference - https://api.jquery.com/append/

	function buildList() {
		const elemStr = '<ul id="results"></ul>';
		// call JQuery.append(string)
		$('#results_wrapper').append(elemStr);
	}

	function addListItem(data) {
		const elem = $('<li>').append(
			$('<span>').append(
				$('<b>').text(data.title),
				` - ${data.id}`
			),
			$('<span>').append(
				$('<p>').text(data.text)));
		$('#results').append(elem);
	}

	// build list and render data
	buildList();
	dataList.forEach(data => addListItem(data))
}



/*** 4. TIMING DOM MANIPULATION ***/


/* handleRenderWithStrings
   ============================= */

function handleRenderWithStrings() {
	// Call renderWithStrings and time how long it takes

	// remove ul#results if exists
	if (document.getElementById('results')) {
		document.getElementById('results').remove();
	}
	console.log("Calling renderWithStrings...");
	timerStart = performance.now();
	renderWithStrings(dataList);
	timerEnd = performance.now();
	console.log(`renderWithStrings: ${n} items in ${timerEnd - timerStart}ms`);
}


/* handleRenderWithCreateElement
   ============================= */

function handleRenderWithCreateElement() {
	// Call renderWithCreateElement and time how long it takes

	// remove ul#results if exists
	if (document.getElementById('results')) {
		document.getElementById('results').remove();
	}
	console.log("Calling renderWithCreateElement...");
	timerStart = performance.now();
	renderWithCreateElement(dataList);
	timerEnd = performance.now();
	console.log(`renderWithCreateElement: ${n} items in ${timerEnd - timerStart}ms`);
}


/* handleRenderWithJQString
   ============================= */

function handleRenderWithJQString() {
	// Call renderWithJQString and time how long it takes

	if (document.getElementById('results')) {
		document.getElementById('results').remove();
	}
	console.log("Calling renderWithJQString...");
	timerStart = performance.now();
	renderWithJQStrings(dataList);
	timerEnd = performance.now();
	console.log(`renderWithJQString: ${n} items in ${timerEnd - timerStart}ms`);
}


/* handleRenderWithJQElements
   ============================= */

function handleRenderWithJQElements() {
	// Call renderWithJQElements and time how long it takes

	if (document.getElementById('results')) {
		document.getElementById('results').remove();
	}
	console.log("Calling renderWithJQElements...");
	timerStart = performance.now();
	renderWithJQElements(dataList);
	timerEnd = performance.now();
	console.log(`renderWithJQElements: ${n} items in ${timerEnd - timerStart}ms`);
}
