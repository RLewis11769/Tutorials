import { useState } from "react";

export default function SearchBar(props) {
  // Set state for search bar
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  const searchButtonPushed = () => {
    // Set the state of the search bar to the values entered using callback function
    props.updateSearchParams({
      name,
      price,
      type,
      brand,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Search for item</h1>
        <form>
          <div className="row">
            <div className="col">
              <label htmlFor="name-field">Name:</label>
              <input
                className="form-control"
                type="text"
                id="name-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="price-field">Max Price:</label>
              <input
                className="form-control"
                type="number"
                id="price-field"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="type-field">Type:</label>
              <input
                className="form-control"
                type="text"
                id="type-field"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="brand-field">Brand:</label>
              <input
                className="form-control"
                type="text"
                id="brand-field"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
          <div className="row my-3">
            <button
              className="btn btn-info col-4 mx-auto"
              type="button"
              onClick={() => searchButtonPushed()}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
