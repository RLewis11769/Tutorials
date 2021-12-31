export default function ItemDisplay({ showFilterItems, deleteItem }) {
  // Function to display items with items function and delete with deleteItem
  const showItem = (item) => {
    // Function to display each item in items list
    return (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.type}</td>
        <td>{item.brand}</td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteItem(item)}>
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    // Map each item in items list to showItem function
    <div className="container">
      <div className="row">
        <h1 className="text-center">Inventory Items</h1>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Brand</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{showFilterItems.map(showItem)}</tbody>
        </table>
      </div>
    </div>
  );
}
