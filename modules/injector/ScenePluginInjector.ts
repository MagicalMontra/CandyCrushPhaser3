import { BaseScene } from 'modules/game/scenes/BaseScene';
import * as tsyringe from 'tsyringe';

export interface ISceneInjector {
  InjectionOrder(): InjectionOrder;
  Install(): void;
  Uninstall(): void;
}

export type PluginSettings = {
  key: string;
  plugin: Function;
  mapping: string;
  addToScene: boolean;
  injectionOrder: InjectionOrder;
};

export enum InjectionOrder {
  Construction = 0,
  PreloadStart,
  PreloadEnd,
  CreationStart,
}

@tsyringe.injectable()
export class ScenePluginInjector implements ISceneInjector {
  public InjectionOrder(): InjectionOrder {
    return this.settings.injectionOrder;
  }

  private sceneId: string;
  private settings: PluginSettings;
  private sceneContainer: tsyringe.DependencyContainer;

  constructor(
    sceneContainer: tsyringe.DependencyContainer,
    sceneId: string,
    settings: PluginSettings
  ) {
    this.settings = settings;
    this.sceneId = sceneId;
    this.sceneContainer = sceneContainer;
  }

  Install(): void {
    const scene = this.sceneContainer.resolve<Phaser.Scene>(this.sceneId);

    !this.settings.addToScene
      ? scene.plugins.installScenePlugin(
          this.settings.key,
          this.settings.plugin,
          this.settings.mapping
        )
      : scene.plugins.installScenePlugin(
          this.settings.key,
          this.settings.plugin,
          this.settings.mapping,
          scene
        );
  }
  Uninstall(): void {
    const scene = this.sceneContainer.resolve<Phaser.Scene>(this.sceneId);
    scene.plugins.removeScenePlugin(this.settings.key);
  }
}
