import Paper from "paper";
import { images } from "../Images/images";
import { makeMoveable } from "../Map/moveable";

const makeUnitImages = function (type) {
  const image = images[type].clone();
  const hoverImage = images[`${type}Hover`].clone();
  const selectedImage = images[`${type}Selected`].clone();

  selectedImage.visible = false;
  hoverImage.visible = false;

  return [image, hoverImage, selectedImage];
};

export const makeUnit = function (type, team, startPosition, state, onSelect) {
  const [image, hoverImage, selectedImage] = makeUnitImages(type);
  const group = new Paper.Group({
    applyMatrix: false,
  });
  const sprite = new Paper.Group({
    applyMatrix: false,
  });
  sprite.addChildren([selectedImage, image, hoverImage]);
  sprite.position = new Paper.Point(0, 0);
  group.addChild(sprite);
  group.position = startPosition;

  // make tile (and inject hex)
  const unit = {
    type,
    team,
    group,
    image,
    selectedImage,
  };

  unit.getPosition = function () {
    return group.position;
  };

  unit.moveTo = function (newPosition) {
    group.position = newPosition;
  };

  unit.moveable = makeMoveable(unit, 1);

  unit.select = function () {
    selectedImage.visible = true;
    sprite.scaling = new Paper.Point(1.2, 1.2);

    sprite.tween(
      { scaling: [1.1, 1.1] },
      { easing: "easeInOutCubic", duration: 120 }
    );
  };

  unit.deselect = function () {
    selectedImage.visible = false;

    // ideally, we should check to see if the mouse is over the sprite or not
    // when deselecting and then decide whether or not to show the hovered
    // state.
    image.visible = true;
    hoverImage.visible = false;

    sprite.scaling = new Paper.Point(0.9, 0.9);
    sprite.tween(
      { scaling: [1, 1] },
      { easing: "easeInOutCubic", duration: 120 }
    );
  };

  group.onMouseEnter = function (event) {
    image.visible = false;
    hoverImage.visible = true;
  };

  group.onMouseLeave = function (event) {
    if (state.selected !== unit) {
      image.visible = true;
      hoverImage.visible = false;
    }
  };

  group.onClick = function (event) {
    if (state.selected === unit) {
      onSelect(null);
      unit.deselect();
    } else {
      onSelect(unit);
      unit.select();
    }
  };

  return unit;
};

export const areEnemies = function (unitA, unitB) {
  return unitA.team !== unitB.team;
};
