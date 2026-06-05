import type { CSSProperties } from "react";

type StyleValue<T> = T | number | string;

interface CommonSystemStyleProps {
  alignItems?: StyleValue<CSSProperties["alignItems"]>;
  bgcolor?: string;
  color?: string;
  display?: StyleValue<CSSProperties["display"]>;
  flexWrap?: StyleValue<CSSProperties["flexWrap"]>;
  fontWeight?: StyleValue<CSSProperties["fontWeight"]>;
  justifyContent?: StyleValue<CSSProperties["justifyContent"]>;
  lineHeight?: StyleValue<CSSProperties["lineHeight"]>;
  minHeight?: StyleValue<CSSProperties["minHeight"]>;
  textAlign?: StyleValue<CSSProperties["textAlign"]>;
}

declare module "@mui/material/OverridableComponent" {
  interface CommonProps extends CommonSystemStyleProps {}
}

declare module "@mui/system/Box/Box" {
  interface BoxOwnProps extends CommonSystemStyleProps {}
}

declare module "@mui/system/Grid/GridProps" {
  interface GridBaseProps extends CommonSystemStyleProps {}
}
