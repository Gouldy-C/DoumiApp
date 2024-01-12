import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const BackArrowSvg = (props : SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  fill="none"
  rotation={props.rotation}
  >
    <Path
      scale={props.scale}
      fill={props.color}
      d="m2.185 10 7.532 7.533a.934.934 0 0 1 .29.702.99.99 0 0 1-.305.701.96.96 0 0 1-.702.299.96.96 0 0 1-.702-.299L.627 11.281a1.751 1.751 0 0 1-.402-.608A1.847 1.847 0 0 1 .095 10c0-.224.043-.449.13-.673.087-.224.221-.427.402-.608l7.671-7.671a.942.942 0 0 1 .71-.29c.274.005.51.107.71.305a.96.96 0 0 1 .297.702c0 .27-.099.504-.298.702L2.185 10Z"
    />
  </Svg>
)
export default BackArrowSvg

