import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const CheckmarkSvg = (props : SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  fill="none"
  scale={props.scale}
  >
    <Path
      scale={props.scale}
      fill={props.color}
      d="M5.479 9.921 14.554.837a.59.59 0 0 1 .404-.163.56.56 0 0 1 .411.164.584.584 0 0 1 .168.412c0 .157-.056.29-.168.402l-9.384 9.385a.693.693 0 0 1-.506.215.693.693 0 0 1-.506-.215L.615 6.679a.544.544 0 0 1-.164-.404.573.573 0 0 1 .181-.411.579.579 0 0 1 .814 0L5.48 9.92Z"
    />
  </Svg>
)
export default CheckmarkSvg

