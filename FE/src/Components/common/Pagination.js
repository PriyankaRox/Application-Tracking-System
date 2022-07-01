import React from "react";
import _ from "lodash";
import "./pagination.css"

function pagination({ lenght, pagesize, onChange, currentpage }) {
  const pageCount = Math.ceil(lenght / pagesize);
  // console.log(pageCount)

  const pages = _.range(1, pageCount + 1);
  console.log(pages);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center pageStyle">
        <li
          classname="page-item"
          onClick={() => {
            if (currentpage != 1) {
              onChange(currentpage - 1);
            }
          }}
        >
          <a className="page-link " href="#">
          &laquo;
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentpage ? "page-item active" : "page-item"}
            onClick={() => onChange(page)}
          >
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
        <li
          classname="page-item"
          onClick={() => {
            if (currentpage != pageCount) {
              onChange(currentpage + 1);
            }
          }}
        >
          <a className="page-link" href="#">
          &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default pagination;
