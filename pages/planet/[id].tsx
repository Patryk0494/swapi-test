import { NextPage } from "next";
import { PlanetI } from "../../model/Planets";

const API_URL = "https://swapi.dev/api/";
interface PlanetProps {
  props: { planet: PlanetI };
}

const Planet: NextPage<PlanetProps> = ({ props: { planet } }) => {
  const {
    climate,
    diameter,
    gravity,
    name,
    orbital_period,
    population,
    rotation_period,
    surface_water,
    terrain,
  } = planet;

  const getclassName = (props: string) => {
    return `planet__props-value ${
      props == "unknown" ? "planet__props-value--unknown" : ""
    }`;
  };

  return (
    <div className="page-background">
      <main className="container">
        {planet ? (
          <section className="planet">
            <h2 className="planet__props">
              Name: <span className={getclassName(name)}>{name}</span>
            </h2>
            <h2 className="planet__props">
              Population:{" "}
              <span className={getclassName(population)}>{population}</span>
            </h2>
            <h2 className="planet__props">
              Climate: <span className={getclassName(climate)}>{climate}</span>
            </h2>
            <h2 className="planet__props">
              Diameter:{" "}
              <span className={getclassName(diameter)}>{diameter}</span>
            </h2>
            <h2 className="planet__props">
              Gravity: <span className={getclassName(gravity)}>{gravity}</span>
            </h2>
            <h2 className="planet__props">
              orbital period:{" "}
              <span className={getclassName(orbital_period)}>
                {orbital_period}
              </span>
            </h2>
            <h2 className="planet__props">
              Rotaion period:{" "}
              <span className={getclassName(rotation_period)}>
                {rotation_period}
              </span>
            </h2>
            <h2 className="planet__props">
              Surface water:{" "}
              <span className={getclassName(surface_water)}>
                {surface_water}
              </span>
            </h2>
            <h2 className="planet__props">
              Terrain: <span className={getclassName(terrain)}>{terrain}</span>
            </h2>
          </section>
        ) : (
          <div>
            <p className="">Error. Try to reload the page.</p>
          </div>
        )}
      </main>
    </div>
  );
};

Planet.getInitialProps = async ({ query: { id } }) => {
  try {
    const respone = await fetch(`${API_URL}/planets/${id}`);
    const planet = await respone.json();
    return { props: { planet } };
  } catch (error) {
    return { props: { planet: null } };
  }
};

export default Planet;
