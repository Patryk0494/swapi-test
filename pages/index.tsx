import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="page-background">
      <Head>
        <title>Star Wars Planets</title>
        <meta
          name="description"
          content="Star wars planets list with descriptions"
        />
        <meta name="keywords" content="Star Wars, Star, Wars, planets, " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="landingpage container">
        <Link href="/planets/1">
          <a className="landingpage__link">PLANETS</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
