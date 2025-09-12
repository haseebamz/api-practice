import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import AddProducts from "../src/components/addProduct/AddProducts";

function App() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log("Error fetching products", error);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div>
        {showModal && <AddProducts onClose={() => setShowModal(false)} />}
        <div className="container mt-5">
          <h1 className="text-center mb-4">Products Table</h1>
          <button
            className="btn btn-primary mb-4"
            onClick={() => setShowModal(true)}
          >
            Add Product
          </button>

          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover  align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Image</th>
                  <th className="text-center">Price</th>
                </tr>
              </thead>
        
              <tbody>
                      {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : null}
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td className="text-center">{item.category}</td>
                    <td className="text-center">
                      <div className="productImgWrap">
                        <img
                          src={item.image}
                          alt="Product"
                          width="50"
                          className="img-fluid"
                        />
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-success">${item.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
