import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface PaginationProps {
  previousPage: number;
  nextPage: number;
  pages: number[];
}

export default function Pagination({
  previousPage,
  nextPage,
  pages,
}: PaginationProps): JSX.Element {
  const router = useRouter();

  const PagesButtons = () => {
    return (
      <React.Fragment>
        {pages.map((page) => (
          <Link href={`/planets/${page}`} key={page.toString()}>
            <a
              className={
                router.asPath == `/planets/${page}` ? "active-page" : ""
              }
            >
              {page}
            </a>
          </Link>
        ))}
      </React.Fragment>
    );
  };

  return (
    <div className="pagination">
      {previousPage >= 1 ? (
        <Link href={`/planets/${previousPage}`}>
          <a>Previous</a>
        </Link>
      ) : (
        <Link href={`/planets/${previousPage}`}>
          <a className="disabled-link">Previous</a>
        </Link>
      )}
      <PagesButtons />
      {nextPage <= pages.length ? (
        <Link href={`/planets/${nextPage}`}>
          <a>Next</a>
        </Link>
      ) : (
        <Link href={`/planets/${nextPage}`}>
          <a className="disabled-link">Next</a>
        </Link>
      )}
    </div>
  );
}
