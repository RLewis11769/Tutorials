import { useState } from "react";

export default function AddItem(props) {
  // Set state for search bar
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  const addItemButtonPushed = () => {
    // Set the state of the search bar to the values entered using callback function
    props.addItem({
      name,
      price,
      type,
      brand,
    });
    // Reset the form after adding
    setName("");
    setPrice(0);
    setType("");
    setBrand("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Add item</h1>
      </div>
      <form>
        <div className="row">
          <label htmlFor="name-field">Name:</label>
          <input
            className="form-control"
            type="text"
            id="name-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="price-field">Price:</label>
          <input
            className="form-control"
            type="number"
            id="price-field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="type-field">Type:</label>
          <input
            className="form-control"
            type="text"
            id="type-field"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="brand-field">Brand:</label>
          <input
            className="form-control"
            type="text"
            id="brand-field"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="row my-3">
          <button
            className="btn btn-info col-4 mx-auto"
            type="button"
            onClick={() => addItemButtonPushed()}
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
