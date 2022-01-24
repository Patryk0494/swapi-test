import { useRouter } from "next/router";
import { PlanetsI } from "../../model/Planets";
import Router from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import getPagesNumbers from "../../utils/getPagesNumbers";
import { NextPage } from "next";
import Pagination from "../../components/Pagination";

const API_URL = "https://swapi.dev/api/";

interface PlanetsComponentProps {
  props: { data: PlanetsI };
}

const PlanetsPage: NextPage<PlanetsComponentProps> = ({ props: { data } }) => {
  const {
    query: { page },
  } = useRouter();

  const countPage = Math.ceil(data.count / 10);
  const pages = getPagesNumbers(data.count);
  const currentPage = parseInt(page as string, 10);

  const [nextPage, setNextPage] = useState<number>(1);
  const [previousPage, setPreviousPage] = useState<number>(1);

  useEffect(() => {
    if (countPage > currentPage) {
      setNextPage(currentPage + 1);
    }
    if (currentPage > 1) {
      setPreviousPage(currentPage - 1);
    }
  }, [currentPage, countPage]);

  const handlePageClick = (event: any) => {
    Router.push(`${event.target.id}`);
  };

  const planets = data.results;

  const planetsWithId = planets.map((planet) => {
    const { url } = planet;
    const planetId = url.split("/")[5];

    return { ...planet, id: planetId };
  });

  return (
    <div className="page-background">
      <main className="container">
        <section className="planets">
          <div className="planets__container">
            {planetsWithId.map(({ name, id }) => (
              <div key={`${name}`} className="planets__item">
                <div className="planets__content">
                  <a className="planets__link" href={`/planet/${id}`}>
                    {name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Pagination
          previousPage={previousPage}
          nextPage={nextPage}
          pages={pages}
          handlePageClick={handlePageClick}
        />
      </main>
    </div>
  );
};

// export const getStaticPaths = async () => {
//   const respone = await fetch(`${API_URL}/planets`);
//   const { count } = await respone.json();
//   const paths = getPagesNumbers(count).map((page) => {
//     return { params: { planets: "planets", page: page.toString() } };
//   });
//   return {
//     fallback: true,
//     paths,
//   };
// };

// export const getStaticProps = async (ctx: any) => {
//   const {
//     params: { page },
//   } = ctx;
//   const respone = await fetch(`${API_URL}/planets/?page=${page}`);
//   const data = await respone.json();
//   return {
//     props: { data },
//   };
// };

PlanetsPage.getInitialProps = async (ctx: any) => {
  const {
    query: { page },
  } = ctx;
  const respone = await fetch(`${API_URL}/planets/?page=${page}`);
  const data = await respone.json();
  return {
    props: { data },
  };
};

export default PlanetsPage;
