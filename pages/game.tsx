import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";

const TestGame = dynamic({
  loader: () => import("../modules/game/TestGame"),
  ssr: false,
})

const Game = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
  }, []);

  return (
    <>
      <Head>
        <title key="title">Candy Game Test</title>
      </Head>
      <main className="overflow-hidden">
        <>
          {""}
          <div className="relative">
          <div className="relative flex h-screen items-center justify-center">
            <TestGame/>
          </div>
          </div>
        </>
      </main>
    </>
  );
};

export default Game