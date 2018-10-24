# Pildike
> Small but great custom element for uploading images.

![gzip size](http://img.badgesize.io/https://unpkg.com/pildike/build/bundle.min.js?compression=gzip)


### Install

```js
npm install pildike
```

or add with unpkg to your HTML file

```html
<script src="https://unpkg.com/pildike"></script>
```

-----
### Usage

After installing the script, you can just use a tag


```html
<image-uploader width="700px" background="/assets/upload.svg" accept="image/*"></image-uploader>
```

Then you can listen to this component for `upload` event listener,
for example
```js
   document.querySelector("image-uploader").addEventListener("upload", (event) => {
    console.log(event.details)
  })
```


### Attributes accepted

* <strong>width</strong> : Add the width of the container
* <strong>background</strong> : Source of the background image of the component
* <strong>accept</strong> : Set what types of images are accepted
for example `accept="image/gif, image/jpeg, image/png"` or `accept="image/*"`


-----


https://tonis2.github.io/pildike/
![](assets/pildike.gif)
