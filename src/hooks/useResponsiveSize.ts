import { PixelRatio, useWindowDimensions } from "react-native";

// iPhone 16
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

export const useResponsiveSize = () => {
  const { width, height } = useWindowDimensions();
  const wp = (size: number): number => {
    return PixelRatio.roundToNearestPixel((width / DESIGN_WIDTH) * size);
  };
  const hp = (size: number): number => {
    return PixelRatio.roundToNearestPixel((height / DESIGN_HEIGHT) * size);
  };

  return {
    wp,
    hp,
  };
};

export default useResponsiveSize;
