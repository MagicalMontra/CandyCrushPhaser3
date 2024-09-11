import 'phaser';
import "reflect-metadata"
import Router from 'next/router';
import { container } from 'tsyringe';
import { TestScenes } from './scenes/Scenes';
import { memo, useEffect, useRef } from 'react';
import { GameConfig } from './singleton/GameConfig';
import { TEST_GAME_EVENT } from 'modules/GameEvent';
import { GameInstaller } from './singleton/GameInstaller';
import { PluginsInstaller } from './singleton/PluginsInstaller';

export class MainGame extends Phaser.Game {
  constructor() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sceneParam = urlParams.get("scene")
    const sceneName = sceneParam == null ? "" : sceneParam

    container.registerSingleton<GameInstaller>(GameInstaller)
    container.registerSingleton<PluginsInstaller>(PluginsInstaller)
    container.registerInstance<Phaser.Types.Core.GameConfig>('game_config', GameConfig)

    const gameInstaller = container.resolve<GameInstaller>(GameInstaller);
    const scenes = gameInstaller.Scenes()
    gameInstaller.Install(sceneName, TestScenes)

    super(Object.assign(container.resolve<Phaser.Types.Core.GameConfig>('game_config'), { scene: scenes }))
  }
}

const TestGame = () => {
  const game = useRef<MainGame>()
  const loaded = useRef(false)

  useEffect(() => {
    if (!loaded.current) {
      console.log("create game instance", process.env.NEXT_PUBLIC_DISABLE_GAME)

      game.current ??= new MainGame()
      loaded.current = true
    }
    game.current?.events.once(TEST_GAME_EVENT.PAGE1, () => Router.push("/page1"))
  }, [])

  return <div id="game-react" className="h-[calc(100vh)] bg-black" />
}

export default memo(TestGame)