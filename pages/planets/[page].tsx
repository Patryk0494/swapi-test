import { useRouter } from "next/router";
import { IPlanets } from "../../model/Planets";
import { useEffect, useState } from "react";
import getPagesNumbers from "../../utils/getPagesNumbers";
import { NextPage } from "next";
import Pagination from "../../components/Pagination";

const API_URL = "https://swapi.dev/api/";

interface PlanetsComponentProps {
  data: IPlanets;
}

const PlanetsPage: NextPage<PlanetsComponentProps> = ({ data }) => {
  const {
    query: { page },
  } = useRouter();

  console.log(data);

  const countPage = Math.ceil(data.count / 10);
  const pages = getPagesNumbers(data.count);
  const currentPage = parseInt(page as string, 10);

  const [nextPage, setNextPage] = useState<number>(1);
  const [previousPage, setPreviousPage] = useState<number>(1);

  useEffect(() => {
    setNextPage(currentPage + 1);
    setPreviousPage(currentPage - 1);
  }, [currentPage, countPage]);

  const planets = data.results;

  const planetsWithId = planets.map((planet) => {
    const { url } = planet;
    const planetId = url.split("/")[5];

    return { ...planet, id: planetId };
  });

  return (
    <div className="page-background">
      <main className="container">
        {data ? (
          <>
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
              <Pagination
                previousPage={previousPage}
                nextPage={nextPage}
                pages={pages}
              />
            </section>
          </>
        ) : (
          <div>
            <p>Error. Try to reload the page.</p>
          </div>
        )}
      </main>
    </div>
  );
};

// PlanetsPage.getInitialProps = async (ctx: any) => {
//   const {
//     query: { page },
//   } = ctx;

//   try {
//     const respone = await fetch(`${API_URL}planets/?page=${page}`);
//     const data = await respone.json();

//     return {
//       props: { data },
//     };
//   } catch (error) {
//     return { props: { data: null } };
//   }
// };

// export const getStaticPaths = async () => {
//   const respone = await fetch(`${API_URL}planets`);
//   const { count } = await respone.json();
//   const paths = getPagesNumbers(count).map((page) => {
//     return { params: { planets: "planets", page: page.toString() } };
//   });
//   return {
//     fallback: true,
//     paths,
//   };
// };

export const getServerSideProps = async (ctx: any) => {
  const {
    params: { page },
  } = ctx;
  const respone = await fetch(`${API_URL}planets/?page=${page}`);
  const data = await respone.json();
  return {
    props: { data },
  };
};

export default PlanetsPage;
