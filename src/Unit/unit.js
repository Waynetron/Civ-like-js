import Paper from "paper";
import { images } from "../Images/images";
import { makeMoveable } from "../Map/moveable";

const makeUnitImages = function (type) {
  const image = images[type].clone();
  const selectedImage = images[`${type}Selected`].clone();

  selectedImage.visible = false;

  return [image, selectedImage];
};

const makeShadow = function () {
  var circle = new Paper.Path.Circle({
    center: [0, 30],
    radius: 12,
    fillColor: "black",
    opacity: 0.15,
    visible: false,
    applyMatrix: false,
  });

  circle.scale(2.5, 1);

  return circle;
};

export const makeUnit = function (startPosition, state, onSelect) {
  const type = "skeleton";
  const [image, selectedImage] = makeUnitImages(type);
  const shadow = makeShadow();
  const group = new Paper.Group({
    applyMatrix: false,
  });
  const sprite = new Paper.Group({
    applyMatrix: false,
  });
  sprite.addChildren([image, selectedImage]);
  sprite.position = new Paper.Point(0, 0);
  group.addChildren([shadow, sprite]);
  group.position = startPosition;

  // make tile (and inject hex)
  const unit = {
    type,
    group,
    image,
    selectedImage,
  };

  unit.moveTo = function (newPosition) {
    // When the unit was selected, the sprite shifts up a little,
    // the problem is, this inadvertedly affects the positioning of the group,
    // so if the group is moved whilst the sprite is offset, it doesn't end up lining
    // up quite right.
    // The solution here is to reset the sprite position before moving the group.
    sprite.position = new Paper.Point(0, 0);
    group.position = newPosition;
  };

  unit.moveable = makeMoveable(unit, 1);

  unit.select = function () {
    sprite.scaling = new Paper.Point(1.1, 1.1);
    sprite.position = new Paper.Point(0, -20);
    image.visible = false;
    selectedImage.visible = true;

    sprite.tween(
      { scaling: [1, 1] },
      { easing: "easeInOutCubic", duration: 120 }
    );

    shadow.visible = true;
  };

  unit.hover = function () {
    sprite.scaling = new Paper.Point(1.1, 1.1);
  };

  unit.deselect = function () {
    image.visible = true;
    selectedImage.visible = false;
    sprite.scaling = new Paper.Point(0.9, 0.9);
    sprite.position = new Paper.Point(0, 0);
    sprite.tween(
      { scaling: [1, 1] },
      { easing: "easeInOutCubic", duration: 120 }
    );

    shadow.visible = false;
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
