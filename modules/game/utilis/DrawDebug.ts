class DrawDebug {
  static Line(
    scene: Phaser.Scene,
    p1: Phaser.Math.Vector2,
    p2: Phaser.Math.Vector2,
    color: number = 0xbb00ca
  ) {
    const line = scene.add.graphics().lineBetween(p1.x, p1.y, p2.x, p2.y);
    line.fillStyle(color);
    line.lineStyle(10, color);
    line.setDepth(99999);
  }

  static Point(
    scene: Phaser.Scene,
    p: Phaser.Math.Vector2,
    color: number = 0xbb00ca
  ) {
    const dot = scene.add.graphics().fillCircle(p.x, p.y, 10);
    dot.fillStyle(color);
    dot.setDepth(99999);
    console.error('Created debug point: ', p.x, p.y);
  }
}

export default DrawDebug;
