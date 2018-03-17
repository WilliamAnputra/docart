import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// NOTE: a helper class to consistently scale margins,paddings
//       on different screen size
class Helper {

  static scaleUnit(pixelRatio, dimensions, offset) {
    switch (dimensions) {
      case 'width':
        if (pixelRatio === null) {
          return Math.round(width * (offset / width));
        }
        if (pixelRatio <= 1.5) {
          return Math.round(width * (offset * 0.85 / width));
        }
        if (pixelRatio <= 2) {
          return Math.round(width * (offset / width));
        }

        if (pixelRatio <= 3) {
          return Math.round(width * (offset / width));
        }
        if (pixelRatio <= 4) {
          return Math.round(width * (offset / width));
        }

        break;

      case 'height':
        if (pixelRatio === null) {
          return Math.round(height * (offset / height));
        }
        if (pixelRatio <= 1.5) {
          return Math.round(height * (offset * 0.85 / height));
        }
        if (pixelRatio <= 2) {
          return Math.round(height * (offset / height));
        }

        if (pixelRatio <= 3) {
          return Math.round(height * (offset / height));
        }

        if (pixelRatio <= 4) {
          return Math.round(width * (offset / width));
        }
        break;

      default:
        return null;
    }
  }
}

export default Helper;
