import { useEffect, useState } from "react";
import api from "./api/client";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import Pagination from "./components/Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    per_page: 10,
    total_items: 0,
  });
  const [filterName, setFilterName] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchProducts = async (page = 1, search = "") => {
    try {
      setLoadingList(true);
      setError("");
      const res = await api.get("/products", {
        params: { page, search }, 
      });

      setProducts(res.data.data || []);
      setPagination(res.data.pagination || pagination);
      setMessage(res.data.message || "");
    } catch (e) {
      console.error(e);
      setError("Failed to load products.");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(1, filterName);
    }, 500);

    return () => clearTimeout(timer);
  }, [filterName]);

  const handleCreateProduct = async (productData: any) => {
    setLoadingForm(true);
    setError("");
    setMessage("");
    try {
      await api.post("/products", productData);
      setMessage("Product added successfully.");
      await fetchProducts(1, filterName);
    } catch (e) {
      console.error(e);
      setError("Failed to add product. Please check the form.");
    } finally {
      setLoadingForm(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.total_pages) return;
    fetchProducts(page, filterName);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Product Listing</h1>

      {message && !error && (
        <div className="alert alert-success">{message}</div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <ProductForm onSubmit={handleCreateProduct} loading={loadingForm} />

        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">
              Products{" "}
              <small className="text-muted">
                (Total: {pagination.total_items})
              </small>
            </h4>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search by product name..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>

          {loadingList && (
            <p className="text-muted">Loading products...</p>
          )}

          <ProductTable products={products} />

          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
