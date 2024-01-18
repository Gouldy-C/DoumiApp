import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const CloseXSvg = (props : SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  fill="none"
  scale={props.scale}
  >
    <Path
      scale={props.scale}
      fill={props.color}
      d="m11 12.756-8.455 8.456c-.23.23-.521.348-.87.354a1.178 1.178 0 0 1-.887-.354 1.196 1.196 0 0 1-.362-.879c0-.344.121-.636.362-.878L9.244 11 .788 2.545c-.23-.23-.348-.521-.354-.87-.005-.35.113-.645.354-.887.242-.241.535-.362.879-.362s.636.121.878.362L11 9.244 19.455.788c.23-.23.521-.348.87-.354.35-.005.645.113.887.354.241.242.362.535.362.879s-.121.636-.363.878L12.757 11l8.456 8.455c.23.23.348.521.354.87.005.35-.113.645-.354.887a1.196 1.196 0 0 1-.879.362c-.344 0-.636-.121-.878-.363L11 12.757Z"
    />
  </Svg>
)
export default CloseXSvg

