// todo: move these loose functions into the corret class

class Utility {
  // The static methods can be used in different parts of the code without having to create an instance of the class. It's used to avoid code duplication and to make the code more readable. It can be called directly using the class name.
  static drawBorder(borderSize: number) {
    fill(0);
    rect(0, 0, windowWidth, windowHeight);

    return {
      innerWidth: windowWidth - 2 * borderSize,
      innerHeight: windowHeight - 2 * borderSize,
      offsetX: borderSize,
      offsetY: borderSize,
    };
  }

  static drawBackgroundImage(img: p5.Image, borderSize: number) {
    const { innerWidth, innerHeight, offsetX, offsetY } =
      Utility.drawBorder(borderSize);
    const scaleFactor = Utility.calculateScaleFactor(
      img,
      innerWidth,
      innerHeight
    );
    const scaledWidth = img.width * scaleFactor;
    const scaledHeight = img.height * scaleFactor;

    image(
      img,
      offsetX + innerWidth / 2 - scaledWidth / 2,
      offsetY + innerHeight / 2 - scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );
  }

  static calculateScaleFactor(
    img: p5.Image,
    targetWidth: number,
    targetHeight: number
  ): number {
    let imgAspectRatio = img.width / img.height;
    let targetAspectRatio = targetWidth / targetHeight;
    let scaleFactor;

    if (imgAspectRatio > targetAspectRatio) {
      scaleFactor = targetHeight / img.height;
    } else {
      scaleFactor = targetWidth / img.width;
    }

    return scaleFactor;
  }
}
