# React Intro

## Description

Following along with the React Beginners series starting [here](https://www.youtube.com/watch?v=Ma6DRDIedVE&list=PLzMcBGfZo4-nRV61oEu3KfMwWKI571uPT&index=1).

The series is a complete introduction to the React framework through a super basic inventory page. It uses a JSON backend to store persistent data as a pseudo-database while also updating the state to be used locally as shown in the table at the top of the page. Data can be added and deleted. All data is shown by default or it can be filtered based on keys contained within each item in the inventory.

App.js is the primary file and topmost component used to build out the app's structure. It includes the overall rendering code, as well as several callback functions passed to child components as props, hooks to modify the state and mount database information on load, a filtering function, and a basic custom styling component.

ItemDisplay.js, SearchBar.js, and AddItem.js are the 3 primary components that make up the app. LCM_Class.js is an example of how to use life cycle methods, which are exclusive to classes. The same hook functionality exists within functional components as useEffect.

The inventory as shown within the table is initially set to {"items": []}. The JSON server requires an object, although not neccesarily a key/value pair, meaning that I could have done this without "items" and instead referenced "data" rather than consistently having to refer to data["items"]. However, this is how the tutorial had it and I decided not to mess with it.

I was unable to fix several issues that are ultimately minor but slightly frustrating. First, the console warns "Each child in a list should have a unique "key" prop". This is because I was unable to add a key to the table entries. I was also unable to add a unique id for each input field for accessability purposes, meaning that in AddItem.js, every entry contains "name-field" etc. Both of these issues would likely be fixed by adding an iterator or some other unique ID to the end of the string as in "name-field1". However, since this is a simple introduction to React, I decided to allow these warnings to stand without spending the time to correct them.

An even more basic intro is seen in DemoApp.js and DemoInfo.js. To view this example code, comment out the existing import line in index.js and uncomment the line below that references the DemoApp file. There shouldn't be anything super interesting in either file that isn't covered in App.js and its related files but they do a nice job on covering how to create functional and class components.

Styling was added via Bootstrap. Two .css files are included regardless. index.css contains generic top-level container DOM element CSS style rules as it is loaded before any components are added. App.css and any other CSS files imported into components are global regardless of name (unless designated as a module stylesheet) with the name of the component used for organizational purposes only. App.css has been added for demonstration purposes but doesn't include useful CSS.

## Production Server Instructions

This repository does not include the required /node_modules folder. Install it with:
```
npm install
```

Start the Rest API on one terminal with:
```
json-server db.json
```

In the second terminal, start the program with:
```
npm start
```

Note that when the json-server is started, it will run on port 3000, which is hardcoded into the fetch methods. This is also the default React port. However, if starting the production server second, it can be run on a different port (just say yes).

At this point, the data in the database file, db.json, will be viewable at: http://localhost:3000/items

The actual development server frontend will likely be viewable at: http://localhost:3001/

## Installation

### React

Create project and install template code with:
```
npx create-react-app foldername
```

### Styling

To use React styled components:
```
npm add styled-components
npm install --save styled-components
```

To use Bootstrap within React:
```
npm install react-bootstrap bootstrap
```

### JSON Server

Install JSON server with:
```
npm install -g json-server
```

## Credit

Original project designed by [Tim Ruscica](https://github.com/techwithtim).
