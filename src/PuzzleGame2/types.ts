export type Size = {
  height: number;
  width: number;
};

export type Point = {
  x: number;
  y: number;
};

export type TileObject = {
  id: number;
  top: number;
  left: number;
  correctPosition: Point;
  initialPosition: Point;
  shape: any;
  path: any;
};

export type ViewLayout = {
  frameOffsetX: number;
  frameOffsetY: number;
  height: number;
  pageOffsetX: number;
  pageOffsetY: number;
  width: number;
};
