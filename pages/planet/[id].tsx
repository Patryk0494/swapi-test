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

  return (
    <div className="page-background">
      <main className="container">
        <section className="planet">
          <h2 className="planet__props">
            Name: <span className="planet__props-value">{name}</span>
          </h2>
          <h2 className="planet__props">
            Population:{" "}
            <span className="planet__props-value">{population}</span>
          </h2>
          <h2 className="planet__props">
            Climate: <span className="planet__props-value">{climate}</span>
          </h2>
          <h2 className="planet__props">
            Diameter: <span className="planet__props-value">{diameter}</span>
          </h2>
          <h2 className="planet__props">
            Gravity: <span className="planet__props-value">{gravity}</span>
          </h2>
          <h2 className="planet__props">
            Orbital period:{" "}
            <span className="planet__props-value">{orbital_period}</span>
          </h2>
          <h2 className="planet__props">
            Rotaion period:{" "}
            <span className="planet__props-value">{rotation_period}</span>
          </h2>
          <h2 className="planet__props">
            Surface water:{" "}
            <span className="planet__props-value">{surface_water}</span>
          </h2>
          <h2 className="planet__props">
            Terrain: <span className="planet__props-value">{terrain}</span>
          </h2>
        </section>
      </main>
    </div>
  );
};

Planet.getInitialProps = async ({ query: { id } }) => {
  const respone = await fetch(`${API_URL}/planets/${id}`);
  const planet = await respone.json();
  return { props: { planet } };
};

export default Planet;
