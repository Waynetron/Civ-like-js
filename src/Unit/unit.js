import { images } from "../Images/images";
import colors from "../Util/colors";

const makeUnitImage = function (x, y, type) {
  const image = images[type].clone();
  const selectedImage = images[`${type}Selected`].clone();
  image.translate(x - 37, y - 45);
  return [image, selectedImage];
};

export const makeUnit = function (position, state, onSelect) {
  const [x, y] = position;
  const type = "skeleton";
  const [image, selectedImage] = makeUnitImage(x, y, type);

  // make tile (and inject hex)
  const unit = {
    type,
    image,
    selectedImage,
  };

  unit.scale = {
    x: 1,
    y: 1,
    set: function (x, y) {
      // reset scale
      image.scale(1 / this.x, 1 / this.y);

      // apply new scale
      image.scale(x, y);

      this.x = x;
      this.y = y;
    },
  };

  unit.select = function () {
    unit.scale.set(1.4, 1.4);
  };

  unit.deselect = function () {
    unit.scale.set(1, 1);
  };

  unit.image.onMouseEnter = function (event) {
    if (state.selected !== unit) {
      unit.scale.set(1.1, 1.1);
    }
  };

  unit.image.onMouseLeave = function (event) {
    if (state.selected !== unit) {
      unit.scale.set(1, 1);
    }
  };

  unit.image.onClick = function (event) {
    if (state.selected === unit) {
      unit.deselect();
    } else {
      onSelect(unit);
      unit.select();
    }
  };

  return unit;
};
