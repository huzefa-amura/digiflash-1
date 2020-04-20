import React, { useState, useEffect } from 'react';

function Pagination(props) {
  const [pageData, setPager] = useState({});
  const [data] = useState(props.items);
  const [initialPage] = useState(1);
  const [perPageSize] = useState(10);

  useEffect(() => {
    setPage(initialPage)
  }, []);

  const setPage = (page) => {
    let items = data;
    let pageSize = perPageSize;
    let pager = pageData;

    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // get new pager object for specified page
    pager = getPager(items.length, page, pageSize);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    setPager(pager);
    // call change page function in parent component
    props.onChangePage(pageOfItems);
  }

  const getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
      } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  return (
    <nav aria-label="Page navigation example">
      {pageData.pages === undefined ? (
        ''
      ) : (
        <ul className="pagination">
        <li className={ pageData.currentPage === 1 ? 'disabled page-item' : 'page-item' }>
          <a href="#!" className="page-link" onClick={ () => setPage(1) }>First</a>
        </li>
        <li className={pageData.currentPage === 1 ? 'disabled page-item' : 'page-item'}>
          <a href="#!" className="page-link" onClick={ () => setPage(pageData.currentPage - 1) }>Previous</a>
        </li>

        { pageData.pages.map((page, index) =>
          <li key={index} className={pageData.currentPage === page ? 'active page-item' : 'page-item'}>
            <a href="#!" className="page-link" onClick={() => setPage(page)}>{page}</a>
          </li>
        ) }
        <li className={ pageData.currentPage === pageData.totalPages ? 'disabled page-item' : 'page-item' }>
          <a href="#!" className="page-link" onClick={() => setPage(pageData.currentPage + 1)}>Next</a>
        </li>
        <li className="page-link" className={ pageData.currentPage === pageData.totalPages ? 'disabled page-item' : 'page-item' }>
          <a href="#!" className="page-link" onClick={() => setPage(pageData.totalPages)}>Last</a>
        </li>
      </ul>
      )
      }

    </nav>
  );
}

export default Pagination;
