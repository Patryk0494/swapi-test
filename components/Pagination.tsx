import Link from "next/link";
import React from "react";

interface PaginationProps {
  previousPage: number;
  nextPage: number;
  pages: number[];
  handlePageClick: Function;
}

export default function Pagination({
  previousPage,
  nextPage,
  pages,
  handlePageClick,
}: PaginationProps): JSX.Element {
  const PagesButtons = () => {
    return (
      <React.Fragment>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(event)}
            id={page.toString()}
          >
            {page}
          </button>
        ))}
      </React.Fragment>
    );
  };

  return (
    <div>
      <Link href={`/planets/${previousPage}`}>Previous</Link>
      <PagesButtons />
      <Link href={`/planets/${nextPage}`}>Next</Link>
    </div>
  );
}
