import { useRouter } from "next/router";
import { PlanetI } from "../../model/Planets";
const API_URL = "https://swapi.dev/api/";

interface PlanetProps {
  props: { planet: PlanetI };
}

export default function Planet({ props: { planet } }: PlanetProps) {
  return (
    <div>
      <h1>Population: {planet.population}</h1>
    </div>
  );
}

Planet.getInitialProps = async ({ query: { id } }) => {
  const respone = await fetch(`${API_URL}/planets/${id}`);
  const planet = await respone.json();
  return { props: { planet } };
};
