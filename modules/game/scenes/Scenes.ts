import { BaseScene } from './BaseScene';
import { CandyScene } from './CandyScene';

export const Scenes: { id: string; value: typeof BaseScene }[] = [];

export const TestScenes: { id: string; value: typeof BaseScene }[] = [
  {
    id: 'CandyScene',
    value: CandyScene,
  },
];
