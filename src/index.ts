import trim from "./trim";

function stickerify(
  img: HTMLImageElement,
  thickness: number = 1,
  fillStyle: string | CanvasGradient | CanvasPattern = "white",
  samples: number = 36
) {
  const canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d")!;

  const x = thickness + 1, // 1px buffer in case of rounding errors etc.
    y = thickness + 1;

  canvas.width = img.width + 2 * x;
  canvas.height = img.height + 2 * y;

  for (let angle = 0; angle < 360; angle += 360 / samples) {
    ctx.drawImage(
      img,
      thickness * Math.sin((Math.PI * 2 * angle) / 360) + x,
      thickness * Math.cos((Math.PI * 2 * angle) / 360) + y
    );
  }

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
