import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const CloseXSvg = (props : SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  fill="none"
  >
    <Path
      scale={props.scale}
      fill={props.color}
      d="m11 12.474-8.737 8.738c-.201.2-.444.303-.73.309a.992.992 0 0 1-.744-.31 1.011 1.011 0 0 1 0-1.474L9.526 11 .789 2.263c-.201-.201-.304-.444-.31-.73A.992.992 0 0 1 .79.79a1.011 1.011 0 0 1 1.474 0L11 9.526 19.737.789c.201-.201.444-.304.73-.31a.992.992 0 0 1 .745.31 1.011 1.011 0 0 1 0 1.474L12.474 11l8.738 8.737c.2.201.303.444.309.73a.991.991 0 0 1-.31.745 1.01 1.01 0 0 1-1.474 0L11 12.474Z"
    />
  </Svg>
)
export default CloseXSvg

