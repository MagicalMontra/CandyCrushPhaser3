import 'phaser';
import 'phaser/plugins/spine/dist/SpinePlugin';
import { DependencyContainer, container } from 'tsyringe';
import { InjectionOrder } from 'modules/injector/ScenePluginInjector';
import { PluginsInstaller } from '../singleton/PluginsInstaller';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import { CAMERA_BOUND_SCALE, DEBUG } from 'modules/constant';
import { Debug } from '../utilis/Coordination';

export class BaseScene extends Phaser.Scene {
  public Container(): DependencyContainer {
    return this.container;
  }

  // public MatterCollision(): PhaserMatterCollisionPlugin {
  //   return this.matterCollision;
  // }

  private container: DependencyContainer;
  private pluginsInstaller: PluginsInstaller;
  private matterCollision: PhaserMatterCollisionPlugin;

  constructor(key: string) {
    super({ key: key });
    this.container = container.createChildContainer();
    this.container.registerInstance<Phaser.Scene>(key, this);
    this.pluginsInstaller =
      container.resolve<PluginsInstaller>(PluginsInstaller);
    this.pluginsInstaller.RegisterScenePlugin(this.container, key);
    container
      .resolve<PluginsInstaller>(PluginsInstaller)
      .RegisterScenePlugin(this.container, key);

    this.OnConstruction();
  }

  preload() {
    if (DEBUG) Debug(this);

    this.OnPreloadStart();
    this.OnPreload();
    this.OnPreloadEnd();
  }

  create() {
    this.OnCreateStart();
    this.OnCreate();
    this.OnCreateEnd();
  }

  update(time: number, delta: number) {
    if (DEBUG) {
      this.DebugFPS();
    }

    this.OnUpdate(time, delta);
  }

  protected OnConstruction() {
    this.pluginsInstaller.InstallScenePlugins(
      this.container,
      InjectionOrder.Construction
    );
  }

  protected OnPreloadStart() {
    this.pluginsInstaller.InstallScenePlugins(
      this.container,
      InjectionOrder.PreloadStart
    );
  }

  protected OnPreload() {}

  protected OnPreloadEnd() {
    this.pluginsInstaller.InstallScenePlugins(
      this.container,
      InjectionOrder.PreloadEnd
    );
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () =>
      this.pluginsInstaller.UninstallScenePlugins(this.container)
    );

    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
      this.pluginsInstaller.UninstallScenePlugins(this.container);
      container.dispose();
    });
  }

  protected OnCreateStart() {
    this.pluginsInstaller.InstallScenePlugins(
      this.container,
      InjectionOrder.CreationStart
    );

    if (DEBUG) {
      this.CreateDebug();
    }
  }

  protected OnCreate() {}

  protected OnCreateEnd() {}

  protected OnUpdate(time: number, delta: number) {}

  //#region DEBUG

  private fpsDebugText: Phaser.GameObjects.Text = null;

  private CreateDebug() {
    this.fpsDebugText = this.add
      .text(
        -this.game.scale.gameSize.width * CAMERA_BOUND_SCALE * 0.75,
        -this.game.scale.gameSize.height * CAMERA_BOUND_SCALE * 0.75,
        'FPS: N/A'
      )
      .setScrollFactor(0)
      .setDepth(999999);

    this.fpsDebugText.setStroke('#ffffff', 5);
    this.fpsDebugText.setFontSize(86);
  }

  private DebugFPS() {
    const fps = this.game.loop.actualFps;
    const color = fps < 30 ? '#ff0070' : fps < 60 ? '#ffcd00' : '#00ff51';
    this.fpsDebugText.setColor(color);
    this.fpsDebugText.setStroke(color, 5);
    this.fpsDebugText.setText('FPS: ' + fps.toFixed(0)); // update fps display
  }

  //#endregion
}
