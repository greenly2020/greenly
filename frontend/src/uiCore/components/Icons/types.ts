import { CSSProperties } from 'react';

export type IconCommonProps = {
  width?: number | string;
  height?: number | string;
  pathColor?: string;
  style?: CSSProperties & { pathColor?: string; circleOpacity?: number };
  color?: string;
};
