import {
  getCircleCoordinator,
  RAD0,
  RAD180,
  RAD270,
  RAD90,
} from 'modules/game/utilis/DegreeToRadian';

export class Direction {
  static calculateDirectionAxis(direction: IPlayerDirection) {
    const dy = (direction.isUp ? -1 : 0) + (direction.isDown ? 1 : 0);
    const dx = (direction.isLeft ? -1 : 0) + (direction.isRight ? 1 : 0);
    return { dx, dy };
  }

  static getRADFromdirection(direction: IPlayerDirectionAxis) {
    const { dx, dy } = direction;
    let rotation;
    if (dy === 0) {
      // dx !== 0
      rotation = dx === 1 ? RAD0 : RAD180;
    } else if (dx === 0) {
      // dy !== 0
      rotation = dy === 1 ? RAD90 : RAD270;
    } else {
      // (dx !== 0) && (dy !== 0)
      rotation = Math.atan2(dy, dx);
      // vx = speedPerFrame * Math.cos(rotation);
      // vy = (speedPerFrame / 2) * Math.sin(rotation);
    }
    return rotation;
  }

  static calculateDestination(
    direction: IPlayerDirectionAxis,
    distance: number,
    position: IPlayerPosition = { x: 0, y: 0 }
  ) {
    const { dx, dy } = direction;
    const rad = this.getRADFromdirection(direction);
    const coordinator = getCircleCoordinator(rad, distance);
    return {
      x: position.x + coordinator.x,
      y: position.y + coordinator.y,
    };
  }

  static calculateVelocity(
    directionAxis: IPlayerDirectionAxis,
    speed: number,
    delta: number = 1
  ) {
    const { dx, dy } = directionAxis;
    const speedPerFrame = speed * delta;
    if (dx === 0 && dy === 0) {
      return { vx: 0, vy: 0 };
    }
    let rotation, vx, vy;
    if (dy === 0) {
      // dx !== 0
      vx = speedPerFrame * dx;
      vy = 0;
      rotation = dx === 1 ? RAD0 : RAD180;
    } else if (dx === 0) {
      // dy !== 0
      vx = 0;
      vy = speedPerFrame * dy;
      rotation = dy === 1 ? RAD90 : RAD270;
    } else {
      // (dx !== 0) && (dy !== 0)
      rotation = Math.atan2(dy, dx);
      vx = speedPerFrame * Math.cos(rotation);
      vy = (speedPerFrame / 2) * Math.sin(rotation);
    }
    return { vx, vy, rotation };
  }

  static calculateDistance(
    directionAxis: IPlayerDirectionAxis,
    speed: number,
    delta: number
  ) {
    const { vx, vy } = this.calculateVelocity(directionAxis, speed);
    const distanceX = vx * delta;
    const distanceY = vy * delta;
    return {
      distanceX,
      distanceY,
    };
  }

  static calculateDistanceFromDirection(
    direction: IPlayerDirection,
    speed: number,
    delta: number
  ) {
    const directionAxis = this.calculateDirectionAxis(direction);
    const distanceXY = this.calculateDistance(directionAxis, speed, delta);
    return distanceXY;
  }
}

export type KeyDirection =
  | 'W'
  | 'A'
  | 'S'
  | 'D'
  | 'WA'
  | 'WD'
  | 'SA'
  | 'SD'
  | undefined;

export interface IPlayerDirection {
  isUp?: boolean;
  isDown?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  isShift?: boolean;
}
export interface IPlayerDirectionAxis {
  dx: number;
  dy: number;
}

export interface IPlayerPosition {
  x: number;
  y: number;
}

export type IPlayerMovement = IPlayerDirectionAxis &
  IPlayerPosition & {
    centroidX: number;
    centroidY: number;
    depth: number;
    characterName?: string;
    id?: string | number;
  };

export function SetPlayerDirection(
  this: IPlayerDirection,
  playerDirection: IPlayerDirection
) {
  const { isUp, isDown, isLeft, isRight } = playerDirection;
  this.isUp = isUp;
  this.isDown = isDown;
  this.isLeft = isLeft;
  this.isRight = isRight;
}

export function SetSprint(
  this: IPlayerDirection,
  playerDirection: IPlayerDirection
) {
  const { isShift } = playerDirection;
  this.isShift = isShift;
}

export default IPlayerDirection;
