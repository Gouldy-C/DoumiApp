import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Path,
  Circle,
  Defs,
  Ellipse,
} from "react-native-svg"

const DoumiImageLogo = (props : SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    scale={props.scale}
  >
    <Circle cx={11} r={24} fill="#504B9B" scale={props.scale}/>
    <Ellipse cx={11} cy={1.2} fill="#D9D9D9" rx={16} ry={13.2} scale={props.scale}/>
    <G filter="url(#a)">
      <Path
        fill="#96ACFD"
        scale={props.scale}
        fillRule="evenodd"
        d="M2.192 8.473C1.268 7.466.6 6.343.6 4.984.6 2.24 3.078.014 6.134.014c2.731 0 4.53 1.926 4.962 3.986.071-2.033 2.669-3.987 4.77-3.987C19.647-.2 21.4 2.24 21.4 4.984c0 1.36-.477 2.482-1.38 3.489L11.096 19.2 2.192 8.473Z"
        clipRule="evenodd"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default DoumiImageLogo
