import { useState } from "react";

function ProductForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    product_name: "",
    price: "",
    category: "",
    stock_status: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, stock_status: e.target.checked ? 1 : 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    // reset only if success is handled in parent
    setForm({
      product_name: "",
      price: "",
      category: "",
      stock_status: 1,
    });
  };

  return (
    <div className="col-md-4 mb-4">
      <h4>Add Product</h4>
      <form onSubmit={handleSubmit} className="border p-3 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            name="product_name"
            className="form-control"
            value={form.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            className="form-control"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            name="category"
            className="form-control"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="in_stock"
            checked={form.stock_status === 1}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="in_stock">
            In Stock
          </label>
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
