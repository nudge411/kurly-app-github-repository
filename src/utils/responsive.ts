import { Dimensions, PixelRatio } from "react-native";

// iPhone 16
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

const { width, height } = Dimensions.get("window");
const heightRatio = height / DESIGN_HEIGHT;
const widthRatio = width / DESIGN_WIDTH;

export const hp = (size: number): number => {
  return PixelRatio.roundToNearestPixel(heightRatio * size);
};

export const wp = (size: number): number => {
  return PixelRatio.roundToNearestPixel(widthRatio * size);
};

export const sp = (size: number): number => {
  return PixelRatio.roundToNearestPixel(
    size * Math.min(widthRatio, heightRatio)
  );
};
