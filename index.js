import { WeElement } from "omi";

class Uploader extends WeElement {
  install() {
    this.previewFile = this.previewFile.bind(this);
    this.inputUpload = this.inputUpload.bind(this);
    this.ready = this.ready.bind(this);
    this.images = [];
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

  ready(event) {
    this.preventDefault(event);
    this.fire("upload", { images: this.images });
  }

  css() {
    return `:host {
            display:grid;
            padding:15px;
            width:${this.getAttribute("width")};
          }
          .highlight {
            background:#e67e22;
          }
          #upload-container.filled {
            background-image:none;
          }
          #upload-container {
            background-image:url(${this.getAttribute("background")});
            background-repeat:no-repeat;
            background-size:contain;
            background-position:50% 15px;
            cursor:pointer;
            position:relative;
            width:100%;
            min-width:${this.getAttribute("width")};
            min-height:500px;
            display:grid;
            border:dashed 1px #2c3e50;
            box-sizing:content-box;
          }
          #image-previews {
            display:grid;
            grid-template-columns: repeat(3, 0.4fr);
            grid-auto-rows: max-content;
            grid-column-gap:20px;
            grid-row-gap:30px;
            padding:20px;
          }
          #image-previews img {
            height:150px;
            width:100%;
            display:block;
          }
          #image-previews .image-info span {
            font-size:11px;
            text-align:center;
            padding:6px 3px;
          }
          .image-info {
            box-shadow: 2px 1px 5px 1px #7f8c8d;
            display:grid;
            position:relative;
          }
          .delete-image {
            position: absolute;
            right: -7px;
            top: -9px;
            color: red;
            background: white;
            border-radius: 50%;
            width: 17px;
            height: 13px;
            box-shadow: 1px 1px 2px 1px #7f8c8d;
          }
          #ready-button {
            position: absolute;
            right: -1px;
            bottom: -40px;
            background: #4CAF50;
            font-size: 20px;
            padding: 5px 10px;
            width: 105px;
            text-align: center;
            color: #fafbfb;
            border-radius: 4px;
            transition:0.2s ease-in-out;
          }
          #ready-button:hover {
            background: teal;
            transition:0.2s ease-in-out;
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
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const id = Math.floor(Math.random() * 1000) + 1;
      this.images.push({
        name: file.name,
        id: id,
        size: file.size,
        result: reader.result,
        file: file
      });
      this.update();
    };
  }

  removeImage(image, event) {
    this.preventDefault(event);
    this.images = this.images.filter(item => item.id !== image.id);
    this.update();
  }

  render() {
    return (
      <div
        id="upload-container"
        class={this.images.length > 0 ? "filled" : "empty"}
      >
        <input
          id="file_uploader"
          type="file"
          style="display:none;"
          name="pictures"
          accept="{this.getAttribute('accept')}"
          multiple
        />
        <div id="image-previews">
          {this.images.map(img => {
            return (
              <div className="image-info">
                <span
                  onclick={this.removeImage.bind(this, img)}
                  className="delete-image"
                >
                  &times;
                </span>
                <img src={img.result} />
                <span>{img.name}</span>
              </div>
            );
          })}
        </div>
        <div id="ready-button" onclick={this.ready}>
          Done
        </div>
      </div>
    );
  }
}

customElements.define("image-uploader", Uploader);
