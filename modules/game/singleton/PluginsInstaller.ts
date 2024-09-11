import { DependencyContainer, injectable, singleton } from 'tsyringe';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import {
  InjectionOrder,
  PluginSettings,
  ScenePluginInjector,
} from 'modules/injector/ScenePluginInjector';

@injectable()
export class PluginsInstaller {
  constructor() {}

  RegisterGlobalPlugin(container: DependencyContainer) {
    //NOTE: for global plugin
  }

  RegisterScenePlugin(sceneContainer: DependencyContainer, sceneId: string) {
    for (const plugin of ScenePlugins) {
      sceneContainer.register<ScenePluginInjector>(plugin.id, {
        useValue: new ScenePluginInjector(
          sceneContainer,
          sceneId,
          plugin.value
        ),
      });
    }
  }

  InstallGlobalPlugins(
    container: DependencyContainer,
    injectionOrder: InjectionOrder
  ) {
    //NOTE: for global plugin
  }

  UninstallGlobalPlugins(container: DependencyContainer) {
    //NOTE: for global plugin
  }

  InstallScenePlugins(
    sceneContainer: DependencyContainer,
    injectionOrder: InjectionOrder
  ) {
    for (const plugin of ScenePlugins) {
      const scenePlugin = sceneContainer.resolve<ScenePluginInjector>(
        plugin.id
      );

      if (injectionOrder != scenePlugin.InjectionOrder()) continue;

      scenePlugin.Install();
    }
  }

  UninstallScenePlugins(sceneContainer: DependencyContainer) {
    for (const plugin of ScenePlugins) {
      const scenePlugin = sceneContainer.resolve<ScenePluginInjector>(
        plugin.id
      );
      scenePlugin.Uninstall();
    }
  }
}

export const ScenePlugins: { id: string; value: PluginSettings }[] = [
  {
    id: 'Spine',
    value: {
      key: 'SpinePlugin',
      plugin: window.SpinePlugin,
      mapping: 'spine',
      addToScene: true,
      injectionOrder: InjectionOrder.PreloadStart,
    },
  },
  // {
  //   id: 'MatterCollision',
  //   value: {
  //     key: 'matterCollision',
  //     plugin: PhaserMatterCollisionPlugin,
  //     mapping: 'matterCollision' as 'matterCollision',
  //     addToScene: true,
  //     injectionOrder: InjectionOrder.PreloadStart,
  //   },
  // },
];
