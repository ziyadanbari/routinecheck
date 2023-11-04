function checkIfImage({ type }) {
  if (type) {
    const typeofimage = type.split("/").slice(-1)[0];
    switch (typeofimage) {
      case "jpeg":
      case "jpg":
      case "png":
      case "gif":
      case "bmp":
      case "tif":
      case "tiff":
      case "webp":
      case "ico":
        return true;
      default:
        return false;
    }
  }
}

export { checkIfImage };
