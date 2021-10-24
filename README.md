# stickerify
Add sticker-like border effect to images with transparency

Input:

<img alt="input image" src="example/input.png" width="200px" />

Output:

<img alt="stickerified image" src="example/stickerified.png" width="200px" />

## Sample code
```html
<img id="out"/>
```

```js
const img = new Image(),
  out = document.getElementByID("out");

img.crossOrigin = 'anonymous';
img.onload = () => {
  out.src = stickerify(img, 3, 'white').toDataURL();
};
img.src = 'https://example.com/url-to-transparanet-img.png';
```

`stickerify()` returns a [HTML5 canvas element](https://www.w3schools.com/html/html5_canvas.asp)

## Install

    yarn add stickerify

or

    npm install stickerify
