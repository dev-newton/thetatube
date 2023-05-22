import "./Pagination.css";

const Pagination = ({
  dataArray,
  itemsPerPage,
  currentPage,
  handleNext,
  handlePrev,
}) => {
  // Logic for displaying page numbers
  const pageNumbers = [];
  const totalPages = Math.ceil(dataArray?.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number}>
        {number === currentPage && (
          <div className="pagination-row">
            <div
              id={number}
              className="pagiantion-arrow"
              onClick={currentPage !== 1 && handlePrev}
              style={{ color: currentPage === 1 && "#ddd" }}
            >
              {"<"}
            </div>

            <p>{number}</p>

            <div
              id={number}
              className="pagiantion-arrow"
              onClick={currentPage < totalPages && handleNext}
              style={{ color: currentPage === totalPages && "#ddd" }}
            >
              {">"}
            </div>
          </div>
        )}
      </li>
    );
  });
  return <div>{renderPageNumbers}</div>;
};

export default Pagination;
