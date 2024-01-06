import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const PublishArrowSvg = (props : SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
  >
    <Path
      scale={props.scale}
      fill={props.color}
      d="M1.767 13.723a.9.9 0 0 1-.86-.077.836.836 0 0 1-.407-.752v-4.22L7.423 7 .5 5.327V1.106c0-.33.136-.58.407-.752a.9.9 0 0 1 .86-.077l13.956 5.885c.372.166.558.446.558.84 0 .394-.186.672-.558.836L1.767 13.723Z"
    />
  </Svg>
)
export default PublishArrowSvg

