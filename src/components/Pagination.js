// src/components/Pagination.js
import React from 'react';
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange, pagesToShow = 5 }) => {
  const getPaginationRange = () => {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = startPage + pagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageRange = getPaginationRange();

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        {'<<'}
      </button>
      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
