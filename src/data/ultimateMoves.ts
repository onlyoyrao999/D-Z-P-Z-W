import { UltimateMove } from '../types';
import { ULTIMATE_MOVES_PUNCH } from './ultimateMovesPunch';
import { ULTIMATE_MOVES_WEAPONS } from './ultimateMovesWeapons';

export { ULTIMATE_MOVES_PUNCH } from './ultimateMovesPunch';
export { ULTIMATE_MOVES_WEAPONS } from './ultimateMovesWeapons';

// Combine all 53 Punch Moves + 58 Weapon/Divine/Sound/Odd Moves = 111 total ultimate moves
export const ULTIMATE_MOVES: UltimateMove[] = [
  ...ULTIMATE_MOVES_PUNCH,
  ...ULTIMATE_MOVES_WEAPONS
];
