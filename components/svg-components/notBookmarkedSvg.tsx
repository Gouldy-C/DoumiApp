import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const NotBookmarkedSvg = (props : SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  fill="none"
  >
    <Path
      scale={props.scale}
      fill={props.color}
      d="M11 24.102 3.82 27.19c-.875.37-1.703.298-2.483-.214-.78-.513-1.17-1.239-1.17-2.178V3.333c0-.71.255-1.323.766-1.836a2.503 2.503 0 0 1 1.84-.77h16.454c.716 0 1.33.256 1.84.77.51.513.766 1.126.766 1.836v21.465c0 .94-.39 1.665-1.17 2.178-.78.512-1.607.584-2.483.214L11 24.102Zm0-2.284 8.018 3.42c.171.075.334.06.489-.043a.497.497 0 0 0 .232-.438V3.333a.49.49 0 0 0-.16-.352.49.49 0 0 0-.352-.16H2.774a.49.49 0 0 0-.353.16.49.49 0 0 0-.16.352v21.424c0 .19.077.335.232.438a.482.482 0 0 0 .489.043L11 21.818Z"
    />
  </Svg>
)
export default NotBookmarkedSvg

