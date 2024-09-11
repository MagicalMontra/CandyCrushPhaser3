import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react';

const Main = dynamic({
  loader: () => import("../modules/game/TestGame"),
  ssr: false,
})

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
  }, []);

  return (
    <>
      <Head>
        <title key="title">Candy Game Test</title>
      </Head>
    </>
  );
};

export default Home;
