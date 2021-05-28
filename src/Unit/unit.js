import Paper from "paper";
import { images } from "../Images/images";
import { makeMoveable } from "../Map/moveable";
import colors from "../Util/colors";

const makeUnitImages = function (type) {
  const image = images[type].clone();
  const selectedImage = images[`${type}Selected`].clone();
  for (const img of [image, selectedImage]) {
    img.applyMatrix = false;
    img.translate(0 - img.bounds.width / 2, 0 - img.bounds.height / 2);
  }

  selectedImage.visible = false;

  return [image, selectedImage];
};

const makeShadow = function () {
  var circle = new Paper.Path.Circle({
    center: [0, 30],
    radius: 12,
    fillColor: "black",
    opacity: 0,
  });

  circle.scale(2.5, 1);

  return circle;
};

export const makeUnit = function (position, state, onSelect) {
  const [x, y] = position;
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
  group.translate(x, y - 10);
  group.addChildren([shadow, sprite]);

  // make tile (and inject hex)
  const unit = {
    type,
    group,
    image,
    selectedImage,
  };

  unit.moveable = makeMoveable(unit, 1);

  unit.scale = {
    x: 1,
    y: 1,
    set: function (x, y) {
      // reset scale
      sprite.scale(1 / this.x, 1 / this.y);

      // apply new scale
      sprite.scale(x, y);

      this.x = x;
      this.y = y;
    },
  };

  unit.select = function () {
    unit.scale.set(1.1, 1.1);
    image.visible = false;
    selectedImage.visible = true;

    sprite.tween(
      {
        "position.y": 0 - 20,
      },
      {
        easing: "easeInOutCubic",
        duration: 100,
      }
    );

    shadow.tween(
      {
        opacity: 0.15,
      },
      {
        easing: "easeInOutCubic",
        duration: 100,
      }
    );
  };

  unit.hover = function () {
    unit.scale.set(1.1, 1.1);
  };

  unit.deselect = function () {
    unit.scale.set(1, 1);
    image.visible = true;
    selectedImage.visible = false;
    sprite.tween(
      {
        "position.y": 0,
      },
      {
        easing: "easeInOutCubic",
        duration: 100,
      }
    );

    shadow.tween(
      {
        opacity: 0,
      },
      {
        easing: "easeInOutCubic",
        duration: 100,
      }
    );
  };

  group.onMouseEnter = function (event) {
    if (state.selected !== unit) {
      unit.hover();
    }
  };

  group.onMouseLeave = function (event) {
    if (state.selected !== unit) {
      unit.scale.set(1, 1);
    }
  };

  group.onClick = function (event) {
    if (state.selected === unit) {
      onSelect(null);
      unit.hover();
    } else {
      onSelect(unit);
      unit.select();
    }
  };

  return unit;
};
