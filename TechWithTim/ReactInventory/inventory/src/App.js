import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AddItem from "./AddItem";
import ItemDisplay from "./ItemDisplay";
import SearchBar from "./SearchBar";
import LifeCycleComponent from "./LCM_Class";

// Custom styled component with passed parameters
const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: ${(props) => (props.color ? props.color : "black")};
`;

function App() {
  // Main structure of app as seen in index.js

  // useState and useEffect are hooks
  // Meaning have hooked into default behavior of component and can modify it
  // Setting local state - variable, filter, and default value
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });
  // Example as seen in LCC_Class.js
  const [Test, setTest] = useState(true);

  useEffect(() => {
    // Similar to life cycle components - runs when updates and mounts
    console.log("useEffect ran");
    // Anything in return is cleanup similar to componentWillUnmount
    return () => {
      console.log("Cleanup");
    };
    // Anything in [] is dependency array - runs when anything in array changes
    // Will run cleanup when data changes also
  }, [data]);

  // This is the actual useful useEffect hook rather than a demo of how/when it runs
  // Takes anything in db.json and mount so will show up in table on load
  useEffect(() => {
    // Send get request to server
    fetch("http://localhost:3000/items")
      // Convert response to JSON
      .then((response) => response.json())
      // Set state as response data
      .then((data) => setData({ items: data }));
    // If empty dependency array, happens on mount only
  }, []);

  const updateFilters = (searchParams) => {
    // Callback function to update state (bc read only)
    // This is how to update state of parent within child
    setFilters(searchParams);
  };

  const deleteItemFrom_DB_List = (item) => {
    // Callback function to pass through props so can delete based on delete button
    let items = data["items"];
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      (response) => {
        // If able to delete from db.json, remove from items list also
        if (response.ok) {
          // Find index of item to delete, then splice it out
          const idx = items.indexOf(item);
          items.splice(idx);
          // Set local state to new items list
          setData({ items: items });
        }
      }
    );
  };

  const addItemTo_DB_List = (item) => {
    // Callback function to take current array, add to db.json, add same data to items array, and update state
    let items = data["items"];

    // Required info for fetch post request
    const requestOptions = {
      method: "POST",
      // Tell it that data will be sent as JSON
      headers: { "Content-Type": "application/json" },
      // JSONify data before sending
      body: JSON.stringify(item),
    };

    // Send post request to server to add to db.json
    fetch("http://localhost:3000/items", requestOptions)
      // Convert response/data to JSON
      .then((response) => response.json())
      .then((data) => {
        // Add item to list and set local state
        items.push(data);
        setData({ items: items });
      });
  };

  const filterData = (items) => {
    // Function to filter search based on search params - return matching
    const filteredData = [];
    // If haven't filtered, return all items
    if (!filters.name) return items;
    for (const item of items) {
      // If default value or doesn't match search criteria, skip
      if (filters.name !== "" && item.name !== filters.name) continue;
      if (filters.price !== 0 && item.price > filters.price) continue;
      if (filters.type !== "" && item.type !== filters.type) continue;
      if (filters.brand !== "" && item.brand !== filters.brand) continue;
      // Else if matches filter, add to list
      filteredData.push(item);
    }
    return filteredData;
  };

  return (
    // Everything that will be rendered on page
    // Title, Inventory table, search, add item, and destroy component button
    <div className="container">
      <Title color="palevioletred">Inventory</Title>
      <div className="row mt-5">
        <ItemDisplay
          deleteItem={deleteItemFrom_DB_List}
          showFilterItems={filterData(data["items"])}
        />
      </div>
      <div className="row mt-5">
        <SearchBar updateSearchParams={updateFilters} />
      </div>
      <div className="row mt-5">
        <AddItem addItem={addItemTo_DB_List} />
      </div>
      {Test ? <LifeCycleComponent destroy={setTest} /> : null}
    </div>
  );
}

export default App;
