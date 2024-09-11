export const Debug = (scene, obj, isWorld = true) => {
  scene.input.on('pointerdown', (pointer) => {
    console.log();
    console.log('===================');
    console.log('>>>>>>> SCREEN >>>>>>>');
    console.log(`${pointer.x}, ${pointer.y}`);
    console.log('>>>>>>> WORLD >>>');
    pointer.updateWorldPoint(scene.cameras.main);
    console.log(`${pointer.worldX}, ${pointer.worldY}`);
    console.log(`x: ${pointer.worldX}, y: ${pointer.worldY}`);
    console.log('===================');
    console.log();
  });
  scene.input.on('pointermove', function (pointer) {
    const x = isWorld ? pointer.worldX : pointer.x;
    const y = isWorld ? pointer.worldY : pointer.y;
    if (obj) obj.setPosition(x, y);
  });
};
