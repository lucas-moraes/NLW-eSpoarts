import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";
import { GameBanner } from "./components/GameBanner";
import { CreatedAdBanner } from "./components/CreateAdBanner";

import "./styles/main.css";
import logoImg from "./assets/logo.svg";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto my-10 flex flex-col items-center">
      <img src={logoImg} />

      <h1 className="text-5xl text-white font-black mt-10">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> esta aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-10">
        {games.map((game) => {
          return <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />;
        })}
      </div>

      <Dialog.Root>
        <CreatedAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
