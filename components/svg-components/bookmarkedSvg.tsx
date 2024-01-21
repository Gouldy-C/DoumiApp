import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const BookmarkedSvg = (props : SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  fill="none"
  scale={props.scale}
  >
    <Path
      scale={props.scale}
      fill={props.color}
      d="M11 24.102 3.82 27.19c-.875.37-1.703.296-2.483-.221s-1.17-1.24-1.17-2.17V3.332c0-.71.255-1.323.765-1.836a2.502 2.502 0 0 1 1.842-.77h16.453c.717 0 1.331.256 1.841.77.51.513.765 1.126.765 1.836v21.465c0 .93-.39 1.654-1.17 2.171-.78.517-1.607.59-2.483.221L11 24.102Z"
      />
  </Svg>
)
export default BookmarkedSvg

