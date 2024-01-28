import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const PencilSvg = (props : SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  fill="none"
  rotation={props.rotation}
  >
    <Path
      scale={props.scale}
      fill={props.color}
      d="M1.756 16.244H2.86L14.08 5.033 12.978 3.93 1.756 15.141v1.103ZM1.282 17.5a.759.759 0 0 1-.782-.782v-1.442c0-.212.042-.416.127-.612.085-.197.199-.364.342-.504L14.262.867c.12-.109.257-.195.411-.26a1.281 1.281 0 0 1 .96-.006c.154.061.295.152.422.27l1.088 1.095c.127.123.217.262.273.42a1.31 1.31 0 0 1-.273 1.368L3.84 17.03c-.14.143-.307.257-.504.342-.196.085-.4.127-.612.127H1.282ZM13.53 4.487l-.551-.557 1.102 1.103-.55-.546Z"
    />
  </Svg>
)
export default PencilSvg

