import { BaseScene } from '../scenes/BaseScene';
import { container, injectable } from 'tsyringe';
import { PluginsInstaller } from './PluginsInstaller';

@injectable()
export class GameInstaller {
  public Scenes(): (typeof Phaser.Scene)[] {
    return this.scenes;
  }

  private scenes: (typeof Phaser.Scene)[] = [];

  constructor() {}

  public Install(
    firstSceneName: string,
    scenes: { id: string; value: typeof BaseScene }[]
  ) {
    //FIXME: Change the TestScenes to Scenes constant
    const pluginsInstaller =
      container.resolve<PluginsInstaller>(PluginsInstaller);
    pluginsInstaller.RegisterGlobalPlugin(container);

    if (firstSceneName != '') {
      const firstScene = scenes.find((scene) => scene.id == firstSceneName);

      if (firstScene) {
        this.scenes.push(firstScene.value);
      }
    }

    for (const scene of scenes) {
      const lowerName = scene.id.toLowerCase();

      if (firstSceneName != '' && lowerName == firstSceneName.toLowerCase())
        continue;

      this.scenes.push(scene.value);
    }
  }
}
