function generateEdgeCurve(
  W: number = 1,
  H: number = 1,
  X: number = 0,
  Y: number = 0,
): number[][] {
  const h = (0.2 + Math.random() * 0.1) * H;
  const d1 = (Math.random() * 0.05) * W;
  const d2 = (Math.random() * 0.05) * W;
  const cot1 = 1 / Math.tan(0.9 + Math.random() * 0.4);
  const cot2 = 1 / Math.tan(0.9 + Math.random() * 0.4);
  const e1 = 0.5 + Math.random() * 0.2;
  const e2 = 0.5 + Math.random() * 0.2;
  const e3 = Math.random();

  const bottom = h*cot1 + h*cot2 + d1 + d2;

  const cps = []

  cps.push(
    generateFromDeltas(
      X, Y,
      0, 0,
      d1, 0
    )
  );
  cps.push(
    generateFromDeltas(
      cps[0][4], cps[0][5],
      0.5 * W - 2 * d1, 0,
      -(h * e1) * cot1, h * e1
    )
  );
  cps.push(
    generateFromDeltas(
      cps[1][4], cps[1][5],
      -(h * (1-e1)) * cot1, h * (1-e1),
      bottom * e3, 0
    )
  );
  cps.push(
    generateFromDeltas(
      cps[2][4], cps[2][5],
      bottom * (1-e3), 0,
      -(h * (1-e2)) * cot2, -h * (1-e2)
    )
  );
  cps.push([
    cps[3][4], cps[3][5],
    X + W/2 + d2, Y,
    X + W - d2, Y
  ]);
  cps.push(
    generateFromDeltas(
      cps[4][4], cps[4][5],
      0, 0,
      d2, 0
    )
  );

  return cps;
}

function generateFromDeltas(
  ix: number,
  iy: number,
  d1x: number,
  d1y: number,
  d2x: number,
  d2y: number,
) {
  return [
    ix, iy,
    ix + d1x, iy + d1y,
    ix + d1x + d2x, iy + d1y + d2y,
    ix + d1x + d2x, iy + d1y + d2y,
  ]
}

function reflect(
  edge: number[][]
): number[][] {
  return edge.map((point) => {
    return [
      point[1], point[0],
      point[3], point[2],
      point[5], point[4],
    ];
  });
}

function flipX(
  cx: number,
  edge: number[][],
): number[][] {
  return edge.map((point) => {
    return [
      -(point[0] - cx) + cx, point[1],
      -(point[2] - cx) + cx, point[3],
      -(point[4] - cx) + cx, point[5],
    ];
  });
}

function flipY(
  cy: number,
  edge: number[][],
): number[][] {
  return edge.map((point) => {
    return [
      point[0], -(point[1] - cy) + cy,
      point[2], -(point[3] - cy) + cy,
      point[4], -(point[5] - cy) + cy,
    ];
  });
}

function rotate(
  cx: number,
  cy: number,
  edge: number[][],
): number[][] {
  return edge.map((point) => {
    const s = 0;
    const c = -1;

    return [
      (point[0] - cx) * c - (point[1] - cy) * s + cx,
      (point[0] - cx) * s + (point[1] - cy) * c + cy,
      (point[2] - cx) * c - (point[3] - cy) * s + cx,
      (point[2] - cx) * s + (point[3] - cy) * c + cy,
      (point[4] - cx) * c - (point[5] - cy) * s + cx,
      (point[4] - cx) * s + (point[5] - cy) * c + cy,
    ];
  });
}

function translate(
  edge: number[][],
  dx: number,
  dy: number
): number[][] {
  return edge.map((point) => {
    return [
      point[0] + dx, point[1] + dy,
      point[2] + dx, point[3] + dy,
      point[4] + dx, point[5] + dy,
    ]
  });
}

function reverse(
  edge: number[][]
): number[][] {
  const innerReveres = edge.map((point) => {
    return [
      point[4], point[5],
      point[2], point[3],
      point[0], point[1],
    ];
  });

  const outerReverse = [];
  for(let i=innerReveres.length-1; i>=0; i--) {
    outerReverse.push(innerReveres[i]);
  }
  return outerReverse;
}

export {
  generateEdgeCurve,
  flipX, flipY,
  reflect, rotate,
  reverse,
  translate
}
