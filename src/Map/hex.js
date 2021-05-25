import colors from "../Util/colors";
export const makeHex = function (x, y, radius, Paper) {
  const hex = new Paper.Path.RegularPolygon({
    center: [x, y],
    sides: 6,
    radius: radius,
    strokeColor: colors.lightGrey,
    fillColor: colors.white,
    strokeWidth: 2,
    rotation: 90,
  });

  return hex;
};
