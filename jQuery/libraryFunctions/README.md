# Library Functions

## Description

Quick guides/references for details of jQuery library functions. All of this information is pretty basic and easily-learned through documentation but this is a visual way to see exactly what each does.

## Navigation

### 1. get_set

#### Description

Getting and setting attributes on click

#### Get

- Retrieves value of attribute

#### Set

- Changes value of attribute

#### Methods

- .text()
	- Gets/sets text content of element (as in innerText)
	- Overwrites any existing content of all matched elements when setting
	- Slower than .html()
	- Cannot be used for form inputs
- .html()
	- Gets/sets content (as in innerHTML) of element
	- Overwrites any existing content of all matched elements when setting
	- Faster than .text()
- .val()
	- Gets/sets content of form fields
	- Overwrites any existing content of all matched elements when setting
- .attr()
	- Gets/sets attributes
	- Can be "real" attributes like "class" or created attributes like "hello"
	- Gets all values linked to first element
		- In this case, gets class="bold italic" but not second class="bold"
	- Sets second value linked to element
		- In this case, $('#a2').attr({'class': 'class', 'class': 'secondClass'}) would only set secondClass
- .css()
	- Gets/sets CSS style
	- Get
		- One:
			- ( "property" )
		- Multiple:
			- [ "property1", "property2" ]
			- Will return object
				- Loop/map for individual aka [ "property1", "property2" ][0] for first etc.
	- Set
		- One:
			- ( "property", "value" )
		- Multiple/Adding duration:
			- { property: "value", property: "value" }

### 2. event_toggle

#### Description

- Using events to trigger callback methods

#### Events

- click
	- Typically used with button but not always
- mouseenter
	- When hover over only the element itself
- mouseleave
	- When hover over only the element itself
- mouseover
	- When hover over element or any of its children
- mouseout
	- When hover over element or any of its children

#### Callback Methods

- .show()
	- Shown with default duration and complete
- .hide()
	- Shown with default duration and complete
- .fadeIn()
	- .fadeToggle() could be used in place of both fadeIn and fadeOut
	- Shown with defined duration in milliseconds and alert on completion
- .fadeOut()
	- .fadeToggle() could be used in place of both fadeIn and fadeOut
	- Shown with string defintion of duration and alert on completion
- .slideToggle()
	- .slideUp() and .slideDown() could be used for either direction
	- Shown with default duration and complete
- .animate()
	- Custom animation
	- Shown with default complete (none) but string definition of duration
	- One:
		- ( "property", "value" )
	- Multiple/Adding duration:
		- { property: "value", property: "value" }
- .css()
	- mouseenter/mouseleave could be defined in CSS only
	- One:
		- ( "property", "value" )
	- Multiple/Adding duration:
		- { property: "value", property: "value" }

### 3. text_manip

#### Description

- Showing the differences between similar methods

#### Methods

.append()
	- Adds data inside element at last index
.after()
	- Adds data directly after element (as sibling element)
.prepend()
	- Adds data inside element at first index
.before()
	- Adds data directly before element (as sibling element)
.remove()
	- Remove element
.empty()
	- Remove content from element

### 4. Comparison

#### Description

- Compare jQuery methods designed for specific tasks vs. vanilla JS to accomplish same tasks
- Compare similar-sounding approaches using jQuery

#### Replace

- JavaScript
	- Uses .html() to temporarily replace existing html
	- Does not affect HTML file but only replacement text will be visible as element in document
- jQuery
	- .replaceWith()
		- Requires html tags
	- .replace()
		- Can specify exactly which words/parts of elements to replace (as opposed to entire element)
		- Used with .text() or .html()

#### Find

- Both use jQuery to find (but not the same thing)
- Find text using selector and contains
	- This IS the way to locate text (with toLowerCase())
	- Finds case-sensitive text
		- typeOfElement:contains('specificText')
- Find element
	- Finds element that is descendent of given element
	- Can be parent, grandparent, etc. Descendent just needs to exist within somewhere
		- $( "parentElement" ).find( "descendentElement" )
