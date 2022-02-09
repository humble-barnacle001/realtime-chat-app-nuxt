class Message {
  constructor(name, text, isImage, id, uploadProgress = 1, imageKey = null) {
    this.name = name;
    this.text = text;
    this.isImage = isImage;
    this.id = id;
    this.uploadProgress = uploadProgress;
    this.imageKey = imageKey;
    this.time = Date.now();
  }
}

module.exports = () => {
  return Message;
};
