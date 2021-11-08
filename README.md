# stickerify
Add sticker-like border effect to images with transparency

Input:

<img alt="input image" src="https://user-images.githubusercontent.com/5138316/140805201-fdad742e-4c7b-4c5e-8f80-9e6bba4b10a9.png" width="200px" />

Output:

<img alt="stickerified image" src="https://user-images.githubusercontent.com/5138316/140805105-222f0edf-4647-485b-8b98-66a4820d3390.png" width="200px" />

## Live Demo

Check out this codepen demo: https://codepen.io/markus-wa/pen/eYEMvxd - thanks to [@pento](https://github.com/pento) for letting me steal this!

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
