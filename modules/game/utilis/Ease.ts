export class Ease {
  static Linear(current: number, duration: number): number {
    return current / duration;
  }
}

export default Ease;
