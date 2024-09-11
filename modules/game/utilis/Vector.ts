import { Math } from 'phaser';

export class Vector {
  static Multiply(v: Math.Vector2, multipiler: number): Math.Vector2;

  static Multiply(v: Math.Vector2, multipiler: Math.Vector2): Math.Vector2;

  static Multiply(v: Math.Vector2, multipiler: any): Math.Vector2 {
    if (multipiler instanceof Math.Vector2)
      return new Math.Vector2(v.x * multipiler.x, v.y * multipiler.y);

    if (typeof multipiler === 'number')
      return new Math.Vector2(v.x * multipiler, v.y * multipiler);

    return v;
  }

  static AddVector2(v1: Math.Vector2, v2: Math.Vector2): Math.Vector2 {
    return new Math.Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  static Approx(
    numA: number,
    numberB: number,
    epsilon: number = 0.001
  ): boolean {
    return this.Abs(numA - numberB) < epsilon;
  }

  static Abs(number: number): number {
    if (number < 0) number *= -1;

    return number;
  }

  static TriArea(a: Math.Vector2, b: Math.Vector2, c: Math.Vector2): number {
    return this.Abs(
      (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2.0
    );
  }

  static isPointInTriangle(
    a: Math.Vector2,
    b: Math.Vector2,
    c: Math.Vector2,
    p: Math.Vector2
  ): boolean {
    // Calculate area of triangle ABC
    const A = this.TriArea(a, b, c);

    // Calculate area of triangle PBC
    const A1 = this.TriArea(p, b, c);

    // Calculate area of triangle PAC
    const A2 = this.TriArea(a, p, c);

    // Calculate area of triangle PAB
    const A3 = this.TriArea(a, b, p);

    // Check if sum of A1, A2 and A3 is same as A
    return A === A1 + A2 + A3;
  }

  static GetAnimKey(name: string): string {
    return `${name}_anim`;
  }

  static ConvertToIsometric(x: number, y: number): Math.Vector2 {
    var isoPoint = new Phaser.Math.Vector2();

    isoPoint.x = y + x / 2;
    isoPoint.y = y - x / 2;

    return isoPoint;
  }

  static ApplyScale(
    v1: Math.Vector2,
    scaleX: number,
    scaleY: number,
    center: Math.Vector2
  ) {
    v1.x = center.x + (v1.x - center.x) * scaleX;
    v1.y = center.y + (v1.y - center.y) * scaleY;

    return v1;
  }

  static CalculateMidpoint(
    point1: Math.Vector2,
    point2: Math.Vector2
  ): Math.Vector2 {
    let midpoint: Math.Vector2 = new Math.Vector2(
      (point1.x + point2.x) / 2,
      (point1.y + point2.y) / 2
    );
    return midpoint;
  }
}

export default Vector;
