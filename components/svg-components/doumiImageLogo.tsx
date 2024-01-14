import * as React from "react"
import Svg, { Circle, Path, G, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props:any) => (
  <Svg
    width={52}
    height={52}
    fill="none"
    {...props}
  >
    <Circle cx={26} cy={26} r={25} fill="#fff" stroke="#fff" strokeWidth={2} />
    <Path
      fill="#504B9B"
      fillRule="evenodd"
      d="M26 50c13.255 0 24-10.745 24-24S39.255 2 26 2 2 12.745 2 26s10.745 24 24 24Zm.4-29.6a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm8.563-4.136a9.1 9.1 0 0 1-17.417-.273C13.016 18.32 10 22.47 10 27.2c0 7.29 7.163 13.2 16 13.2s16-5.91 16-13.2c0-4.55-2.79-8.563-7.037-10.936Z"
      clipRule="evenodd"
    />
    <G filter="url(#a)">
      <Path
        fill="#96ACFD"
        fillRule="evenodd"
        d="M17.192 34.473c-.924-1.007-1.592-2.13-1.592-3.489 0-2.745 2.478-4.97 5.534-4.97 2.731 0 4.53 1.926 4.962 3.986.071-2.034 2.669-3.987 4.77-3.987 3.781-.214 5.534 2.226 5.534 4.971 0 1.36-.477 2.482-1.38 3.489L26.096 45.2l-8.904-10.727Z"
        clipRule="evenodd"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default SvgComponent