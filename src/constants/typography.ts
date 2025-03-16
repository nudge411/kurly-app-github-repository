export const FONT_FAMILY = {
  ExtraBold: "Pretendard-ExtraBold",
  Bold: "Pretendard-Bold",
  Regular: "Pretendard-Regular",
  Light: "Pretendard-Light",
} as const;

export const FONT_SIZE = {
  XS: 10,
  S: 12,
  M: 14,
  L: 16,
  XL: 18,
  XXL: 20,
  XXXL: 24,
} as const;

export const LINE_HEIGHT = {
  XS: 14,
  S: 18,
  M: 20,
  L: 24,
  XL: 26,
  XXL: 28,
  XXXL: 32,
} as const;

const typography = {
  titleXS100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.XS,
    lineHeight: LINE_HEIGHT.XS,
  },
  titleXS400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.XS,
    lineHeight: LINE_HEIGHT.XS,
  },
  titleXS700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.XS,
    lineHeight: LINE_HEIGHT.XS,
  },
  titleXS900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.XS,
    lineHeight: LINE_HEIGHT.XS,
  },
  titleS100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.S,
    lineHeight: LINE_HEIGHT.S,
  },
  titleS400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.S,
    lineHeight: LINE_HEIGHT.S,
  },
  titleS700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.S,
    lineHeight: LINE_HEIGHT.S,
  },
  titleS900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.S,
    lineHeight: LINE_HEIGHT.S,
  },
  titleM100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.M,
  },
  titleM400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.M,
  },
  titleM700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.M,
  },
  titleM900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.M,
  },
  titleL100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.L,
    lineHeight: LINE_HEIGHT.L,
  },
  titleL400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.L,
    lineHeight: LINE_HEIGHT.L,
  },
  titleL700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.L,
    lineHeight: LINE_HEIGHT.L,
  },
  titleL900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.L,
    lineHeight: LINE_HEIGHT.L,
  },
  titleXL100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.XL,
    lineHeight: LINE_HEIGHT.XL,
  },
  titleXL400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.XL,
    lineHeight: LINE_HEIGHT.XL,
  },
  titleXL700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.XL,
    lineHeight: LINE_HEIGHT.XL,
  },
  titleXL900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.XL,
    lineHeight: LINE_HEIGHT.XL,
  },
  titleXXL100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.XXL,
    lineHeight: LINE_HEIGHT.XXL,
  },
  titleXXL400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.XXL,
    lineHeight: LINE_HEIGHT.XXL,
  },
  titleXXL700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.XXL,
    lineHeight: LINE_HEIGHT.XXL,
  },
  titleXXL900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.XXL,
    lineHeight: LINE_HEIGHT.XXL,
  },
  titleXXXL100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.XXXL,
    lineHeight: LINE_HEIGHT.XXXL,
  },
  titleXXXL400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.XXXL,
    lineHeight: LINE_HEIGHT.XXXL,
  },
  titleXXXL700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.XXXL,
    lineHeight: LINE_HEIGHT.XXXL,
  },
  titleXXXL900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.XXXL,
    lineHeight: LINE_HEIGHT.XXXL,
  },
  bodyS100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.S,
    lineHeight: LINE_HEIGHT.M,
  },
  bodyS400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.S,
    lineHeight: LINE_HEIGHT.M,
  },
  bodyS700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.S,
    lineHeight: LINE_HEIGHT.M,
  },
  bodyS900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.S,
    lineHeight: LINE_HEIGHT.M,
  },
  bodyM100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.L,
  },
  bodyM400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.L,
  },
  bodyM700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.L,
  },
  bodyM900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.L,
  },
  bodyL100: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: FONT_SIZE.L,
    lineHeight: LINE_HEIGHT.XL,
  },
  bodyL400: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.L,
    lineHeight: LINE_HEIGHT.XL,
  },
  bodyL700: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.L,
    lineHeight: LINE_HEIGHT.XL,
  },
  bodyL900: {
    fontFamily: FONT_FAMILY.ExtraBold,
    fontSize: FONT_SIZE.L,
    lineHeight: LINE_HEIGHT.XL,
  },
  default: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.M,
    lineHeight: LINE_HEIGHT.M,
  },
} as const;

export type TypographyKeys = keyof typeof typography;

export default typography;
