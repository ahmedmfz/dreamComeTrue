function Pagination({ pagination, onPageChange }) {
    const { current_page, total_pages } = pagination;
  
    const pages = Array.from(
      { length: total_pages || 1 },
      (_, i) => i + 1
    );
  
    return (
      <nav aria-label="Products pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${current_page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(current_page - 1)}
            >
              Previous
            </button>
          </li>
  
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${current_page === page ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
  
          <li
            className={`page-item ${
              current_page === total_pages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(current_page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Pagination;
  