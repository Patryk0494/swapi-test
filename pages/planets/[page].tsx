import { useRouter } from "next/router";
import { IPlanets } from "../../model/Planets";
import { useEffect, useState } from "react";
import getPagesNumbers from "../../utils/getPagesNumbers";
import { NextPage } from "next";
import Pagination from "../../components/Pagination";

const API_URL = "https://swapi.dev/api/";

interface PlanetsComponentProps {
  props: { data: IPlanets };
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
            </section>
            <Pagination
              previousPage={previousPage}
              nextPage={nextPage}
              pages={pages}
            />
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

PlanetsPage.getInitialProps = async (ctx: any) => {
  const {
    query: { page },
  } = ctx;

  try {
    const respone = await fetch(`${API_URL}/planets/?page=${page}`);
    const data = await respone.json();

    return {
      props: { data },
    };
  } catch (error) {
    return { props: { data: null } };
  }
};

export default PlanetsPage;
