class Message {
  constructor(
    name,
    text,
    isImage,
    id,
    uploadProgress = 1,
    imageKey = null,
    isBroadcast = false,
  ) {
    this.name = name;
    this.text = text;
    this.isImage = isImage;
    this.id = id;
    this.uploadProgress = uploadProgress;
    this.imageKey = imageKey;
    this.time = Date.now();
    this.isBroadcast = isBroadcast;
  }
}

module.exports = () => {
  return Message;
};
