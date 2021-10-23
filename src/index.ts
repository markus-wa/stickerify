import trim from "./trim";

function stickerify(
  img: HTMLImageElement,
  thickness: number = 1,
  fillStyle: string | CanvasGradient | CanvasPattern = "white"
) {
  const canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d")!;

  const offsetArr = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ],
    x = thickness + 1, // 1px buffer in case of rounding errors etc.
    y = thickness + 1;

  canvas.width = img.width + 2 * x;
  canvas.height = img.height + 2 * y;

  for (let i = 0; i < offsetArr.length; i++)
    ctx.drawImage(
      img,
      offsetArr[i][0] * thickness + x,
      offsetArr[i][1] * thickness + y
    );

  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(img, x, y);

  return trim(canvas);
}

export { stickerify };

/*
    // example:

    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = () => {
      out.src = stickerify(img, 3).toDataURL();
    };
    img.src = 'https://i.imgur.com/CgGLydT.png';
  */
