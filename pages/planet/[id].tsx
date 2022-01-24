import { NextPage } from "next";
import { PlanetI } from "../../model/Planets";

const API_URL = "https://swapi.dev/api/";
// climate: string;
// created: string;
// diameter: string;
// edited: string;
// films: string[];
// gravity: string;
// name: string;
// orbital_period: string;
// population: string;
// residents: string[];
// rotation_period: string;
// surface_water: string;
// terrain: string;
// url: string;
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
    films,
  } = planet;

  console.log(films);
  return (
    <div className="page-background">
      <main className="container">
        <section className="planet">
          <h2 className="planet__props">Name: {name}</h2>
          <h2 className="planet__props">Population: {population}</h2>
          <h2 className="planet__props">Climate: {climate}</h2>
          <h2 className="planet__props">Diameter: {diameter}</h2>
          <h2 className="planet__props">Gravity: {gravity}</h2>
          <h2 className="planet__props">Orbital period: {orbital_period}</h2>
          <h2 className="planet__props">Rotaion period: {rotation_period}</h2>
          <h2 className="planet__props">Surface water: {surface_water}</h2>
          <h2 className="planet__props">Terrain: {terrain}</h2>
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
