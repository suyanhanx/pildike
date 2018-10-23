import { WeElement } from "omi";

class Uploader extends WeElement {
  install() {
    this.images = [];
    this.previewFile = this.previewFile.bind(this);
    this.inputUpload = this.inputUpload.bind(this);
    this.applyImages = this.applyImages.bind(this);
  }
  installed() {
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      this.addEventListener(eventName, this.preventDefault, false);
    });

    ["drop"].forEach(eventName => {
      this.addEventListener(eventName, this.handleDrop, false);
    });

    this.ondragenter = () => this.classList.add("highlight");
    this.ondragleave = () => this.classList.remove("highlight");
    this.ondragend = () => this.classList.remove("highlight");
    this.onclick = () =>
      this.shadowRoot.querySelector("#file_uploader").click();
    this.shadowRoot
      .querySelector("#file_uploader")
      .addEventListener("change", this.inputUpload, false);
  }

  applyImages(event) {
    this.fire("upload", { images: this.images });
    event.stopPropagation();
  }

  css() {
    return `:host {
            display:grid;
          }
          #upload-container.filled {
            background-image:none;
          }
          #upload-container {
            background-image:url("/assets/upload.svg");
            background-repeat:no-repeat;
            background-size:contain;
            cursor:pointer;
            position:relative;
            width:100%;
            min-height:500px;
            display:grid;
            margin:15px;
            border:dashed 1px black;
            box-sizing:content-box;
          }
          #image-previews {
            display:grid;
            position:absolute;
            top:0;
            grid-template-columns: repeat(3, 30%);
            grid-template-rows: repeat(auto-fill, 200px);
            grid-template-gap:10px;
            grid-row-gap:10px;
            margin:10px;
          }
          #image-previews img {
            height:100%;
            width:100%;
            display:block;
          }
          `;
  }

  preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDrop(event) {
    this.preventDefault(event);
    const files = event.dataTransfer.files;
    [...files].forEach(file => this.previewFile(file));
    this.classList.remove("highlight");
  }

  inputUpload(event) {
    const files = event.target.files;
    [...files].forEach(file => this.previewFile(file));
  }

  previewFile(file) {
    let reader = new FileReader();
    console.log(file)
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.images.push(reader.result);
      this.update();
    };
  }
  render() {
    return (
      <div id="upload-container" class={this.images.length > 0 ? "filled" : "empty"}>
        <input
          id="file_uploader"
          type="file"
          style="display:none;"
          name="pictures"
          accept="image/*"
          multiple
        />
        <div id="image-previews" >
          {this.images.map(img => <img src={img} />)}
        </div>
      </div>
    );
  }
}

customElements.define("image-uploader", Uploader);
