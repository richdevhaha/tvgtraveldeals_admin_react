import chroma from "chroma-js";

export const hexToRgb = (color: any) => chroma(color).rgb().join(", ");

export const rgba = (color: any, opacity: number) => `rgba(${hexToRgb(color)}, ${opacity})`;

export const pxToRem = (number: number, baseNumber = 16) => `${number / baseNumber}rem`;

export const gradientChartLine = (chart: any, color: any, opacity = 0.2) => {
  const ctx = chart.getContext("2d");
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  const primaryColor = rgba(color, opacity).toString();

  gradientStroke.addColorStop(1, primaryColor);
  gradientStroke.addColorStop(0.2, "rgba(72, 72, 176, 0.0)");
  gradientStroke.addColorStop(0, "rgba(203, 12, 159, 0)");

  return gradientStroke;
};

export const boxShadow = (offset: any = [], radius: any = [], color: any, opacity: number, inset = "") => {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(color, opacity)}`;
};

export const radialGradient = (color: string, colorState: string, angle = "69.43% 69.43% at 50% 50%") =>
  `radial-gradient(${angle}, ${color}, ${colorState})`;

export const linearGradient = (color: any, colorState: any, angle: string | number = 195) =>
  `linear-gradient(${angle}deg, ${color}, ${colorState})`;

export const tripleLinearGradient = (color: any, colorState: any, colorStateSecondary: any, angle = 310) =>
  `linear-gradient(${angle}deg, ${color}, ${colorState}, ${colorStateSecondary})`;
