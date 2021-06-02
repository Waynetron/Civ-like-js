import Paper from "paper";
import { images } from "../Images/images";
import { makeMoveable } from "../Map/moveable";

const makeUnitImages = function (type) {
  const image = images[type].clone();
  const selectedImage = images[`${type}Selected`].clone();

  selectedImage.visible = false;

  return [image, selectedImage];
};

export const makeUnit = function (startPosition, state, onSelect) {
  const type = "skeleton";
  const [image, selectedImage] = makeUnitImages(type);
  const group = new Paper.Group({
    applyMatrix: false,
  });
  const sprite = new Paper.Group({
    applyMatrix: false,
  });
  sprite.addChildren([image, selectedImage]);
  sprite.position = new Paper.Point(0, 0);
  group.addChild(sprite);
  group.position = startPosition;

  // make tile (and inject hex)
  const unit = {
    type,
    group,
    image,
    selectedImage,
  };

  unit.moveTo = function (newPosition) {
    group.position = newPosition;
  };

  unit.moveable = makeMoveable(unit, 1);

  unit.select = function () {
    sprite.scaling = new Paper.Point(1.2, 1.2);
    image.visible = false;
    selectedImage.visible = true;

    sprite.tween(
      { scaling: [1.1, 1.1] },
      { easing: "easeInOutCubic", duration: 120 }
    );
  };

  unit.hover = function () {
    sprite.scaling = new Paper.Point(1.1, 1.1);
  };

  unit.deselect = function () {
    image.visible = true;
    selectedImage.visible = false;
    sprite.scaling = new Paper.Point(0.9, 0.9);
    sprite.tween(
      { scaling: [1, 1] },
      { easing: "easeInOutCubic", duration: 120 }
    );
  };

  group.onMouseEnter = function (event) {
    if (state.selected !== unit) {
      unit.hover();
    }
  };

  group.onMouseLeave = function (event) {
    if (state.selected !== unit) {
      sprite.scaling = new Paper.Point(1, 1);
    }
  };

  group.onClick = function (event) {
    if (state.selected === unit) {
      onSelect(null);
      unit.deselect();
      // the mouse is still over the unit at this point so keep the hovered visual on
      unit.hover();
    } else {
      onSelect(unit);
      unit.select();
    }
  };

  return unit;
};
