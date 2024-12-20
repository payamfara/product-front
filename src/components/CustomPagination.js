import React from "react";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const delta = 2;
        const pages = [];
        const startPage = Math.max(1, currentPage - delta);
        const endPage = Math.min(totalPages, currentPage + delta);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (startPage > 1) {
            pages.unshift("...");
            pages.unshift(1);
        }

        if (endPage < totalPages) {
            pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >قبلی</Pagination.Prev>

            {pageNumbers.map((page, index) =>
                page === "..." ? (
                    <Pagination.Ellipsis key={index} disabled />
                ) : (
                    <Pagination.Item
                        key={index}
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Pagination.Item>
                )
            )}

            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >بعدی</Pagination.Next>
        </Pagination>
    );
};

export default CustomPagination;
