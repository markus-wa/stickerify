import { Canvas, createCanvas, NodeCanvasRenderingContext2D } from "canvas";

// trim(canvas) taken from https://gist.github.com/remy/784508
interface Bound {
  top: number | null;
  left: number | null;
  right: number | null;
  bottom: number | null;
}

function trim(c: Canvas | HTMLCanvasElement): Canvas | HTMLCanvasElement {
  const ctx = c.getContext("2d")! as NodeCanvasRenderingContext2D | CanvasRenderingContext2D,
    copy = createCanvas(c.width, c.height).getContext("2d")!,
    pixels = ctx.getImageData(0, 0, c.width, c.height);

  let x: number,
    y: number,
    bound: Bound = {
      top: null,
      left: null,
      right: null,
      bottom: null,
    };

  for (let i = 0; i < pixels.data.length; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~(i / 4 / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  const trimHeight = bound.bottom! - bound.top! + 1,
    trimWidth = bound.right! - bound.left! + 1,
    trimmed = ctx.getImageData(bound.left!, bound.top!, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  return copy.canvas;
}

export default trim;
