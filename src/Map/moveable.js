export const makeMoveable = function (unit, speed) {
  return {
    speed,
    moveTo: (tile) => {
      console.log("move", unit, "to", tile);
    },
  };
};
